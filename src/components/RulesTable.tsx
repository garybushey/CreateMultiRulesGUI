import React from "react";
import { RulesRow } from "./RulesRow";
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
  Image
} from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: { color: "black" },
});

export const RulesTable = (props: any) => {
  var selectedRows: any;
  const classes = useStyles();

  type ID = {
    label: string
  };

  type Status = {
    label: string
  };

  type Severity = {
    label: string;
    icon: JSX.Element;
  };

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
  };

  type Techniques = {
    label: string;
  };

  type SourceName = {
    label: string;
  };

  type Item = {
    severity: Severity;
    status: Status;
    id: ID
    name: Name;
    ruleType: RuleType;
    dataSources: DataSources;
    tactics: Tactics;
    techniques: Techniques;
    sourceName: SourceName;
  };

  function getSeverityColor(severity: string) {
    var sentinelColorSeverityClass: JSX.Element = <div></div>;
    switch (severity) {
      case "High":
        sentinelColorSeverityClass = <div className="colorSeverityClassHigh">&nbsp;</div>
        break;
      case "Medium":
        sentinelColorSeverityClass = <div className="colorSeverityClassMedium">&nbsp;</div>
        break;
      case "Low":
        sentinelColorSeverityClass = <div className="colorSeverityClassLow">&nbsp;</div>
        break;
      case "Informational":
        sentinelColorSeverityClass = <div className="colorSeverityClassInformational">&nbsp;</div>
        break;
      default:
        break;
    }
    return sentinelColorSeverityClass;
  }

  function getRuleImage(kind: string) {
    var kindImage: JSX.Element = <strong />;
    switch (kind) {
      case "scheduled":
      case "Scheduled":
        kindImage = <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iYmE3OTRjNWYtZGY5MS00ZWI5LTllYzAtYTM4ODM2NjQzY2JjIiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgd2lkdGg9IjE5IiBoZWlnaHQ9IjE5IiB2aWV3Qm94PSIwIDAgMTkgMTkiPgogIDxkZWZzPgogICAgPGNsaXBQYXRoIGlkPSIxYjE0N2QzYy0yMzJiLTQxYjctYjZlOC04MDlkOWFmM2M5MzYiPgogICAgICA8cmVjdCB4PSIwLjQwNSIgeT0iMC41IiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIGZpbGw9Im5vbmUiIC8+CiAgICA8L2NsaXBQYXRoPgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSIzYjJjZTYwZi1jMWRjLTRmZjgtOWE1OC0wZjJhYWY4ZTJjZTciIGN4PSItNTgwLjExOCIgY3k9IjI2NC45ODMiIHI9IjEuMDAxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDguMjQ4LCAwLCAwLCAtOC4yNDgsIDQ3OTQuNzcyLCAyMTk0LjI1OCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjE4MyIgc3RvcC1jb2xvcj0iIzVlYTBlZiIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjU1NSIgc3RvcC1jb2xvcj0iIzVjOWZlZSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjY4OSIgc3RvcC1jb2xvcj0iIzU1OWNlZCIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjc4NSIgc3RvcC1jb2xvcj0iIzRhOTdlOSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjg2MiIgc3RvcC1jb2xvcj0iIzM5OTBlNCIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjkyOCIgc3RvcC1jb2xvcj0iIzIzODdkZSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjk4NSIgc3RvcC1jb2xvcj0iIzA4N2JkNiIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDA3OGQ0IiAvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iYWM1ZjkwNGQtNGJiOC00NjJiLWJkMDctYzE4NTZjYjc5ZGJkIiBjeD0iLTI3My4yNzciIGN5PSItOTcuNTU1IiByPSIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEuMTUzLCAwLCAwLCAtMS4xNTMsIDMyNS4zMTUsIC0xMDMuNzQ1KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3ZjdmN2YiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzVlNWU1ZSIgLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIGNsaXAtcGF0aD0idXJsKCMxYjE0N2QzYy0yMzJiLTQxYjctYjZlOC04MDlkOWFmM2M5MzYpIj4KICAgIDxnPgogICAgICA8cGF0aCBkPSJNMTAuMTE1LDE3QTguMjUyLDguMjUyLDAsMSwwLDEuODYzLDguNzUyLDguMjUyLDguMjUyLDAsMCwwLDEwLjExNSwxN1oiIGZpbGw9InVybCgjM2IyY2U2MGYtYzFkYy00ZmY4LTlhNTgtMGYyYWFmOGUyY2U3KSIgLz4KICAgICAgPHBhdGggZD0iTTEwLjE0NywxNS45MzdBNy4xODUsNy4xODUsMCwxLDAsMi45NjIsOC43NTIsNy4xODUsNy4xODUsMCwwLDAsMTAuMTQ3LDE1LjkzN1oiIGZpbGw9IiNmZmYiIC8+CiAgICAgIDxwYXRoIGQ9Ik0xNC4zNTYsNC4yNTNsLS44NzEuODcxLjI4MS4yOC44NzEtLjg3WiIgZmlsbD0iIzdhN2E3YSIgLz4KICAgICAgPHBhdGggZD0iTTE2LjI0Niw4LjU0NUgxNS4wMTV2LjRoMS4yMzFaIiBmaWxsPSIjN2E3YTdhIiAvPgogICAgICA8cGF0aCBkPSJNMTMuNzA5LDEyLjAyNmwtLjI4MS4yODEuODcxLjg3LjI4MS0uMjgxWiIgZmlsbD0iIzdhN2E3YSIgLz4KICAgICAgPHBhdGggZD0iTTEwLjM0NSwxMy41OTNoLS40djEuMjMxaC40WiIgZmlsbD0iIzdhN2E3YSIgLz4KICAgICAgPHBhdGggZD0iTTUuOSw0LjIxNGwtLjI4LjI4MS44Ny44Ny4yODEtLjI4MVoiIGZpbGw9IiM3YTdhN2EiIC8+CiAgICAgIDxwYXRoIGQ9Ik02LjU0NywxMi4wNjJsLS44NzEuODcuMjgxLjI4MS44Ny0uODcxWiIgZmlsbD0iIzdhN2E3YSIgLz4KICAgICAgPHBhdGggZD0iTTUuMiw4LjU0NUgzLjk3di40SDUuMloiIGZpbGw9IiM3YTdhN2EiIC8+CiAgICAgIDxwYXRoIGQ9Ik0xMC4yNDQsMi42NzJoLS4xYS41LjUsMCwwLDAtLjUwNS41VjguNDkzYS41LjUsMCwwLDAsLjUwNS41aC4xYS41LjUsMCwwLDAsLjUwNS0uNVYzLjE3N0EuNS41LDAsMCwwLDEwLjI0NCwyLjY3MloiIGZpbGw9IiM3YTdhN2EiIC8+CiAgICAgIDxwYXRoIGQ9Ik0xMy4wNDUsMTEuNzM3bC4wNjgtLjA2OWEuNS41LDAsMCwwLDAtLjcxM0wxMS4wMjUsOC44NjdhLjUuNSwwLDAsMC0uNzEyLDBsLS4wNjkuMDY5YS41LjUsMCwwLDAsMCwuNzEzbDIuMDg4LDIuMDg4QS41MDYuNTA2LDAsMCwwLDEzLjA0NSwxMS43MzdaIiBmaWxsPSIjN2E3YTdhIiAvPgogICAgICA8cGF0aCBkPSJNMTAuMTUyLDkuOTA3QTEuMTY5LDEuMTY5LDAsMSwwLDguOTgzLDguNzM4LDEuMTY5LDEuMTY5LDAsMCwwLDEwLjE1Miw5LjkwN1oiIGZpbGw9InVybCgjYWM1ZjkwNGQtNGJiOC00NjJiLWJkMDctYzE4NTZjYjc5ZGJkKSIgLz4KICAgICAgPHBhdGggZD0iTTguNDgzLjY0NkE4LjI5NCw4LjI5NCwwLDAsMCw1LjgwNSwxNS44NTNsLjI3NC0uNzI2YS4xNjUuMTY1LDAsMCwxLC4wNDktLjA2OC4xNTUuMTU1LDAsMCwxLC4wNzYtLjAzNC4xNTguMTU4LDAsMCwxLC4wODMuMDA4LjE1Mi4xNTIsMCwwLDEsLjA2Ny4wNDhsMi4xNTEsMi42MWEuMTQ4LjE0OCwwLDAsMSwuMDM1LjA3Ni4xNi4xNiwwLDAsMS0uMDA4LjA4NC4xNjQuMTY0LDAsMCwxLS4xMjcuMUw1LjA2MiwxOC41YS4xNjMuMTYzLDAsMCwxLS4wODItLjAwOS4xNjYuMTY2LDAsMCwxLS4wNjgtLjA0OC4xNTUuMTU1LDAsMCwxLS4wMzQtLjA3Ni4xNjYuMTY2LDAsMCwxLC4wMDctLjA4M2wuNC0xLjA3NEE5LjcyMiw5LjcyMiwwLDAsMSwuNzc4LDExLjQ1Myw4LjQ2Miw4LjQ2MiwwLDAsMSw4LjQ4My42NDZaIiBmaWxsPSIjODZkNjMzIiAvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+" alt="" ></img>
        break;
      case "NRT":
        kindImage = <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iZTYxZmFmNjktNDNkMy00OWNmLWI3OTMtOGJkZTM2ZDFhNWM4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4KICAgIDxkZWZzPgogICAgICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iYTFlMzE4YmEtYzBmMS00NzE5LTlmNzUtNmQ2NjAxYzZjNTdkIiBjeD0iMzIuODkiIGN5PSItMjQuNjIiIHI9IjEiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoOS4wMSwgMCwgMCwgLTkuMDEsIC0yODYuNzIsIC0yMTEuODcpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMC4xOCIgc3RvcC1jb2xvcj0iIzVlYTBlZiIvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjAuNTYiIHN0b3AtY29sb3I9IiM1YzlmZWUiLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIwLjY5IiBzdG9wLWNvbG9yPSIjNTU5Y2VkIi8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMC43OSIgc3RvcC1jb2xvcj0iIzRhOTdlOSIvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjAuODYiIHN0b3AtY29sb3I9IiMzOTkwZTQiLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIwLjkzIiBzdG9wLWNvbG9yPSIjMjM4N2RlIi8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMC45OCIgc3RvcC1jb2xvcj0iIzA4N2JkNiIvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDc4ZDQiLz4KICAgICAgICA8L3JhZGlhbEdyYWRpZW50PgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYTc1Njg4OGEtMjljOC00NzFlLWI0OTAtMzkyMjE0YjY5ODRkIiB4MT0iMjkwLjU4IiB5MT0iLTM5OC45MSIgeDI9IjMwMC43NiIgeTI9Ii0zOTguOTEiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgLTEsIC0yODcuNSwgLTM4OSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMzJkNGY1Ii8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMC4zMiIgc3RvcC1jb2xvcj0iIzMxZDFmMyIvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjAuNTMiIHN0b3AtY29sb3I9IiMyZWM5ZWIiLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIwLjciIHN0b3AtY29sb3I9IiMyOWJhZGUiLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIwLjg2IiBzdG9wLWNvbG9yPSIjMjJhNWNiIi8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE5OGFiMyIvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJhMDBjOTlhOS03MzdlLTQzZmUtYjVkOC1iZmY4ZDVjMmUzZDMiIHgxPSIzMDAuNTUiIHkxPSItMzk5LjE2IiB4Mj0iMzA0LjAxIiB5Mj0iLTM5OS4xNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhsaW5rOmhyZWY9IiNhNzU2ODg4YS0yOWM4LTQ3MWUtYjQ5MC0zOTIyMTRiNjk4NGQiLz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJhZTA2NDVhLWQwOTgtNDhhOS04NjRhLWIzNTE5NmM1YzdiMyIgeDE9IjI5NC40OCIgeTE9Ii0zOTguOTciIHgyPSIzMDAuODEiIHkyPSItMzk4Ljk3IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEsIDAsIDAsIC0xLCAtMjg3LjUsIC0zODkpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzVlYTBlZiIvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwODdiZDYiLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgPHBhdGggZD0iTTkuNzMsMTlhOSw5LDAsMCwwLDkuMDYtOSw5LDksMCwxLDAtOS4wNiw5WiIgZmlsbD0idXJsKCNhMWUzMThiYS1jMGYxLTQ3MTktOWY3NS02ZDY2MDFjNmM1N2QpIi8+CiAgICA8cGF0aCBkPSJNOS43MywxNy43OEE3Ljg2LDcuODYsMCwxLDAsMiwxMCw3Ljg0LDcuODQsMCwwLDAsOS43MywxNy43OFoiIGZpbGw9IiNmZmYiLz4KICAgIDxwYXRoIGQ9Ik0xMi41NSwxNS41YS4zNi4zNiwwLDAsMC0uNDQtLjEzQTUuOTQsNS45NCwwLDAsMSw0LjE2LDgsNS42OSw1LjY5LDAsMCwxLDcuNzUsNC4zNWE2LDYsMCwwLDEsNSwuNDIuMzcuMzcsMCwwLDAsLjU1LS4zMlY0LjM3YS4zNS4zNSwwLDAsMC0uMTYtLjMsNi43MSw2LjcxLDAsMSwwLS42NSwxMiwuMzcuMzcsMCwwLDAsLjE3LS41NFoiIGZpbGw9InVybCgjYTc1Njg4OGEtMjljOC00NzFlLWI0OTAtMzkyMjE0YjY5ODRkKSIvPgogICAgPHBhdGggZD0iTTE0LjMyLDVhLjQuNCwwLDAsMC0uNjQuMTQuNDIuNDIsMCwwLDAsLjExLjQ1LDUuOTIsNS45MiwwLDAsMS0uNTcsOS4xOS4zOS4zOSwwLDAsMC0uMTEuNTMuMzkuMzksMCwwLDAsLjU2LjFBNi43LDYuNywwLDAsMCwxNC4zMiw1WiIgZmlsbD0idXJsKCNhMDBjOTlhOS03MzdlLTQzZmUtYjVkOC1iZmY4ZDVjMmUzZDMpIi8+CiAgICA8cGF0aCBkPSJNMTIuNzIsOC43OEgxMC41NUwxMS45Myw2YS42MS42MSwwLDAsMC0uMjctLjgxLjU4LjU4LDAsMCwwLS4yNi0uMDZIOS44OGEuNi42LDAsMCwwLS41NS4zNEw3LDEwLjMyYS41OS41OSwwLDAsMCwuMjkuOC42Ni42NiwwLDAsMCwuMjUuMDVIOC43NUw3LjI2LDEzLjkyYS41OS41OSwwLDAsMCwuMjMuOC41OC41OCwwLDAsMCwuMjguMDcsMS4xOSwxLjE5LDAsMCwwLC44Ni0uMzdsNC41LTQuNjNhLjYyLjYyLDAsMCwwLDAtLjg2QS41OS41OSwwLDAsMCwxMi43Miw4Ljc4WiIgZmlsbD0idXJsKCNiYWUwNjQ1YS1kMDk4LTQ4YTktODY0YS1iMzUxOTZjNWM3YjMpIi8+Cjwvc3ZnPg==" alt="" ></img>
        break;
      case "Fusion":
        kindImage = <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iOTJhYTBmYTEtY2U3OC00ZDY5LThiMWEtMzFlYjRlNmIyNWY1IiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgd2lkdGg9IjE5IiBoZWlnaHQ9IjE5IiB2aWV3Qm94PSIwIDAgMTkgMTkiPgogIDxkZWZzPgogICAgPGNsaXBQYXRoIGlkPSIwOTUyODU3OC0zNWIzLTQ0ZTAtYWNiMi0zMmMzNDA1NDk5MjYiPgogICAgICA8cmVjdCB4PSIwLjM2NyIgeT0iMi40NDMiIHdpZHRoPSIxOC4yNjYiIGhlaWdodD0iMTQuMTE1IiBmaWxsPSJub25lIiAvPgogICAgPC9jbGlwUGF0aD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iMjYxMTVmOTMtNzIwYi00NGVmLWJiNTItNDYyZDdmN2RhNGY3IiB4MT0iLTIxOC42MzkiIHkxPSItMTcwLjYwMiIgeDI9Ii0yMDUuNDk2IiB5Mj0iLTE3MC42MDIiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgLTEsIDIxOSwgLTE2MS42NjIpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzVlYTBmMCIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMWY4NWRlIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYTZmYjliNjYtYTEyYy00Mzc0LTg4OGMtMDBlNDhiODZjZTlmIiB4MT0iLTIwNi45MDciIHkxPSItMTc4LjI1MyIgeDI9Ii0yMDYuOTA3IiB5Mj0iLTE2NS4yMTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgLTEsIDIxOSwgLTE2MS42NjIpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzMyYmVkZCIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjMiIHN0b3AtY29sb3I9IiMzNmMzZTEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMC42NyIgc3RvcC1jb2xvcj0iIzQxZDJlZSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNTBlNmZmIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPGcgY2xpcC1wYXRoPSJ1cmwoIzA5NTI4NTc4LTM1YjMtNDRlMC1hY2IyLTMyYzM0MDU0OTkyNikiPgogICAgPGc+CiAgICAgIDxwYXRoIGQ9Ik0xMy41MjIsOC42NDFhLjk2Ny45NjcsMCwwLDAtLjktLjkuOTIzLjkyMywwLDAsMC0uNjc3LjMuNjM3LjYzNywwLDAsMC0uMjI1LjY3MlY4Ljk0YTQuOCw0LjgsMCwwLDEtMS41NzksMy41MUE0LjYxMyw0LjYxMywwLDAsMSw2LjQ1NiwxMy41LDQuNjI0LDQuNjI0LDAsMCwxLDIuMzIyLDkuMzg4LDQuNCw0LjQsMCwwLDEsMy4zNzQsNS45NTMsNC41NzUsNC41NzUsMCwwLDEsNi42ODEsNC4zMWEuOTc0Ljk3NCwwLDAsMCwuODI3LS45NzEuODA5LjgwOSwwLDAsMC0uMy0uNjcyLDEuMjczLDEuMjczLDAsMCwwLS43NTItLjIyNEE2LjUxOCw2LjUxOCwwLDAsMCwuMzY3LDkuMzEzYTYuNjA4LDYuNjA4LDAsMCwwLDYuMTY0LDYuMTI0aC40NTFhNi4zODUsNi4zODUsMCwwLDAsNC41MS0xLjc5Miw2Ljg0Niw2Ljg0NiwwLDAsMCwyLjEtNC43OEMxMy41MjIsOC44NjUsMTMuNTIyLDguNjQxLDEzLjUyMiw4LjY0MVoiIGZpbGw9InVybCgjMjYxMTVmOTMtNzIwYi00NGVmLWJiNTItNDYyZDdmN2RhNGY3KSIgLz4KICAgICAgPHBhdGggZD0iTTEzLDMuNjM4QTYuNDQ0LDYuNDQ0LDAsMCwwLDcuOTU5LDQuOTgyLDYuNzcxLDYuNzcxLDAsMCwwLDUuNDc4LDkuNTM3di4zYS45Ny45NywwLDAsMCwuOS45NzEsMS40NTksMS40NTksMCwwLDAsLjc1Mi0uMjI0LjY3OC42NzgsMCwwLDAsLjMtLjZ2LS4zQTQuNjY4LDQuNjY4LDAsMCwxLDkuMzEyLDYuMzI2YTQuODU3LDQuODU3LDAsMCwxLDMuNzU5LS45LDQuNzg3LDQuNzg3LDAsMCwxLDMuNzU4LDQuNDgxLDQuMjc0LDQuMjc0LDAsMCwxLTEuMzUzLDMuMzYsNC44LDQuOCwwLDAsMS0zLjM4MywxLjQxOWgtLjA3NWEuOTEyLjkxMiwwLDAsMC0uOS45LDEuNDI3LDEuNDI3LDAsMCwwLC4yMjYuNzQ3LjkyMS45MjEsMCwwLDAsLjY3Ni4zaC4wNzVhNi42NjIsNi42NjIsMCwwLDAsNi42MTUtNi4zNDhBNi42MzYsNi42MzYsMCwwLDAsMTMsMy42MzhaIiBmaWxsPSJ1cmwoI2E2ZmI5YjY2LWExMmMtNDM3NC04ODhjLTAwZTQ4Yjg2Y2U5ZikiIC8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4=" alt="" ></img>
        break;
      case "MicrosoftSecurityIncidentCreation":
        kindImage = <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iNWZmNzQwNWEtNTBkMi00MzI3LWI1NDItMjhiNzQ3MzZjZjc4IiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgd2lkdGg9IjE5IiBoZWlnaHQ9IjE5IiB2aWV3Qm94PSIwIDAgMTkgMTkiPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkNzkzNDE2NC03MmFkLTRkYmMtODhjZS02YzMwZTVlNjFiMjkiIHgxPSItMjA5LjUiIHkxPSItMTYyLjU3NiIgeDI9Ii0yMDkuNSIgeTI9Ii0xNzkuNzI1IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEsIDAsIDAsIC0xLCAyMTksIC0xNjEuNjYyKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1ZWEwZjAiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFmODVkZSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxwYXRoIGQ9Ik0uNTIyLDMuNFY5LjFINy44NTdWMi41MjFaTTguNzc0LDIuMzc1djYuOGg5LjdWLjkxM1ptMCw3LjZWMTYuN2w5LjcsMS4zODlWOS45NzVabS04LjI1MiwwdjUuNTU0bDcuMzM1LDEuMDIzVjkuOTc1WiIgZmlsbD0idXJsKCNkNzkzNDE2NC03MmFkLTRkYmMtODhjZS02YzMwZTVlNjFiMjkpIiAvPgo8L3N2Zz4=" alt="" ></img>
        break;
      case "MLBehaviorAnalytics":
        kindImage = <img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTggMTgiIGNsYXNzPSIiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9IkZ4U3ltYm9sMC0wNGQiIGRhdGEtdHlwZT0iMTQ0Ij48Zz48dGl0bGU+TXNQb3J0YWxGeC5iYXNlLmltYWdlcy00ODwvdGl0bGU+PHBhdGggZmlsbD0idXJsKCNkYzA4YWYwMy0zZDQ5LTQzMGYtYTYzZS1lN2M2MTAyOTEwOTQpIiBkPSJNMTcuMDkxIDE3LjVILjkwOWMtLjUxNSAwLS44MTktLjgyNC0uNTI3LTEuMjQ4bDUuNTc2LTguMTI5YS42NC42NCAwIDAgMCAuMTEyLS4zNjJWMi4zODlhLjMyLjMyIDAgMCAwLS4zMi0uMzJoLS4zYS42MzkuNjM5IDAgMCAxLS42NC0uNjRWMS4xNEEuNjQuNjQgMCAwIDEgNS40NTEuNWg3LjFhLjY0LjY0IDAgMCAxIC42NC42NHYuMjg5YS42MzkuNjM5IDAgMCAxLS42NC42NGgtLjNhLjMyLjMyIDAgMCAwLS4zMi4zMnY1LjM4NWEuNjQzLjY0MyAwIDAgMCAuMTEyLjM2M2w1LjU3OCA4LjExNGMuMjg5LjQyNS0uMDE1IDEuMjQ5LS41MyAxLjI0OXoiPjwvcGF0aD48cGF0aCBkPSJNMi43NzIgMTUuMzI5IDcuMDEgOS4xNTNhMS41NTUgMS41NTUgMCAwIDAgLjI3MS0uODc2VjUuNzg5YS40OTMuNDkzIDAgMCAxIC40OTMtLjQ4OWgyLjRhLjQ5Mi40OTIgMCAwIDEgLjQ5Mi40OTJ2Mi42NTRhMS4wNDEgMS4wNDEgMCAwIDAgLjE4My41ODlsNC4zMjcgNi4yOTRhLjM3LjM3IDAgMCAxLS4zLjU3OUgzLjA3N2EuMzcuMzcgMCAwIDEtLjMwNS0uNTc5eiIgY2xhc3M9Im1zcG9ydGFsZngtc3ZnLWMwMSIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjxwYXRoIGZpbGw9InVybCgjZGMwOGFmMDMtM2Q0OS00MzBmLWE2M2UtZTdjNjEwMjkxMDk1KSIgZD0iTTQuNTQgMTIuNzUyYTUuMDcyIDUuMDcyIDAgMCAxIDUuMjM2LS4yMTEgNC42NzkgNC42NzkgMCAwIDAgMS4zNjMuNDMxYy43MjcuMSAxLjY1Ny4wNzUgMS45ODgtLjYyOWwyLjE2MiAzLjA1N2EuMzIzLjMyMyAwIDAgMS0uMjY0LjUwOWgtMTIuMWEuMzIzLjMyMyAwIDAgMS0uMjYzLS41MDl6Ij48L3BhdGg+PGNpcmNsZSBjeD0iOS45NTgiIGN5PSIxMC42MDIiIHI9IjEuMTgiIGZpbGw9InVybCgjZGMwOGFmMDMtM2Q0OS00MzBmLWE2M2UtZTdjNjEwMjkxMDk2KSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iOC41OTgiIGN5PSI4LjM3MyIgcj0iLjY5OSIgZmlsbD0idXJsKCNkYzA4YWYwMy0zZDQ5LTQzMGYtYTYzZS1lN2M2MTAyOTEwOTcpIj48L2NpcmNsZT48L2c+PGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImRjMDhhZjAzLTNkNDktNDMwZi1hNjNlLWU3YzYxMDI5MTA5NCIgeDE9IjguODI1IiB4Mj0iOS4wMTEiIHkxPSIuNTc1IiB5Mj0iMTcuNjMzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMzJkNGY1Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIuMzIxIiBzdG9wLWNvbG9yPSIjMzFkMWYzIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIuOTk5IiBzdG9wLWNvbG9yPSIjMTk4YWIzIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTk4YWIzIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZGMwOGFmMDMtM2Q0OS00MzBmLWE2M2UtZTdjNjEwMjkxMDk1IiB4MT0iOC45NzUiIHgyPSI4Ljk3NSIgeTE9IjE1LjkwOCIgeTI9IjExLjkzMyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzM3YzJiMSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjkwOCIgc3RvcC1jb2xvcj0iIzQyZThjYSI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImRjMDhhZjAzLTNkNDktNDMwZi1hNjNlLWU3YzYxMDI5MTA5NiIgeDE9IjkuOTU4IiB4Mj0iOS45NTgiIHkxPSIxMS43ODIiIHkyPSI5LjQyMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzM3YzJiMSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjkwOCIgc3RvcC1jb2xvcj0iIzQyZThjYSI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImRjMDhhZjAzLTNkNDktNDMwZi1hNjNlLWU3YzYxMDI5MTA5NyIgeDE9IjguNTk4IiB4Mj0iOC41OTgiIHkxPSI5LjA3MiIgeTI9IjcuNjc0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMzdjMmIxIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIuOTA4IiBzdG9wLWNvbG9yPSIjNDJlOGNhIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIDwvc3ZnPg==" alt="" className="ruleTypeImage"></img>
        break;
      case "ThreatIntelligence":
        kindImage = <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iYmE3OTRjNWYtZGY5MS00ZWI5LTllYzAtYTM4ODM2NjQzY2JjIiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgd2lkdGg9IjE5IiBoZWlnaHQ9IjE5IiB2aWV3Qm94PSIwIDAgMTkgMTkiPgogIDxkZWZzPgogICAgPGNsaXBQYXRoIGlkPSIxYjE0N2QzYy0yMzJiLTQxYjctYjZlOC04MDlkOWFmM2M5MzYiPgogICAgICA8cmVjdCB4PSIwLjQwNSIgeT0iMC41IiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIGZpbGw9Im5vbmUiIC8+CiAgICA8L2NsaXBQYXRoPgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSIzYjJjZTYwZi1jMWRjLTRmZjgtOWE1OC0wZjJhYWY4ZTJjZTciIGN4PSItNTgwLjExOCIgY3k9IjI2NC45ODMiIHI9IjEuMDAxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDguMjQ4LCAwLCAwLCAtOC4yNDgsIDQ3OTQuNzcyLCAyMTk0LjI1OCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjE4MyIgc3RvcC1jb2xvcj0iIzVlYTBlZiIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjU1NSIgc3RvcC1jb2xvcj0iIzVjOWZlZSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjY4OSIgc3RvcC1jb2xvcj0iIzU1OWNlZCIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjc4NSIgc3RvcC1jb2xvcj0iIzRhOTdlOSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjg2MiIgc3RvcC1jb2xvcj0iIzM5OTBlNCIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjkyOCIgc3RvcC1jb2xvcj0iIzIzODdkZSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjk4NSIgc3RvcC1jb2xvcj0iIzA4N2JkNiIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDA3OGQ0IiAvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iYWM1ZjkwNGQtNGJiOC00NjJiLWJkMDctYzE4NTZjYjc5ZGJkIiBjeD0iLTI3My4yNzciIGN5PSItOTcuNTU1IiByPSIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEuMTUzLCAwLCAwLCAtMS4xNTMsIDMyNS4zMTUsIC0xMDMuNzQ1KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3ZjdmN2YiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzVlNWU1ZSIgLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIGNsaXAtcGF0aD0idXJsKCMxYjE0N2QzYy0yMzJiLTQxYjctYjZlOC04MDlkOWFmM2M5MzYpIj4KICAgIDxnPgogICAgICA8cGF0aCBkPSJNMTAuMTE1LDE3QTguMjUyLDguMjUyLDAsMSwwLDEuODYzLDguNzUyLDguMjUyLDguMjUyLDAsMCwwLDEwLjExNSwxN1oiIGZpbGw9InVybCgjM2IyY2U2MGYtYzFkYy00ZmY4LTlhNTgtMGYyYWFmOGUyY2U3KSIgLz4KICAgICAgPHBhdGggZD0iTTEwLjE0NywxNS45MzdBNy4xODUsNy4xODUsMCwxLDAsMi45NjIsOC43NTIsNy4xODUsNy4xODUsMCwwLDAsMTAuMTQ3LDE1LjkzN1oiIGZpbGw9IiNmZmYiIC8+CiAgICAgIDxwYXRoIGQ9Ik0xNC4zNTYsNC4yNTNsLS44NzEuODcxLjI4MS4yOC44NzEtLjg3WiIgZmlsbD0iIzdhN2E3YSIgLz4KICAgICAgPHBhdGggZD0iTTE2LjI0Niw4LjU0NUgxNS4wMTV2LjRoMS4yMzFaIiBmaWxsPSIjN2E3YTdhIiAvPgogICAgICA8cGF0aCBkPSJNMTMuNzA5LDEyLjAyNmwtLjI4MS4yODEuODcxLjg3LjI4MS0uMjgxWiIgZmlsbD0iIzdhN2E3YSIgLz4KICAgICAgPHBhdGggZD0iTTEwLjM0NSwxMy41OTNoLS40djEuMjMxaC40WiIgZmlsbD0iIzdhN2E3YSIgLz4KICAgICAgPHBhdGggZD0iTTUuOSw0LjIxNGwtLjI4LjI4MS44Ny44Ny4yODEtLjI4MVoiIGZpbGw9IiM3YTdhN2EiIC8+CiAgICAgIDxwYXRoIGQ9Ik02LjU0NywxMi4wNjJsLS44NzEuODcuMjgxLjI4MS44Ny0uODcxWiIgZmlsbD0iIzdhN2E3YSIgLz4KICAgICAgPHBhdGggZD0iTTUuMiw4LjU0NUgzLjk3di40SDUuMloiIGZpbGw9IiM3YTdhN2EiIC8+CiAgICAgIDxwYXRoIGQ9Ik0xMC4yNDQsMi42NzJoLS4xYS41LjUsMCwwLDAtLjUwNS41VjguNDkzYS41LjUsMCwwLDAsLjUwNS41aC4xYS41LjUsMCwwLDAsLjUwNS0uNVYzLjE3N0EuNS41LDAsMCwwLDEwLjI0NCwyLjY3MloiIGZpbGw9IiM3YTdhN2EiIC8+CiAgICAgIDxwYXRoIGQ9Ik0xMy4wNDUsMTEuNzM3bC4wNjgtLjA2OWEuNS41LDAsMCwwLDAtLjcxM0wxMS4wMjUsOC44NjdhLjUuNSwwLDAsMC0uNzEyLDBsLS4wNjkuMDY5YS41LjUsMCwwLDAsMCwuNzEzbDIuMDg4LDIuMDg4QS41MDYuNTA2LDAsMCwwLDEzLjA0NSwxMS43MzdaIiBmaWxsPSIjN2E3YTdhIiAvPgogICAgICA8cGF0aCBkPSJNMTAuMTUyLDkuOTA3QTEuMTY5LDEuMTY5LDAsMSwwLDguOTgzLDguNzM4LDEuMTY5LDEuMTY5LDAsMCwwLDEwLjE1Miw5LjkwN1oiIGZpbGw9InVybCgjYWM1ZjkwNGQtNGJiOC00NjJiLWJkMDctYzE4NTZjYjc5ZGJkKSIgLz4KICAgICAgPHBhdGggZD0iTTguNDgzLjY0NkE4LjI5NCw4LjI5NCwwLDAsMCw1LjgwNSwxNS44NTNsLjI3NC0uNzI2YS4xNjUuMTY1LDAsMCwxLC4wNDktLjA2OC4xNTUuMTU1LDAsMCwxLC4wNzYtLjAzNC4xNTguMTU4LDAsMCwxLC4wODMuMDA4LjE1Mi4xNTIsMCwwLDEsLjA2Ny4wNDhsMi4xNTEsMi42MWEuMTQ4LjE0OCwwLDAsMSwuMDM1LjA3Ni4xNi4xNiwwLDAsMS0uMDA4LjA4NC4xNjQuMTY0LDAsMCwxLS4xMjcuMUw1LjA2MiwxOC41YS4xNjMuMTYzLDAsMCwxLS4wODItLjAwOS4xNjYuMTY2LDAsMCwxLS4wNjgtLjA0OC4xNTUuMTU1LDAsMCwxLS4wMzQtLjA3Ni4xNjYuMTY2LDAsMCwxLC4wMDctLjA4M2wuNC0xLjA3NEE5LjcyMiw5LjcyMiwwLDAsMSwuNzc4LDExLjQ1Myw4LjQ2Miw4LjQ2MiwwLDAsMSw4LjQ4My42NDZaIiBmaWxsPSIjODZkNjMzIiAvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+" alt="" ></img>
        break;
      default:
        break;
    }
    return kindImage
  }

  function translateRuleType(kind: string) {
    var translatedRuleType: string = kind[0].toUpperCase() + kind.substring(1);
    switch (kind) {
      case "MicrosoftSecurityIncidentCreation":
        translatedRuleType = "Microsoft Security";
        break;
      case "MLBehaviorAnalytics":
        translatedRuleType = "ML Behavior Analytics";
        break;
      case "ThreatIntelligence":
        translatedRuleType = "Threat Intelligence";
        break;
      default:
        break;
    }
    return translatedRuleType
  }

  function switchBackground(data: any) {
    selectedRows = data;
    /* var x: number=-1;
    data.selectedItems.forEach((element: number) => {
      x = element;
    });
    if (x !== -1)
    {
    //items[x].status.label="G";
    } */
  }

  function getDataSource(source: any) {
    var dataSource: string = "Gallery"
    if (source !== undefined) {
      dataSource = source.name;
      if (dataSource !== "SAP") {
        dataSource = dataSource.replace(/([A-Z])/g, ' $1').trim()
      }
    }
    return dataSource
  }

  const items: Item[] = [];

  props.sentinelData.map((row: any, i: number) => {
    var thisSeverity = row.properties.severity;
    if (thisSeverity === undefined) {
      thisSeverity = "High";
    }
    var item: Item = {
      id: { label: row.name },
      severity: { label: thisSeverity, icon: getSeverityColor(thisSeverity) },
      status: { label: "" },
      name: { label: row.properties.displayName },
      ruleType: { label: translateRuleType(row.kind), icon: getRuleImage(row.kind) },
      dataSources: { label: getDataSource(row.source) },
      tactics: { label: "" },
      techniques: { label: "" },
      sourceName: { label: "Gallery" },
    };
    items.push(item);
  });

  const columns: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
      columnId: "severity",
      compare: (a, b) => {
        return a.severity.label.localeCompare(b.severity.label);
      },
      renderHeaderCell: () => {
        return "Severity";
      },
      renderCell: (item) => {
        return <TableCellLayout media={item.severity.icon}>{item.severity.label}</TableCellLayout>;
      },
    }),
    createTableColumn<Item>({
      columnId: "status",
      compare: (a, b) => {
        return a.status.label.localeCompare(b.status.label);
      },
      renderHeaderCell: () => {
        return "Status";
      },
      renderCell: (item) => {
        return <TableCellLayout >{item.status.label}</TableCellLayout>;
      },
    }),
    createTableColumn<Item>({
      columnId: "name",
      compare: (a, b) => {
        return a.name.label.localeCompare(b.name.label);
      },
      renderHeaderCell: () => {
        return "Name";
      },
      renderCell: (item) => {
        return <TableCellLayout truncate>{item.name.label}</TableCellLayout>;
      },
    }),
    createTableColumn<Item>({
      columnId: "ruleType",
      compare: (a, b) => {
        return a.ruleType.label.localeCompare(b.ruleType.label);
      },
      renderHeaderCell: () => {
        return "Rule Type";
      },
      renderCell: (item) => {
        return <TableCellLayout media={item.ruleType.icon}>{item.ruleType.label}</TableCellLayout>;
      },
    }),
    createTableColumn<Item>({
      columnId: "dataSources",
      compare: (a, b) => {
        return a.dataSources.label.localeCompare(b.dataSources.label);
      },
      renderHeaderCell: () => {
        return "Source Name";
      },
      renderCell: (item) => {
        return <TableCellLayout truncate>{item.dataSources.label}</TableCellLayout>;
      },
    }),
    createTableColumn<Item>({
      columnId: "tactics",
      compare: (a, b) => {
        return a.tactics.label.localeCompare(b.tactics.label);
      },
      renderHeaderCell: () => {
        return "Tactics";
      },
      renderCell: (item) => {
        return <TableCellLayout>{item.tactics.label}</TableCellLayout>;
      },
    }),
    createTableColumn<Item>({
      columnId: "techniques",
      compare: (a, b) => {
        return a.techniques.label.localeCompare(b.techniques.label);
      },
      renderHeaderCell: () => {
        return "Techniques";
      },
      renderCell: (item) => {
        return <TableCellLayout>{item.techniques.label}</TableCellLayout>;
      },
    }),
    createTableColumn<Item>({
      columnId: "sourceName",
      compare: (a, b) => {
        return a.sourceName.label.localeCompare(b.sourceName.label);
      },
      renderHeaderCell: () => {
        return "Source Name";
      },
      renderCell: (item) => {
        return <TableCellLayout>{item.sourceName.label}</TableCellLayout>;
      },
    }),
  ];

  return (
    <>
      <DataGrid
        items={items}
        columns={columns}
        sortable
        selectionMode="multiselect"
        getRowId={(item) => item.id.label}
        onSelectionChange={(e, data) => switchBackground(data)}
        className={classes.root}
      >
        <DataGridHeader>
          <DataGridRow selectionCell={{ "aria-label": "Select all rows" }}>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item> key={rowId} selectionCell={{ "aria-label": "Select row" }} >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </>
  );
};
