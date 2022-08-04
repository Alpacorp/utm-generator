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
import Audience from "../data/campain/audience.json";

import { useForm } from "../hooks/useForm";
import toast, { Toaster } from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";
import { transformTextCampain } from "../utils/transformText";

const { businessLineUtmData } = Business;
const { typeAdUtmData } = TypeAd;
const { strategyUtmData } = Strategy;
const { modelBuyData } = ModelBuy;
const { audienceData } = Audience;

const CampainName = () => {
  const [campainName, setCampainName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [adName, setAdName] = useState("");

  const [formValues, handleInputChange, reset] = useForm({
    businnessLineCampain: "",
    businessLine: "",
    typeAd: "",
    strategy: "",
    modelBuy: "",
    audience: "",
    reference: "",
  });

  const { businessLine, typeAd, modelBuy, strategy, audience, reference } =
    formValues;

  const createUrlCampainName = () => {
    const campainName = `${businessLine}_${typeAd}_${strategy}_${modelBuy}`;
    setCampainName(campainName);
  };

  const handleSubmitCampain = (event: any) => {
    event.preventDefault();
    createUrlCampainName();
    reset();
  };

  const handleSubmitGroup = (event: any) => {
    event.preventDefault();
    const groupName = `${audience}`;
    setGroupName(groupName);
    reset();
  };

  const handleSubmitAd = (event: any) => {
    event.preventDefault();
    const AdName = `${reference}`;
    setAdName(AdName);
    reset();
  };

  return (
    <>
      <Grid container style={{ margin: "20px" }}>
        <Grid item xs={4} style={{ padding: "0 20px" }}>
          <h2>Nombre Campaña</h2>
          <form onSubmit={handleSubmitCampain}>
            <TextField
              style={{ margin: "10px", width: "100%" }}
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
              style={{ margin: "10px", width: "100%" }}
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
              style={{ margin: "10px", width: "100%" }}
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
              style={{ margin: "10px", width: "100%" }}
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
              size="small"
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
                    Haz click o toca el nombre para copiarlo
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
        <Grid item xs={4} style={{ padding: "0 20px" }}>
          <h2>Nombre del Grupo de Anuncios</h2>
          <form onSubmit={handleSubmitGroup}>
            <TextField
              style={{ margin: "10px", width: "100%" }}
              id="audience"
              name="audience"
              label="Audiencia"
              variant="outlined"
              select
              size="small"
              value={audience}
              onChange={handleInputChange}
              helperText="Selecciona un tipo de audiencia"
              required
              defaultValue=""
            >
              <MenuItem value="-1">Selecciona</MenuItem>
              {audienceData.map((value: any, index: number) => (
                <MenuItem key={value.id} value={value.shortName}>
                  {value.name}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              size="small"
              type="submit"
              color="primary"
              style={{ margin: "10px" }}
            >
              Generar nombre de grupo de anuncios
            </Button>
          </form>
          {groupName !== "" && (
            <Grid container spacing={3} style={{ margin: "20px 0" }}>
              <Grid item xs={12}>
                <Paper>
                  <Typography variant="h5" component="h4">
                    Haz click o toca el nombre de grupo de anuncios para
                    copiarlo
                  </Typography>
                  <CopyToClipboard text={groupName}>
                    <p
                      onClick={() =>
                        toast(
                          "nombre de grupo de anuncios copiado exitosamente",
                          {
                            position: "bottom-right",
                          }
                        )
                      }
                      style={{ cursor: "pointer" }}
                      className="clickable"
                    >
                      {groupName}
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
        <Grid item xs={4} style={{ padding: "0 20px" }}>
          <h2>Nombre del Anuncio</h2>
          <form onSubmit={handleSubmitAd}>
            <TextField
              style={{ margin: "10px", width: "100%" }}
              id="reference"
              name="reference"
              label="Referencia"
              variant="outlined"
              size="small"
              value={transformTextCampain(reference)}
              onChange={handleInputChange}
              helperText="Selecciona un tipo de audiencia"
              required
              defaultValue=""
            />
            <Button
              variant="contained"
              size="small"
              type="submit"
              color="primary"
              style={{ margin: "10px" }}
            >
              Generar nombre de anuncio
            </Button>
          </form>
          {adName !== "" && (
            <Grid container spacing={3} style={{ margin: "20px 0" }}>
              <Grid item xs={12}>
                <Paper>
                  <Typography variant="h5" component="h4">
                    Haz click o toca el nombre anuncio para copiarlo
                  </Typography>
                  <CopyToClipboard text={adName}>
                    <p
                      onClick={() =>
                        toast("nombre de anuncio copiado exitosamente", {
                          position: "bottom-right",
                        })
                      }
                      style={{ cursor: "pointer" }}
                      className="clickable"
                    >
                      {adName}
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
      </Grid>
    </>
  );
};

export default CampainName;
