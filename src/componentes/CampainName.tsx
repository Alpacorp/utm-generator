import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import Business from "../data/utm/businessLineUtm.json";
import TypeAd from "../data/utm/typeAdUtm.json";
import Strategy from "../data/utm/strategyUtm.json";
import ModelBuy from "../data/campain/modelBuy.json";

import { useForm } from "../hooks/useForm";
import toast, { Toaster } from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";

const { businessLineUtmData } = Business;
const { typeAdUtmData } = TypeAd;
const { strategyUtmData } = Strategy;
const { modelBuyData } = ModelBuy;

const CampainName = () => {
  const [campainName, setCampainName] = useState("");

  const [formValues, handleInputChange, reset] = useForm({
    businnessLineCampain: "",
    businessLine: "",
    typeAd: "",
    strategy: "",
    modelBuy: "",
    firstParameter: "",
    secondParameter: "",
    description: "",
    target: "",
    startDate: "",
    endDate: "",
    budget: "",
    marketer: "",
  });

  const { businessLine, typeAd, modelBuy, strategy } = formValues;

  const createUrlCampainName = () => {
    const campainName = `${businessLine}_${typeAd}_${strategy}_${modelBuy}`;
    setCampainName(campainName);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    createUrlCampainName();
    reset();
  };

  return (
    <>
      <h1>CampainName</h1>
      <Grid style={{ margin: "20px" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            style={{ margin: "10px" }}
            id="businessLine"
            name="businessLine"
            label="Producto"
            variant="outlined"
            select
            size="small"
            value={businessLine}
            onChange={handleInputChange}
            helperText="Selecciona un producto"
            required
          >
            <MenuItem value="">Selecciona</MenuItem>
            {businessLineUtmData.map((value: any, index: number) => (
              <MenuItem key={value.id} value={value.shortName}>
                {value.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            style={{ margin: "10px" }}
            id="typeAd"
            name="typeAd"
            label="Tipo de inversión"
            variant="outlined"
            select
            size="small"
            value={typeAd}
            onChange={handleInputChange}
            helperText="Selecciona el tipo de inversión"
            required
          >
            <MenuItem value="">Selecciona</MenuItem>
            {typeAdUtmData.map((value: any, index: number) => (
              <MenuItem key={value.id} value={value.shortName}>
                {value.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            style={{ margin: "10px" }}
            id="strategy"
            name="strategy"
            label="Estrategia"
            variant="outlined"
            select
            size="small"
            value={strategy}
            onChange={handleInputChange}
            helperText="Selecciona la estrategia"
            required
          >
            <MenuItem value="">Selecciona</MenuItem>
            {strategyUtmData.map((value: any, index: number) => (
              <MenuItem key={value.id} value={value.shortName}>
                {value.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            style={{ margin: "10px" }}
            id="modelBuy"
            name="modelBuy"
            label="Modelo de compra"
            variant="outlined"
            select
            size="small"
            value={modelBuy}
            onChange={handleInputChange}
            helperText="Selecciona un modelo de compra"
            required
            defaultValue=""
          >
            <MenuItem value="-1">Selecciona</MenuItem>
            {modelBuyData.map((value: any, index: number) => (
              <MenuItem key={value.id} value={value.shortName}>
                {value.name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            size="large"
            type="submit"
            color="primary"
            style={{ margin: "10px" }}
          >
            Generar nombre de campaña
          </Button>
        </form>
        {campainName !== "" && (
          <Grid container spacing={3} style={{ margin: "20px 0" }}>
            <Grid item xs={12}>
              <Paper>
                <Typography variant="h5" component="h3">
                  Haz click o toca la url para copiarla
                </Typography>
                <CopyToClipboard text={campainName}>
                  <p
                    onClick={() =>
                      toast("nombre copiado exitosamente", {
                        position: "bottom-right",
                      })
                    }
                    style={{ cursor: "pointer" }}
                    className="clickable"
                  >
                    {campainName}
                  </p>
                </CopyToClipboard>
              </Paper>
            </Grid>
          </Grid>
        )}
        <Toaster
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </Grid>
    </>
  );
};

export default CampainName;
