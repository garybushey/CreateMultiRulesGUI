const subscriptionID:string = "9790d913-b5da-460d-b167-ac985d5f3b83";
const resourceGroupName:string = "azuresentinel";
const workspaceName:string = "gabazuresentinel";

// const subscriptionID:string = "d1d8779d-38d7-4f06-91db-9cbc8de0176f";
// const resourceGroupName:string = "soc";
// const workspaceName:string = "CyberSecuritySOC";


// Setup the baseline used for most of the MS Sentinel AP calls
const urlBase:string =
  "https://management.azure.com/subscriptions/" +
  subscriptionID +
  "/resourceGroups/" +
  resourceGroupName +
  "/providers/Microsoft.OperationalInsights/workspaces/" +
  workspaceName +
  "/providers/Microsoft.SecurityInsights/";

// Setup the query to get the Solutions (hoping this will convert into a Sentinel call soon)
const solutionsQuery:string =
  "Resources " +
  "| where type =~ 'Microsoft.Resources/templateSpecs/versions' " +
  "| where tags['hidden-sentinelContentType'] =~ 'AnalyticsRule' " +
  "and tags['hidden-sentinelWorkspaceId'] =~ '/subscriptions/" +
  subscriptionID +
  "/resourceGroups/" +
  resourceGroupName +
  "/providers/Microsoft.OperationalInsights/workspaces/" +
  workspaceName +
  "'" +
  "| extend version = name " +
  "| extend parsed_version = parse_version(version) " +
  "| extend resources = parse_json(parse_json(parse_json(properties).template).resources) " +
  "| extend metadata = parse_json(resources[array_length(resources)-1].properties) " +
  "| extend contentId=tostring(metadata.contentId) " +
  "| summarize arg_max(parsed_version, version, properties) by contentId " +
  "| project contentId, version, properties";

//Create the body needed for the call to get teh solutions
var solutionQueryBody:any = {};
solutionQueryBody["subscription"] = subscriptionID;
solutionQueryBody["query"] = solutionsQuery;

//Create the API call to get the Sentinel Analytics rules
const rulesURL = {
  url: urlBase + "alertrules?api-version=2023-03-01-preview",
};

//Create the API call to get the Sentinel Rules templates
const ruleTemplatesURL = {
  url: urlBase + "alertruletemplates?api-version=2023-03-01-preview",
};

//Create the API call to get the Sentinel Solution based rule templates
const solutionTemplatesURL = {
  body: solutionQueryBody,
  url: "https://management.azure.com/providers/Microsoft.ResourceGraph/resources?api-version=2021-03-01",
};

//Create the API call to get the Sentinel standalone rule templates (part of Content Hub)
const standaloneSolutionTemplatesURL = {
  url: urlBase + "contenttemplates?api-version=2022-11-01-preview",
};

//Export the variables that will store the results from the various rule calls
export var sentinelRules:any,
  sentinelTemplates:any,
  solutionTemplates:any,
  standaloneSolutionTemplates:any = "";

//Create the Authentication header needed to make the REST API GET calls
function getGetAuthHeader(accessToken:string) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);
  const options = {
    method: "GET",
    headers: headers,
  };
  return options;
}

//Create the Authentication header needed to make the REST API PUT calls
function getPostAuthHeader(accessToken:string, body:string) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);
  headers.append("Accept", "applicaiton/json");
  headers.append("Content-Type", "application/json");
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  };
  return options;
}


//Check to see where the template came from (not complete)
function checkGallery(sentinelRules:any, solutionTemplates:any) {
  for (var index = 0; index < sentinelRules.length; index++) {
    if (sentinelRules[index].properties.templateVersion == null) {
      if (sentinelRules[index].kind === "Fusion") {
        sentinelRules[index].source = "Gallery";
      } else {
        sentinelRules[index].source = "Custom";
      }
    } else {
      var alertRuleTemplateName =
        sentinelRules[index].properties.alertRuleTemplateName;
      if (findName(solutionTemplates, alertRuleTemplateName)) {
        sentinelRules[index].source = "Solution";
      } else {
        sentinelRules[index].source = "Gallery";
      }
    }
  }
  return sentinelRules;
}

