import MenuItem from "@mui/material/MenuItem";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

import Business from "../data/businessLine.json";
import Channel from "../data/channelType.json";
import TypeAd from "../data/typeAd.json";
import SourceMedia from "../data/sourceMedia.json";
import Strategy from "../data/strategy.json";
import Medium from "../data/medium.json";

import CopyToClipboard from "react-copy-to-clipboard";
import { Toaster, toast } from "react-hot-toast";

import { useForm } from "../hooks/useForm";
import { transformText } from "../utils/transformText";
import { useState } from "react";

const { businessLineData } = Business;
const { channelTypeData } = Channel;
const { typeAdData } = TypeAd;
const { sourceMediaData } = SourceMedia;
const { strategyData } = Strategy;
const { mediumData } = Medium;

const Home = () => {
  const [finalUrl, setFinalUrl] = useState("");

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
    campain,
    content,
  } = formValues;

  const sourceMediaFiltered = sourceMediaData.filter(
    (item) => item.idChannelType === channelType
  );

  const createUrl = () => {
    const utmSourceName = `${sourceMedia}`;
    const utmMediumName = `${medium}`;
    const utmCampainName = `${businessLine}_${typeAd}_${strategy}`;
    const utmTermName = `${campain}`;
    const urlConcatenate = `${url}?utm_source=${utmSourceName}&utm_medium=${utmMediumName}&utm_campaign=${utmCampainName}&utm_term=${utmTermName}`;
    console.log("urlConcatenate", urlConcatenate);
    setFinalUrl(urlConcatenate);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formValues);
    createUrl();
    reset();
  };

  return (
    <div>
      <Grid style={{ margin: "20px" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="url"
            name="url"
            label="url"
            value={url}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            error={false}
            required
            type="url"
            helperText="Coloca la url de la página destino"
          />
          <TextField
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
            {businessLineData.map((value: any, index: number) => (
              <MenuItem key={value.id} value={value.shortName}>
                {value.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
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
            {typeAdData.map((value: any, index: number) => (
              <MenuItem key={value.id} value={value.shortName}>
                {value.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
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
            {strategyData.map((value: any, index: number) => (
              <MenuItem key={value.id} value={value.shortName}>
                {value.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
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
            {channelTypeData.map((value: any, index: number) => (
              <MenuItem key={value.id} value={value.id}>
                {value.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
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
            {sourceMediaFiltered.map((value: any, index: number) => (
              <MenuItem key={value.id} value={value.name}>
                {value.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
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
            {mediumData.map((value: any, index: number) => (
              <MenuItem key={value.id} value={value.name}>
                {value.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="campain"
            name="campain"
            label="Nombre de la campaña"
            value={transformText(campain)}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            error={false}
            required
            type="text"
            helperText="Digita el nombre de la campaña"
          />
          <TextField
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
          >
            Send
          </Button>
        </form>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h5" component="h3">
                Url Final
              </Typography>
              <CopyToClipboard text={finalUrl}>
                <p
                  onClick={() =>
                    toast("url copiada exitosamente", {
                      position: "bottom-right",
                    })
                  }
                  style={{ cursor: "pointer" }}
                  className="clickable"
                >
                  {finalUrl}
                </p>
              </CopyToClipboard>
            </Paper>
          </Grid>
        </Grid>
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
    </div>
  );
};

export default Home;
