import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Toaster, toast } from "react-hot-toast";
import { useForm } from "../hooks/useForm";
import { transformText } from "../utils/transformText";
import "./Utms.css";
import { useBusinessLine } from "../hooks/useBusinessLine";
import { useTypeAd } from "../hooks/useTypeAd";
import { useStrategy } from "../hooks/useStrategy";
import { useChannelType } from "../hooks/useChannelType";
import { useSourceMedia } from "../hooks/useSourceMedia";
import { useMedium } from "../hooks/useMedium";

const Utms = () => {
  const [finalUrl, setFinalUrl] = useState("");
  const [utmCampainName, setCampainName] = useState("");

  const [formValues, handleInputChange, reset] = useForm({
    url: "",
    businessLine: "",
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
    sourceMedia,
    strategy,
    medium,
    content,
  } = formValues;

  const createCampainName = () => {
    const name = `${businessLine}_${strategy}`;
    setCampainName(name);
  };

  const { businessLine: businessLineData } = useSelector(
    (state: any) => state.businessLine
  );

  const { typeAd: typeAdData } = useSelector((state: any) => state.typeAd);

  const { strategy: strategyData } = useSelector(
    (state: any) => state.strategy
  );

  const { channelType: channelTypeData } = useSelector(
    (state: any) => state.channelType
  );

  const { sourceMedia: sourceMediaData } = useSelector(
    (state: any) => state.sourceMedia
  );

  const { medium: mediumData } = useSelector((state: any) => state.medium);

  const { businessLineStore } = useBusinessLine();
  const { typeAdStore } = useTypeAd();
  const { strategyStore } = useStrategy();
  const { channelTypeStore } = useChannelType();
  const { sourceMediaStore } = useSourceMedia();
  const { mediumStore } = useMedium();

  const sourceMediaFiltered = sourceMediaData?.source?.filter(
    (item: any) => item.idchanneltype === channelType
  );

  const mediumFiltered = mediumData?.mediums?.filter(
    (item: any) => item.idchanneltype === channelType
  );

  useEffect(() => {
    businessLineStore();
    typeAdStore();
    strategyStore();
    channelTypeStore();
    sourceMediaStore();
    mediumStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    createCampainName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessLine, strategy]);

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
    // desplazar hacia abajo

    const element = document.getElementById("finalUrl");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });

    // console.log("finalUrl", finalUrl);
  };

  return (
    <div>
      <h3>Registro de url + utms</h3>
      <Grid
        container
        style={{ margin: "20px 0", justifyContent: "center" }}
        itemScope
        itemType="https://schema.org/Thing"
      >
        <Grid item lg={6} md={12} xs={12}>
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
              value={businessLine ? businessLine : ""}
              onChange={handleInputChange}
              helperText="Selecciona un producto"
              required
            >
              <MenuItem value="">Selecciona</MenuItem>
              {businessLineData?.businessLines?.map((value: any) => (
                <MenuItem key={value._id} value={value.shortname}>
                  {value.name + " - " + value.shortname}
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
              value={strategy ? strategy : ""}
              onChange={handleInputChange}
              helperText="Selecciona la estrategia"
              required
            >
              <MenuItem value="">Selecciona</MenuItem>
              {strategyData?.strategy?.map((value: any, index: number) => (
                <MenuItem key={value._id} value={value.shortname}>
                  {value.name + " - " + value.shortname}
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
              value={channelType ? channelType : ""}
              onChange={handleInputChange}
              helperText="Selecciona el tipo de canal"
              required
            >
              <MenuItem value="">Selecciona</MenuItem>
              {channelTypeData?.channels?.map((value: any, index: number) => (
                <MenuItem key={value._id} value={value.idchanneltype}>
                  {value.name +
                    " - " +
                    value.shortname +
                    " - " +
                    value.idchanneltype}
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
              value={sourceMedia ? sourceMedia : ""}
              onChange={handleInputChange}
              helperText="Selecciona la fuente de publicación"
              required
              disabled={channelType === "" ? true : false}
            >
              <MenuItem value="">Selecciona</MenuItem>
              {sourceMediaFiltered?.map((value: any, index: number) => (
                <MenuItem key={value._id} value={value.name}>
                  {value.name + " - " + value.idchanneltype}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              style={{ width: "100%", marginBottom: "10px" }}
              id="medium"
              name="medium"
              label="Medio"
              variant="outlined"
              disabled={channelType === "" ? true : false}
              select
              size="small"
              value={medium ? medium : ""}
              onChange={handleInputChange}
              helperText="Selecciona el medio"
              required
            >
              <MenuItem value="">Selecciona</MenuItem>
              {mediumFiltered?.map((value: any, index: number) => (
                <MenuItem key={value._id} value={value.name}>
                  {value.name + " - " + value.idchanneltype}
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
                    id="finalUrl"
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
