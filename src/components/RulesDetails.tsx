import React, {  useState } from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  makeStyles,
  Textarea,
  shorthands
} from "@fluentui/react-components";


const useStyles = makeStyles({
  displayTable: { color: "black", ...shorthands.border('0px') },
  displayRow: { ...shorthands.border('0px'), height: "40px" },
  displayRuleName: { ...shorthands.border('0px'), height: "40px", fontWeight: "bold", fontSize:"18px", overflowY:["clip"] },
  displayCell: { ...shorthands.border('0px'), height: "10px !important", textAlign: "left", verticalAlign:"top" },
  displayCellDescription: { ...shorthands.border('0px'), height: "20px", textAlign: "left", fontWeight: "bold" },
  displayTextarea: { height: "243px", width: "472px", display: "flex", flexDirection: "column", fontSize: "13px" }
});

function generateTimeText(ruleFrequency: string) {
  var returnText: string = "";
  if (ruleFrequency !== undefined) {
    if (ruleFrequency.startsWith("PT"))  //This is a time based frequency
    {
      var time: number = +(ruleFrequency.substring(2, ruleFrequency.length - 1));
      returnText += time.toString();

      if (ruleFrequency.substring(ruleFrequency.length - 1) === "H") {
        if (time === 1) {
          returnText += " hour";
        }
        else {
          returnText += " hours";
        }
      }
      else {
        returnText += " minutes";
      }
    }
    else {
      var days: number = +(ruleFrequency.substring(1, ruleFrequency.length - 1));
      returnText += days.toString();
      if (days === 1) {
        returnText += " day";
      }
      else {
        returnText += " days";
      }
    }
  }
  return returnText;
}

function generateRuleThreshold(operator: string, threshold: string) {
  var returnString: string = "Trigger alert if query returns more than ";
  returnString += threshold;
  returnString += " results";
  return returnString
}

function generateEventGroupingText(eventGrouping: string) {
  var returnString: string = "Group all events into a single alert";
  if (eventGrouping === "AlertPerResult") {
    returnString = "Trigger an alert for each event";
  }
  return returnString;
}



export const RulesDetails = (props: any) => {
  const [dataConnectorHTML, setDataConnectorHTML] = useState([]);
  const classes = useStyles();

  var ruleTemplate: any = props.selectedRow
  var displayName: string = "";
  var description: string = "";
  var ruleQuery: string = "";
  var rulePeriod: string = "";
  var ruleFrequency: string = "";
  var triggerOperator: string = "";
  var triggerThreshold: string = "";
  var eventGrouping: string = "";
  var suppressionEnabled: string = "";
  var createIncidents: string = "";
  var alertGrouping: string = "";
  var version: string = "";
  var requiredDataConnectors: requiredDataConnectorType[] = [];

  if (ruleTemplate !== '') {
    displayName = ruleTemplate.properties.displayName;
    description = ruleTemplate.properties.description;
    ruleQuery = ruleTemplate.properties.query;
    ruleFrequency = ruleTemplate.properties.queryFrequency;
    rulePeriod = ruleTemplate.properties.queryPeriod;
    triggerThreshold = ruleTemplate.properties.triggerThreshold;
    triggerOperator = ruleTemplate.properties.triggerOperator;
    if (ruleTemplate.properties.eventGroupingSettings !== undefined) {
      eventGrouping = ruleTemplate.properties.eventGroupingSettings.aggregationKind;
    }
    suppressionEnabled = "Not configured";
    createIncidents = "Enabled";
    alertGrouping = "Disabled";
    version = ruleTemplate.properties.version;
    requiredDataConnectors = ruleTemplate.properties.requiredDataConnectors;
  }


  type requiredDataConnectorType = {
    connectorId: string;
    dataTypes: string[];
  }
  
  const  showDataSources = (requiredDataConnectors: requiredDataConnectorType[]) => {
    return requiredDataConnectors.map( dataConnector => <TableRow><TableCell className={classes.displayCell}>{dataConnector.connectorId}{showDataTables(dataConnector.dataTypes)}</TableCell></TableRow>)
  }

  const showDataTables = (dataTables:string[]) => {
    return dataTables.map( table => <TableRow><TableCell>{table}</TableCell></TableRow>)
  }



  //Create the datagrid and return it
  return (
    <>
      {ruleTemplate ? (
        <Table className={classes.displayTable}>
          <TableBody>
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayRuleName}>{displayName}</TableCell>
            </TableRow>
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayCellDescription}>Description</TableCell>
            </TableRow>
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayCell}>{description}</TableCell>
            </TableRow>
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayCellDescription}>Data Sources</TableCell>
            </TableRow>
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayCell}>
                {showDataSources(requiredDataConnectors)}
              </TableCell>
            </TableRow>
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayCellDescription}>Rule Query</TableCell>
            </TableRow>
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayCell}>
                <Textarea value={ruleQuery} disabled size="large" resize="both" className={classes.displayTextarea} />
              </TableCell>
            </TableRow>
            {ruleTemplate.kind !== "NRT" ? (
              <>
                <TableRow className={classes.displayRow}>
                  <TableCell className={classes.displayCellDescription}>Rule Frequency</TableCell>
                </TableRow>
                <TableRow className={classes.displayRow}>
                  <TableCell className={classes.displayCell}>Run query every {generateTimeText(ruleFrequency)}</TableCell>
                </TableRow>
                <TableRow className={classes.displayRow}>
                  <TableCell className={classes.displayCellDescription}>Rule period</TableCell>
                </TableRow>
                <TableRow className={classes.displayRow}>
                  <TableCell className={classes.displayCell}>Last {generateTimeText(rulePeriod)} data</TableCell>
                </TableRow>
                <TableRow className={classes.displayRow}>
                  <TableCell className={classes.displayCellDescription}>Rule Threshold</TableCell>
                </TableRow>
                <TableRow className={classes.displayRow}>
                  <TableCell className={classes.displayCell}>{generateRuleThreshold(triggerOperator, triggerThreshold)}</TableCell>
                </TableRow>
                <TableRow className={classes.displayRow}>
                  <TableCell className={classes.displayCellDescription}>Event Grouping</TableCell>
                </TableRow>
                <TableRow className={classes.displayRow}>
                  <TableCell className={classes.displayCell}>{generateEventGroupingText(eventGrouping)}</TableCell>
                </TableRow>
              </>
            ) : (<div></div>)}
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayCellDescription}>Suppression</TableCell>
            </TableRow>
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayCell}>{suppressionEnabled}</TableCell>
            </TableRow>
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayCellDescription}>Create incidents from this rule</TableCell>
            </TableRow>
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayCell}>{createIncidents}</TableCell>
            </TableRow>
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayCellDescription}>Alert grouping</TableCell>
            </TableRow>
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayCell}>{alertGrouping}</TableCell>
            </TableRow>
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayCellDescription}>Version</TableCell>
            </TableRow>
            <TableRow className={classes.displayRow}>
              <TableCell className={classes.displayCell}>{version}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )
        : (<div>Select a rule template to see details</div>)}

    </>
  );
};
