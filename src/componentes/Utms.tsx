import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Toaster, toast } from "react-hot-toast";

import Business from "../data/businessLine.json";
import Channel from "../data/channelType.json";
import TypeAd from "../data/typeAd.json";
import SourceMedia from "../data/sourceMedia.json";
import Strategy from "../data/strategy.json";
import Medium from "../data/medium.json";

import { useForm } from "../hooks/useForm";
import { transformText } from "../utils/transformText";
import "./Utms.css";

const { businessLineData } = Business;
const { channelTypeData } = Channel;
const { typeAdData } = TypeAd;
const { sourceMediaData } = SourceMedia;
const { strategyData } = Strategy;
const { mediumData } = Medium;

const Utms = () => {
  const [finalUrl, setFinalUrl] = useState("");
  const [utmCampainName, setCampainName] = useState("");

  const [formValues, handleInputChange, reset] = useForm({
    url: "",
    businessLine: "",
    typeAd: "",
    strategy: "",
    channelType: "",
    sourceMedia: "",
    medium: "",
    campain: "",
    content: "",
  });

  const {
    url,
    businessLine,
    channelType,
    typeAd,
    sourceMedia,
    strategy,
    medium,
    content,
  } = formValues;

  const sourceMediaFiltered = sourceMediaData.filter(
    (item) => item.idChannelType === channelType
  );

  const mediumFiltered = mediumData.filter(
    (item) => item.idChannelType === channelType
  );

  const createCampainName = () => {
    const name = `${businessLine}_${typeAd}_${strategy}`;
    setCampainName(name);
  };

  useEffect(() => {
    createCampainName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessLine, typeAd, strategy]);

  const createUrl = () => {
    createCampainName();
    const utmSourceName = `${sourceMedia}`;
    const utmMediumName = `${medium}`;
    const utmTermName = content ? `&utm_term=${content}` : "";
    const urlConcatenate = `${url}?utm_source=${utmSourceName}&utm_medium=${utmMediumName}&utm_campaign=${utmCampainName}${utmTermName}`;
    setFinalUrl(urlConcatenate);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    createUrl();
    reset();
  };

  return (
    <div>
      <Grid container style={{ margin: "20px 10px" }}>
        <Grid item lg={12} md={12} xs={12}>
          <form onSubmit={handleSubmit}>
            <TextField
              id="url"
              autoFocus
              name="url"
              label="url"
              value={url}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              error={false}
              required
              type="url"
              style={{ width: "100%", marginBottom: "10px" }}
              helperText="Coloca la url de la página destino"
            />
            <TextField
              style={{ width: "100%" }}
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
              style={{ width: "100%", marginBottom: "10px" }}
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
              style={{ width: "100%", marginBottom: "10px" }}
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
              style={{ width: "100%", marginBottom: "10px" }}
              id="channelType"
              name="channelType"
              label="Tipo de canal"
              variant="outlined"
              select
              size="small"
              value={channelType}
              onChange={handleInputChange}
              helperText="Selecciona el tipo de canal"
              required
              defaultValue=""
            >
              <MenuItem value="">Selecciona</MenuItem>
              {channelTypeData.map((value: any, index: number) => (
                <MenuItem key={value.id} value={value.id}>
                  {value.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              style={{ width: "100%", marginBottom: "10px" }}
              id="sourceMedia"
              name="sourceMedia"
              label="Selecciona"
              variant="outlined"
              select
              size="small"
              value={sourceMedia === -1 ? "" : sourceMedia}
              onChange={handleInputChange}
              helperText="Selecciona la fuente de publicación"
              required
              defaultValue=""
              disabled={channelType === "" ? true : false}
            >
              <MenuItem value="">Selecciona</MenuItem>
              {sourceMediaFiltered.map((value: any, index: number) => (
                <MenuItem key={value.id} value={value.name}>
                  {value.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              style={{ width: "100%", marginBottom: "10px" }}
              id="medium"
              name="medium"
              label="Medio"
              variant="outlined"
              select
              size="small"
              value={medium}
              onChange={handleInputChange}
              helperText="Selecciona el medio"
              required
            >
              <MenuItem value="">Selecciona</MenuItem>
              {mediumFiltered.map((value: any, index: number) => (
                <MenuItem key={value.id} value={value.name}>
                  {value.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              style={{ width: "100%", marginBottom: "10px" }}
              id="campain"
              name="campain"
              label="Campaña"
              value={utmCampainName}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              error={false}
              required
              disabled
              type="text"
              helperText="producto_inversion_estrategia"
            />
            <TextField
              style={{ width: "100%", marginBottom: "10px" }}
              id="content"
              name="content"
              label="Contenido"
              value={transformText(content)}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              error={false}
              type="text"
              helperText="Contenido adicional"
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              color="primary"
              style={{ display: "block", margin: "20px auto" }}
              disabled={
                !url ||
                !businessLine ||
                !typeAd ||
                !strategy ||
                !channelType ||
                !sourceMedia ||
                !medium ||
                !utmCampainName
              }
            >
              Generar url
            </Button>
          </form>
        </Grid>

        {finalUrl !== "" && (
          <Grid container style={{ width: "100%", margin: "20px 0" }}>
            <Grid item xs={12}>
              <Paper>
                <Typography variant="h6" component="h6">
                  Haz click o toca la url para copiarla
                </Typography>
                <CopyToClipboard text={finalUrl}>
                  <TextField
                    onClick={() =>
                      toast("url copiada", {
                        position: "bottom-right",
                      })
                    }
                    style={{
                      cursor: "pointer",
                      width: "100%",
                    }}
                    className="clickable"
                    value={finalUrl}
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
              background: "#1976D2",
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
    </div>
  );
};

export default Utms;