//Find the name of the rule in the array of all the rules
function findName(theArray:any, nameToFind:string) {
  var i = theArray.length;
  while (i--) {
    if (theArray[i].contentId === nameToFind) {
      return true;
    }
  }
  return false;
}

//Make a call to all the Sentinel REST APIs, store the results in the appropriate 
//variables, and then make the call to add the location that the template came from
export async function callSentinelRulesApi(accessToken:string) {
  var options = getGetAuthHeader(accessToken);
  var postOptions = getPostAuthHeader(accessToken, solutionTemplatesURL.body);

  [
    sentinelRules,
    sentinelTemplates,
    solutionTemplates,
    standaloneSolutionTemplates,
  ] = await Promise.all([
    fetch(rulesURL.url, options)              //Load the rules
      .then((response) => response.json())
      .then((response) => response.value)
      .catch((error) => console.log(error)),
    fetch(ruleTemplatesURL.url, options)      //Load the Sentinel Rule Templates
      .then((response) => response.json())
      .then((response) => response.value)
      .catch((error) => console.log(error)),
    fetch(solutionTemplatesURL.url, postOptions)  //Load the Soltions Rule Templates
      .then((response) => response.json())
      .then((response) => response.data)
      .catch((error) => console.log(error)),
    fetch(standaloneSolutionTemplatesURL.url, options)   //Load the stand-alone solution rule templates
      .then((response) => response.json())
      .then((response) => response.value)
      .catch((error) => console.log(error)),
  ]);

  sentinelRules = checkGallery(sentinelRules, solutionTemplates);
  AddSolutions();

  //return sentinelRules;
  return sentinelTemplates;
}

type solutionTemplate = {
  name:string;
  kind:string;
  properties:string;
  source:string;
}

function AddSolutions()
{
  for (var index = 0; index < solutionTemplates.length; index++) {
    var singleSolution:any =  solutionTemplates[index].properties.template.resources[0];
    singleSolution.properties.version = solutionTemplates[index].properties.template.resources[1].properties.version
    var newTemplate: solutionTemplate = {
      name : singleSolution.name,
      kind : singleSolution.kind,
      properties : singleSolution.properties,
      source: solutionTemplates[index].properties.template.resources[1].properties.source,
    }
    sentinelTemplates.push(newTemplate);
    
  }
}

//Find the rule template for the passed in rule.  Check Sentinel's
//OOTB rules first, then Solutions, and then stand-alone solutions.
function findRuleTemplate(alertRuleTemplateName:string) {
  var foundTemplate = "";

  //Check to see if the rule belongs to a Sentinel template, a solution template,
  //or a stand-alone solution
  if (alertRuleTemplateName !== "") {
    //Check Sentinel templates first
    for (var index1 = 0; index1 < sentinelTemplates.length; index1++) {
      if (alertRuleTemplateName === sentinelTemplates[index1].name) {
        foundTemplate = sentinelTemplates[index1];
        break;
      }
    }
    //If we did not find the rule in the Sentinel templates, check the solution templates
    if (foundTemplate === "") {
      for (var index2 = 0; index2 < solutionTemplates.length; index2++) {
        if (alertRuleTemplateName === solutionTemplates[index2].contentId) {
          foundTemplate =
            solutionTemplates[index2].properties.template.resources[0];
          break;
        }
      }
    }
    //If we still have not found the rule's template, check stand-alone solutions
    if (foundTemplate === "") {
      for (
        var index3 = 0;
        index3 < standaloneSolutionTemplates.length;
        index3++
      ) {
        if (
          alertRuleTemplateName ===
          standaloneSolutionTemplates[index3].contentId
        ) {
          foundTemplate =
            standaloneSolutionTemplates[index3].properties.template
              .resources[0];
          break;
        }
      }
    }
  }
  return foundTemplate;
}
