import {
    DataGridBody,
    DataGridRow,
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridCell,
    TableCellLayout,
    TableColumnDefinition,
    createTableColumn,
    Link,
    makeStyles,
    tokens
  } from "@fluentui/react-components";
  
  
  const useStyles = makeStyles({
    headerContainer: {
      alignItems: "top",
      verticalAlign: "left",
      display: "flex",
      flexDirection: "row",
      alignContent: "flex-start",
      justifyContent: "flex-start",
      width: "100%"
    },
    gridContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      alignContent:"stretch",
      backgroundColor:tokens.colorNeutralBackground1,
      boxShadow:tokens.shadow8,
    },
    flexContainer: {
      alignItems: "stretch",
      verticalAlign: "left",
      display: "flex",
      flexDirection: "row",
      alignContent: "stretch",
      justifyContent: "space-around"
    },
    flexChild: {
      flexgrow: "3",
      alignSelf: "flex-start",
      flexBasis: "auto",
      justifyContent: "flex-start",
      width:"33%",
      backgroundColor: tokens.colorNeutralBackground1,
      boxShadow: tokens.shadow8,
      minHeight:"350px;",
      maxHeight:"350px"
    },
    flexHeader: {
      alignSelf: "flex-start",
      flexBasis: "auto",
      justifyContent: "flex-start",
      width: "50%"
    }
  });
  
  type AreaCell = {
    label: string;
  };
  
  type DescriptionCell = {
    label: string;
  };
  
  type LinkCell = {
    url: string;
    label: string;
  };
  
  type ContactCell = {
    label: string;
  };
  
  type Item = {
    area: AreaCell;
    description: DescriptionCell;
    link: LinkCell;
    contact: ContactCell;
  };
  
  const items: Item[] = [
    {
      area: { label: "CAF AI Scenario" },
      description: { label: "AI adoption guidance in the Microsoft Cloud Adoption Framework. We created this risk register and mitigation inventory initially to build out the Microsoft-recommendations for adopting AI. These will serve as public guidance in the Govern and Secure areas." },
      link: { url: "https://aka.ms/adopt/ai", label: "Adopt AI" },
      contact: { label: "Tobias Zimmerman" },
    },
    {
      area: { label: "SO Threat Framework" },
      description: { label: "Threat modeling for a wider audience. We created this threat modeling approach to ensure all areas of IT and Software Development." },
      link: { url: "https://microsoft.sharepoint.com/:x:/t/FoundationalSecurityStoryDesign/ETXnQgVK1L1EvKWXbxpn6AYBxCzzL5CfZDP6gfh32m8ofg?e=unac4d", label: "Threat Modeling" },
      contact: { label: "Richard Diver" },
    }
  ];
  
  const columns: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
      columnId: "area",
      renderHeaderCell: () => {
        return "Area";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout >{item.area.label} </TableCellLayout>
        );
      },
    }),
    createTableColumn<Item>({
      columnId: "description",
      renderHeaderCell: () => {
        return "Description";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout>
            {item.description.label}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Item>({
      columnId: "link",
      renderHeaderCell: () => {
        return "Link";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout>
            <a href={item.link.url}>
              {item.link.label}
            </a>
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Item>({
      columnId: "contact",
      renderHeaderCell: () => {
        return "Contact";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout>
            {item.contact.label}
          </TableCellLayout>
        );
      },
    }),
  ];
  
  function Home() {
  
    const styles = useStyles();
  
    return (
      <>
       <div className={styles.gridContainer}>
        <div>Collaborative effort to identify AI adoption risks, threats, and potential mitigations. </div>
        <div>The purpose is to serve both internal stakeholders and teams, as well as feed our public guidance to help our customers stay more safe and secure.</div>
        <div />
        <DataGrid
          items={items}
          columns={columns}
          getRowId={(item) => item.area.label}
        >
          <DataGridHeader>
            <DataGridRow>
              {({ renderHeaderCell }) => (
                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody<Item>>
            {({ item, rowId }) => (
              <DataGridRow<Item> key={rowId}>
                {({ renderCell }) => (
                  <DataGridCell>{renderCell(item)}</DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
        <div>&nbsp;</div>
        <div>
          This work relies heavily on the <Link href="https://attack.mitre.org/" target="_blank" inline>MITRE ATT&CK&#174;</Link> and the <Link href="https://atlas.mitre.org/" target="_blank" inline>MITRE ATLAS&trade;</Link> frameworks
        </div>
        </div>
      </>
    );
  };
  
  export default Home;