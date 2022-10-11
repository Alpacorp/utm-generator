import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../componentes/Login";
import { MenuTab } from "../componentes/MenuTab";
import Layout from "./Layout";

const AppRouter = () => {
  const appStatus = process.env.REACT_APP_MAINTENANCE;
  const authStatus = false;

  return (
    <>
      {appStatus === "true" ? (
        <>
          <h1>En mantenimiento</h1>
          <p>Estamos trabajando para mejorar tu experiencia</p>
        </>
      ) : (
        <Layout>
          <div
            className="mainLogo"
            style={{ maxWidth: "300px", width: "100%", margin: "0 auto" }}
            itemScope
            itemType="http://schema.org/Brand"
          >
            <img
              alt="logo del banco caja social"
              itemProp="logo"
              src="https://www.bancocajasocial.com/portalserver/content/atom/ed3567c4-64a3-462a-93a4-7c6466ef50e8/content/General/Logo%20Banco%20Caja%20Social?id=ff6b0aed-6fb8-4be2-9326-cb5847feac22"
            />
          </div>
          <Routes>
            {authStatus ? (
              <Route path="/*" element={<MenuTab />} />
            ) : (
              <Route path="/auth/*" element={<Login />} />
            )}

            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default AppRouter;
