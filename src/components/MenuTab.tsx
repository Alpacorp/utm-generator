import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Utms from "./Utms";
import CampainName from "./CampainName";
import CreateUsers from "./CreateUsers";
import { useAuthStore } from "../hooks/useAuthStore";
import DataManagement from "./DataManagement";

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
  const { user } = useAuthStore();

  const validateAdmin = () => {
    if (user?.role === "admin") {
      return true;
    } else {
      return false;
    }
  };

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
          itemScope
          itemType="http://schema.org/ItemList"
        >
          <Tab
            style={{ fontWeight: "bold" }}
            label="Generador de UTMs"
            {...a11yProps(0)}
            icon={<InsertLinkIcon />}
            itemProp="itemListElement"
          />
          <Tab
            style={{ fontWeight: "bold" }}
            label="Nombramiento de campañas"
            {...a11yProps(1)}
            icon={<DriveFileRenameOutlineIcon />}
            itemProp="itemListElement"
          />
          <Tab
            style={{ fontWeight: "bold" }}
            label="Administración de datos"
            {...a11yProps(1)}
            icon={<PostAddIcon />}
            itemProp="itemListElement"
          />
          {validateAdmin() && (
            <Tab
              style={{ fontWeight: "bold" }}
              label="Creación de usuarios"
              {...a11yProps(3)}
              icon={<GroupAddIcon />}
              itemProp="itemListElement"
            />
          )}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Utms />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CampainName />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DataManagement />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CreateUsers />
      </TabPanel>
    </Box>
  );
};
