import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./Tabs.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface BaseTabsProps {
  tabs: Tab[];
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BaseTabs(props: BaseTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("newV", newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {props.tabs.map((tab: Tab, index: number) => {
            return (
              <Tab
                key={tab.label}
                label={tab.label}
                {...a11yProps(index)}
                sx={{ fontSize: "1.6rem", color: "#ED0534 !important" }}
              />
            );
          })}
        </Tabs>
      </Box>

      {props.tabs.map((tab: Tab, index: number) => {
        return (
          <CustomTabPanel value={value} index={index}>
            {tab.content}
          </CustomTabPanel>
        );
      })}
    </Box>
  );
}
