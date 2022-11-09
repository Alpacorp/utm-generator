import { Navigate, Route, Routes } from "react-router-dom";
import { Typography, Button, Grid } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { LoginPage } from "../components/LoginPage";
import { MenuTab } from "../components/MenuTab";
import { useAuthStore } from "../hooks/useAuthStore";
import Layout from "./Layout";
import { useEffect } from "react";

const AppRouter = () => {
  const appStatus = process.env.REACT_APP_MAINTENANCE;

  const { status, checkAuthToken, user, startLogout } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
    // eslint-disable-next-line
  }, []);

  if (status === "checking") {
    return <h3>Cargando ...</h3>;
  }

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
            style={{
              // maxWidth: "300px",
              width: "100%",
              // margin: "0 auto",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
            itemScope
            itemType="http://schema.org/Brand"
          >
            <div
              style={{
                width: "100%",
                maxWidth: "300px",
              }}
            >
              <img
                alt="logo del banco caja social"
                itemProp="logo"
                src="https://www.bancocajasocial.com/portalserver/content/atom/ed3567c4-64a3-462a-93a4-7c6466ef50e8/content/General/Logo%20Banco%20Caja%20Social?id=ff6b0aed-6fb8-4be2-9326-cb5847feac22"
              />
            </div>

            {status === "authenticated" ? (
              <div>
                <Grid style={{ margin: "20px 0" }}>
                  <Typography variant="h6" color="primary" fontSize={18}>
                    Hola <strong>{user?.name || "Usuario"}</strong>
                  </Typography>
                  <Typography
                    variant="inherit"
                    color="primary"
                    fontSize={13}
                    style={{ margin: "5px 0" }}
                  >
                    Perfil <strong>{user.role || "Rol"}</strong>
                  </Typography>
                  <Button
                    startIcon={<ExitToAppIcon />}
                    size="small"
                    onClick={startLogout}
                    variant="outlined"
                  >
                    Cerrar Sesión
                  </Button>
                </Grid>
              </div>
            ) : (
              ""
            )}
          </div>
          <Routes>
            {status === "not-authenticated" ? (
              <>
                <Route path="/auth/*" element={<LoginPage />} />
                <Route path="/*" element={<Navigate to="/auth/login" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<MenuTab />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default AppRouter;
