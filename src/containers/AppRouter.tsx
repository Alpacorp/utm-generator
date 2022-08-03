import { Route, Routes } from "react-router-dom";
import { MenuTab } from "../componentes/MenuTab";
import Layout from "./Layout";

const AppRouter = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<MenuTab />} />
        </Routes>
      </Layout>
    </>
  );
};

export default AppRouter;
