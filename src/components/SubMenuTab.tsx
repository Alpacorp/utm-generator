import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PsychologyIcon from "@mui/icons-material/Psychology";
import GridViewIcon from "@mui/icons-material/GridView";
import MediationIcon from "@mui/icons-material/Mediation";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import { useAuthStore } from "../hooks/useAuthStore";
import DataManagement from "./DataManagement";
import { useBusinessLine } from "../hooks/useBusinessLine";
import { useTypeAd } from "../hooks/useTypeAd";
import { useStrategy } from "../hooks/useStrategy";
import { useSourceMedia } from "../hooks/useSourceMedia";
import { useMedium } from "../hooks/useMedium";

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

export const SubMenuTab = () => {
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

  const { createBusinessLine, businessLineStore } = useBusinessLine();
  const { createTypeAd, typeAdStore } = useTypeAd();
  const { createStrategy, strategyStore } = useStrategy();
  const { createSourceMedia, sourceMediaStore } = useSourceMedia();
  const { createMedium, mediumStore } = useMedium();

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
            label="Productos"
            {...a11yProps(0)}
            icon={<BusinessIcon />}
            itemProp="itemListElement"
          />
          <Tab
            style={{ fontWeight: "bold" }}
            label="Tipos de Inversión"
            {...a11yProps(1)}
            icon={<AttachMoneyIcon />}
            itemProp="itemListElement"
          />
          <Tab
            style={{ fontWeight: "bold" }}
            label="Estrategias"
            {...a11yProps(1)}
            icon={<PsychologyIcon />}
            itemProp="itemListElement"
          />
          <Tab
            style={{ fontWeight: "bold" }}
            label="Tipos de Canales"
            {...a11yProps(3)}
            icon={<GridViewIcon />}
            itemProp="itemListElement"
          />
          <Tab
            style={{ fontWeight: "bold" }}
            label="Fuentes de Publicación"
            {...a11yProps(4)}
            icon={<MediationIcon />}
            itemProp="itemListElement"
          />
          <Tab
            style={{ fontWeight: "bold" }}
            label="Medios"
            {...a11yProps(5)}
            icon={<MobileScreenShareIcon />}
            itemProp="itemListElement"
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DataManagement
          type={1}
          title={"Producto"}
          createData={createBusinessLine}
          storeData={businessLineStore}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DataManagement
          type={1}
          title={"Tipo de Inversión"}
          createData={createTypeAd}
          storeData={typeAdStore}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DataManagement
          type={1}
          title={"Estrategia"}
          createData={createStrategy}
          storeData={strategyStore}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DataManagement type={2} title={"Tipo de Canal"} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <DataManagement
          type={3}
          title={"Fuente de Publicación"}
          createData={createSourceMedia}
          storeData={sourceMediaStore}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <DataManagement
          type={3}
          title={"Medio"}
          createData={createMedium}
          storeData={mediumStore}
        />
      </TabPanel>
    </Box>
  );
};
