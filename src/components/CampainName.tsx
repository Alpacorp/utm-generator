import { useState } from "react";
import { Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";

import Business from "../data/businessLine.json";
import TypeAd from "../data/typeAd.json";
import Strategy from "../data/strategy.json";
import ModelBuy from "../data/modelBuy.json";
import Audience from "../data/audience.json";

import { useForm } from "../hooks/useForm";
import { transformTextCampain } from "../utils/transformText";

const { businessLineData } = Business;
const { typeAdData } = TypeAd;
const { strategyData } = Strategy;
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
      <Grid container>
        <Grid
          item
          lg={4}
          md={4}
          xs={12}
          style={{ padding: "0 20px" }}
          itemScope
          itemType="https://schema.org/Thing"
        >
          <h3 itemProp="description">Nombre Campaña</h3>
          <form onSubmit={handleSubmitCampain}>
            <TextField
              style={{ margin: "10px 0", width: "100%" }}
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
              {businessLineData.map((value: any, index: number) => (
                <MenuItem key={value.id} value={value.shortName}>
                  {value.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              style={{ margin: "10px 0", width: "100%" }}
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
              {typeAdData.map((value: any, index: number) => (
                <MenuItem key={value.id} value={value.shortName}>
                  {value.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              style={{ margin: "10px 0", width: "100%" }}
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
              {strategyData.map((value: any, index: number) => (
                <MenuItem key={value.id} value={value.shortName}>
                  {value.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              style={{ margin: "10px 0", width: "100%" }}
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
            <Grid container style={{ margin: "20px 0" }}>
              <Grid item xs={12}>
                <Paper>
                  <CopyToClipboard text={campainName}>
                    <TextField
                      size="small"
                      value={campainName}
                      helperText="Haz click o toca el nombre de campaña para copiarlo"
                      required
                      onClick={() =>
                        toast("nombre de campaña copiado", {
                          position: "bottom-right",
                        })
                      }
                      style={{
                        cursor: "pointer",
                        width: "100%",
                      }}
                      disabled
                      minRows={2}
                      multiline
                      variant="filled"
                    />
                  </CopyToClipboard>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid
          item
          lg={4}
          md={4}
          xs={12}
          style={{ padding: "0 20px" }}
          itemScope
          itemType="https://schema.org/Thing"
        >
          <h3 itemProp="description">Nombre del Grupo de Anuncios</h3>
          <form onSubmit={handleSubmitGroup}>
            <TextField
              style={{ margin: "10px 0", width: "100%" }}
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
            <Grid container style={{ margin: "20px 0" }}>
              <Grid item xs={12}>
                <Paper>
                  <CopyToClipboard text={groupName}>
                    <TextField
                      size="small"
                      value={groupName}
                      helperText="Haz click o toca el nombre del grupo de anuncios para copiarlo"
                      required
                      onClick={() =>
                        toast("nombre de grupo de anuncios copiado", {
                          position: "bottom-right",
                        })
                      }
                      style={{
                        cursor: "pointer",
                        width: "100%",
                      }}
                      disabled
                      minRows={2}
                      multiline
                      variant="filled"
                    />
                  </CopyToClipboard>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid
          item
          lg={4}
          md={4}
          xs={12}
          style={{ padding: "0 20px" }}
          itemScope
          itemType="https://schema.org/Thing"
        >
          <h3 itemProp="description">Nombre del Anuncio</h3>
          <form onSubmit={handleSubmitAd}>
            <TextField
              style={{ margin: "10px 0", width: "100%" }}
              id="reference"
              name="reference"
              label="Referencia"
              variant="outlined"
              size="small"
              value={transformTextCampain(reference)}
              onChange={handleInputChange}
              helperText="Selecciona un tipo de audiencia"
              required
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
            <Grid container style={{ margin: "20px 0" }}>
              <Grid item xs={12}>
                <Paper>
                  <CopyToClipboard text={adName}>
                    <TextField
                      size="small"
                      value={adName}
                      helperText="Haz click o toca el nombre de anuncio para copiarlo"
                      required
                      onClick={() =>
                        toast("nombre de anuncio copiado", {
                          position: "bottom-right",
                        })
                      }
                      style={{
                        cursor: "pointer",
                        width: "100%",
                      }}
                      disabled
                      minRows={2}
                      multiline
                      variant="filled"
                    />
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
                background: "#b01630",
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
