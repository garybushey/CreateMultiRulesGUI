import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  makeStyles,
  Textarea
} from "@fluentui/react-components";


const useStyles = makeStyles({
  displayTable: { color: "black", border: '0px' },
  displayRow: { border: '0px', height: "40px" },
  displayRuleName: { border: '0px', height: "40px", fontWeight: "bold", fontSize: "18px", overflowY: ["clip"] },
  displayCell: { border: '0px', height: "10px !important", textAlign: "left", verticalAlign: "top" },
  displayCellDescription: { border: '0px', height: "20px", textAlign: "left", fontWeight: "bold" },
  displayTextarea: { height: "243px", width: "472px", display: "flex", flexDirection: "column", fontSize: "13px" },
  divHeight:
    { height: "100vh" }
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

type Props = { selectedRow: any, isMinimized: boolean }

export function RulesDetails(props: Props) {
  const styles = useStyles();

  var ruleTemplate: any = props.selectedRow
  var displayName: string = " ";
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
  //var requiredDataConnectors: requiredDataConnectorType[] = [];

  if (ruleTemplate !== undefined) {
    var tmpProperties = ruleTemplate.properties.mainTemplate.resources[0].properties;
    displayName = tmpProperties.displayName;
    description = tmpProperties.description;
    ruleQuery = tmpProperties.query;
    ruleFrequency = tmpProperties.queryFrequency;
    rulePeriod = tmpProperties.queryPeriod;
    triggerThreshold = tmpProperties.triggerThreshold;
    triggerOperator = tmpProperties.triggerOperator;
    if (ruleTemplate.properties.eventGroupingSettings !== undefined) {
      eventGrouping = ruleTemplate.properties.eventGroupingSettings.aggregationKind;
    }
    suppressionEnabled = "Not configured";
    createIncidents = "Enabled";
    alertGrouping = "Disabled";
    version = tmpProperties.version;
  }

  //Create the datagrid and return it
  return (
    <>
      {ruleTemplate ? (
        <Table className={styles.displayTable}>
          <TableBody>
            <TableRow className={styles.displayRow}>
              <TableCell className={styles.displayRuleName}>{displayName}</TableCell>
            </TableRow>
            <TableRow className={styles.displayRow}>
              <TableCell className={styles.displayCellDescription}>Description</TableCell>
            </TableRow>
            <TableRow className={styles.displayRow}>
              <TableCell className={styles.displayCell}>{description}</TableCell>
            </TableRow>
            <TableRow className={styles.displayRow}>
              <TableCell className={styles.displayCellDescription}>Rule Query</TableCell>
            </TableRow>
            <TableRow className={styles.displayRow}>
              <TableCell className={styles.displayCell}>
                <Textarea value={ruleQuery} disabled size="large" className={styles.displayTextarea} />
              </TableCell>
            </TableRow>
            {ruleTemplate.kind !== "NRT" ? (
              <>
                <TableRow className={styles.displayRow}>
                  <TableCell className={styles.displayCellDescription}>Rule Frequency</TableCell>
                </TableRow>
                <TableRow className={styles.displayRow}>
                  <TableCell className={styles.displayCell}>Run query every {generateTimeText(ruleFrequency)}</TableCell>
                </TableRow>
                <TableRow className={styles.displayRow}>
                  <TableCell className={styles.displayCellDescription}>Rule period</TableCell>
                </TableRow>
                <TableRow className={styles.displayRow}>
                  <TableCell className={styles.displayCell}>Last {generateTimeText(rulePeriod)} data</TableCell>
                </TableRow>
                <TableRow className={styles.displayRow}>
                  <TableCell className={styles.displayCellDescription}>Rule Threshold</TableCell>
                </TableRow>
                <TableRow className={styles.displayRow}>
                  <TableCell className={styles.displayCell}>{generateRuleThreshold(triggerOperator, triggerThreshold)}</TableCell>
                </TableRow>
                <TableRow className={styles.displayRow}>
                  <TableCell className={styles.displayCellDescription}>Event Grouping</TableCell>
                </TableRow>
                <TableRow className={styles.displayRow}>
                  <TableCell className={styles.displayCell}>{generateEventGroupingText(eventGrouping)}</TableCell>
                </TableRow>
              </>
            ) : (<div></div>)}
            <TableRow className={styles.displayRow}>
              <TableCell className={styles.displayCellDescription}>Suppression</TableCell>
            </TableRow>
            <TableRow className={styles.displayRow}>
              <TableCell className={styles.displayCell}>{suppressionEnabled}</TableCell>
            </TableRow>
            <TableRow className={styles.displayRow}>
              <TableCell className={styles.displayCellDescription}>Create incidents from this rule</TableCell>
            </TableRow>
            <TableRow className={styles.displayRow}>
              <TableCell className={styles.displayCell}>{createIncidents}</TableCell>
            </TableRow>
            <TableRow className={styles.displayRow}>
              <TableCell className={styles.displayCellDescription}>Alert grouping</TableCell>
            </TableRow>
            <TableRow className={styles.displayRow}>
              <TableCell className={styles.displayCell}>{alertGrouping}</TableCell>
            </TableRow>
            <TableRow className={styles.displayRow}>
              <TableCell className={styles.displayCellDescription}>Version</TableCell>
            </TableRow>
            <TableRow className={styles.displayRow}>
              <TableCell className={styles.displayCell}>{version}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )
        : (<div className={styles.divHeight}>
          {props.isMinimized ? (
            <div></div>
          ) : (
            <div>Select a rule to see its details</div>
          )}
        </div>)}

    </>
  );
};
