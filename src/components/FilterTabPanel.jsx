import * as React from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { colorPalette } from "./color";

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 10px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${colorPalette[1]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${colorPalette[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${colorPalette[2]};
    color: #fff;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function FilterTabPanel(props) {
  const TabsList = styled(TabsListUnstyled)`
    min-width: 320px;
    background-color: ${colorPalette[1]};
    /* border-radius: 8px; */
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
  `;

  return (
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab onClick={props.onSort.bind(null, "name", props.sortType)}>
          Name
        </Tab>
        <Tab onClick={props.onSort.bind(null, "abv", props.sortType)}>Abv</Tab>
      </TabsList>
    </TabsUnstyled>
  );
}
