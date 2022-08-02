import { Route, Routes } from "react-router-dom";
import Home from "../componentes/Home";
import Layout from "./Layout";

const AppRouter = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </>
  );
};

export default AppRouter;
