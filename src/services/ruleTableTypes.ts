//Moved this out of the RulesTable.tsx to make it easier to work with

type ID = {
  label: string
};

type Severity = {
  label: string;
  icon: JSX.Element;
};

type InUse = {
  label: string
}

type Name = {
  label: string;
};

type RuleType = {
  label: string;
  icon: JSX.Element;
};

type DataSources = {
  label: string;
};

type Tactics = {
  label: string;
  icon: JSX.Element[];
};

type Techniques = {
  label: JSX.Element;
};

type SourceName = {
  label: string;
};

type RequiredDataConnectors = {
  label: string[];
}

type Version = {
  label: string;
}

type SubTechniques = {
  label: string;
};


//This is a list of all the fields that make up an individual item
export type RuleTemplateItem = {
  severity: Severity;
  status: string;
  id: ID;
  inUse: string;
  name: Name;
  ruleType: RuleType;
  dataSources: DataSources;
  tactics: Tactics;
  techniques: Techniques;
  sourceName: SourceName;
  requiredDataConnectors: RequiredDataConnectors;
  version: Version;
  subTechniques: SubTechniques;

};