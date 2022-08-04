import { Route, Routes } from "react-router-dom";
import { MenuTab } from "../componentes/MenuTab";
import Layout from "./Layout";

const AppRouter = () => {
  return (
    <>
      <Layout>
        <div className="mainLogo" style={{ width: "20%", margin: "0 auto" }}>
          <img
            alt="logo del banco caja social"
            src="https://www.bancocajasocial.com/portalserver/content/atom/ed3567c4-64a3-462a-93a4-7c6466ef50e8/content/General/Logo%20Banco%20Caja%20Social?id=ff6b0aed-6fb8-4be2-9326-cb5847feac22"
          />
        </div>
        <Routes>
          <Route path="/" element={<MenuTab />} />
        </Routes>
      </Layout>
    </>
  );
};

export default AppRouter;
