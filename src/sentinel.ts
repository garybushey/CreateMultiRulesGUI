const subscriptionID: string = "9790d913-b5da-460d-b167-ac985d5f3b83";
const resourceGroupName: string = "gabtest9";
const workspaceName: string = "gabtest9";
var globalAccessToken = "";

const apiVersion = "?api-version=2023-04-01-preview";

// Setup the baseline used for most of the MS Sentinel AP calls
const urlBase: string =
  "https://management.azure.com/subscriptions/" +
  subscriptionID +
  "/resourceGroups/" +
  resourceGroupName +
  "/providers/Microsoft.OperationalInsights/workspaces/" +
  workspaceName +
  "/providers/Microsoft.SecurityInsights/";

//Create the API call to get the Sentinel Analytics rules
const rulesURL = urlBase + "alertrules" + apiVersion;
const createRuleURL = urlBase + "alertrules";
const solutionTemplatesURL =
  urlBase +
  "contentTemplates" +
  apiVersion +
  "&%24filter=(properties%2FcontentKind%20eq%20'AnalyticsRule')";
const metaRuleURL = urlBase + "metadata/analyticsrule-";

//Export the variables that will store the results from the various rule calls
export var solutionTemplates: any;
var solutionRules: any;

//Create the Authentication header needed to make the REST API GET calls
function getGetAuthHeader(accessToken: string) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);
  const options = {
    method: "GET",
    headers: headers,
  };
  return options;
}

//Create the Authentication header needed to make the REST API PUT calls.  Need to
//determine how to update the accessToken if it has expired.
function getPostAuthHeader(accessToken: string, body: any, method: string) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  const options = {
    method: method,
    headers: headers,
    body: body,
  };
  return options;
}

//Create a rule from the passed in rule templates.  Can create more than one rule at a time.
export async function createRuleFromTemplate(ruleTemplates: any) {
  for (var index: number = 0; index < ruleTemplates.length; index++) {
    var body: string = "{";
    var ruleData: any = ruleTemplates[index];

    //Load the information needed for the Metadata call
    var packageId = ruleData.properties.packageId;
    var version = ruleData.properties.version;
    var author =
      ruleData.properties.mainTemplate.resources[1].properties.author;
    var support =
      ruleData.properties.mainTemplate.resources[1].properties.support;
    var source =
      ruleData.properties.mainTemplate.resources[1].properties.source;
    var type = ruleData.properties.mainTemplate.resources[0].kind;

    //Load the properties for the rule creation
    var properties = ruleData.properties.mainTemplate.resources[0].properties;
    //Enabled seems to be set to false for all the templates
    properties.enabled = "true";
    //These properties are needed so that the rule template knows it has been used
    properties.alertRuleTemplateName =
      ruleData.properties.mainTemplate.resources[0].name;
    properties.templateVersion = version;

    //Create the rule
    body += '"kind": "' + type + '", ';
    body += '"properties":';
    //Need to use JSON.stringify on any javascript objects so that they can
    //be used in the REST API
    body += JSON.stringify(properties);
    body += "}";
    var guid = generateGUID();
    var url = createRuleURL + "/" + guid + apiVersion;
    //var putResponse: any;
    var postOptions = getPostAuthHeader(globalAccessToken, body, "PUT");
    /* var postResponse = await Promise.all([
      fetch(url, postOptions) //Load the Solutions Rule Templates
        .then((response) => response.json())
        .catch((error) => console.log("Error" + error)),
    ]);

    //Now that the rule has been created, create the metadata entry so that the
    //correct Source Name shows up.
    var metaURL = metaRuleURL + postResponse[0].name;
    var id = metaURL.substring(28);
    //This uses a different API version than the Sentinel calls
    metaURL += "?api-version=2022-01-01-preview";
    var metaBody: string = "{";
    metaBody += '"apiVersion":"2022-01-01-preview",';
    metaBody += '"name":"analyticsrule-' + postResponse[0].name + '",';
    metaBody +=
      '"type":"Microsoft.OperationalInsights/workspaces/providers/metadata",';
    metaBody += '"id":"' + id + '",';
    metaBody += '"properties" :{';
    metaBody += '"contentId":"' + postResponse[0].name + '",';
    metaBody += '"parentId":"' + postResponse[0].id + '",';
    metaBody += '"kind":"AnalyticsRule",';
    metaBody += '"version":"' + version + '",';
    metaBody += '"source":' + JSON.stringify(source) + ",";
    metaBody += '"author":' + JSON.stringify(author) + ",";
    metaBody += '"support":' + JSON.stringify(support) + "";
    metaBody += "}";

    //var putResponse: any;
    var metaOptions = getPostAuthHeader(globalAccessToken, metaBody, "PUT");
    var metaResponse = await Promise.all([
      fetch(metaURL, metaOptions) //Load the Solutions Rule Templates
        .then((response) => response.json())
        .catch((error) => console.log("Error" + error)),
    ]); */
  }
}

//Create a new GUID
function generateGUID() {
  var uuidValue = "",
    k,
    randomValue;
  for (k = 0; k < 32; k++) {
    randomValue = (Math.random() * 16) | 0;

    if (k === 8 || k === 12 || k === 16 || k === 20) {
      uuidValue += "-";
    }
    uuidValue += (
      k === 12 ? 4 : k === 16 ? (randomValue & 3) | 8 : randomValue
    ).toString(16);
  }
  return uuidValue;
}

//Make a call to all the Sentinel REST APIs, store the results in the appropriate
//variables, and then make the call to add the location that the template came from
export async function callSentinelRulesApi(accessToken: string) {
  var options = getGetAuthHeader(accessToken);

  globalAccessToken = accessToken;

  [solutionRules, solutionTemplates] = await Promise.all([
    fetch(rulesURL, options) //Load the rules to see if a rule template has been used
      .then((response) => response.json())
      .then((response) => response.value)
      .catch((error) => console.log(error)),
    fetch(solutionTemplatesURL, options) //Load the Solutions Rule Templates
      .then((response) => response.json())
      .then((response) => response.value)
      .catch((error) => console.log(error)),
  ]);

  isRuleTemplateInUse(solutionTemplates);
  return solutionTemplates;
}

//Check to see if this template is being used.
function isRuleTemplateInUse(solutionTemplates: any) {
  for (var index: number = 0; index < solutionRules.length; index++) {
    if (solutionRules[index].properties.alertRuleTemplateName !== undefined) {
      for (
        var index1: number = 0;
        index1 < solutionTemplates.length;
        index1++
      ) {
        if (
          solutionTemplates[index1].properties.contentId ===
          solutionRules[index].properties.alertRuleTemplateName
        ) {
          solutionTemplates[index1].inUse = "In Use";
          break;
        }
      }
    }
  }
}
