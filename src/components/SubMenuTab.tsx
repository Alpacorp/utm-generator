import { useState } from "react";
import { useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PsychologyIcon from "@mui/icons-material/Psychology";
import GridViewIcon from "@mui/icons-material/GridView";
import MediationIcon from "@mui/icons-material/Mediation";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import DataManagement from "./DataManagement";
import { useBusinessLine } from "../hooks/useBusinessLine";
import { useTypeAd } from "../hooks/useTypeAd";
import { useStrategy } from "../hooks/useStrategy";
import { useSourceMedia } from "../hooks/useSourceMedia";
import { useMedium } from "../hooks/useMedium";
import { useChannelType } from "../hooks/useChannelType";

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    createBusinessLine,
    businessLineStore,
    updateBusinessLineStore,
    deleteBusinessLineStore,
  } = useBusinessLine();

  const { createTypeAd, typeAdStore, updateTypeAd, deleteTypeAd } = useTypeAd();

  const { createStrategy, strategyStore, updateStrategy, deleteStrategy } =
    useStrategy();

  const { channelTypeStore, updateChannelType, deleteChannelType } =
    useChannelType();

  const {
    createSourceMedia,
    sourceMediaStore,
    updateSourceMedia,
    deleteSourceMedia,
  } = useSourceMedia();

  const { createMedium, mediumStore, updateMedium, deleteMedium } = useMedium();

  const { businessLine } = useSelector((state: any) => state.businessLine);
  const { typeAd } = useSelector((state: any) => state.typeAd);
  const { strategy } = useSelector((state: any) => state.strategy);
  const { channelType } = useSelector((state: any) => state.channelType);
  const { sourceMedia } = useSelector((state: any) => state.sourceMedia);
  const { medium } = useSelector((state: any) => state.medium);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          textColor={"secondary"}
          indicatorColor={"secondary"}
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
          storeData={businessLineStore}
          createData={createBusinessLine}
          updateData={updateBusinessLineStore}
          deleteData={deleteBusinessLineStore}
          getStoreData={businessLine?.businessLines}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DataManagement
          type={1}
          title={"Tipo de Inversión"}
          storeData={typeAdStore}
          createData={createTypeAd}
          updateData={updateTypeAd}
          deleteData={deleteTypeAd}
          getStoreData={typeAd?.typeAd}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DataManagement
          type={1}
          title={"Estrategia"}
          createData={createStrategy}
          storeData={strategyStore}
          updateData={updateStrategy}
          deleteData={deleteStrategy}
          getStoreData={strategy?.strategy}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DataManagement
          type={2}
          title={"Tipo de Canal"}
          storeData={channelTypeStore}
          updateData={updateChannelType}
          deleteData={deleteChannelType}
          getStoreData={channelType?.channels}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <DataManagement
          type={3}
          title={"Fuente de Publicación"}
          createData={createSourceMedia}
          storeData={sourceMediaStore}
          updateData={updateSourceMedia}
          deleteData={deleteSourceMedia}
          getStoreData={sourceMedia?.source}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <DataManagement
          type={3}
          title={"Medio"}
          createData={createMedium}
          storeData={mediumStore}
          updateData={updateMedium}
          deleteData={deleteMedium}
          getStoreData={medium?.mediums}
        />
      </TabPanel>
    </Box>
  );
};
