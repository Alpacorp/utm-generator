import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useState } from "react";
import Utms from "./Utms";
import CampainName from "./CampainName";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const MenuTab = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            style={{ fontWeight: "bold" }}
            label="Generador de UTMs"
            {...a11yProps(0)}
            icon={<InsertLinkIcon />}
          />
          <Tab
            style={{ fontWeight: "bold" }}
            label="Nombramiento de campañas"
            {...a11yProps(1)}
            icon={<DriveFileRenameOutlineIcon />}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Utms />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CampainName />
      </TabPanel>
    </Box>
  );
};
