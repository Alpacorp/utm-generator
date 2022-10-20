import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useBusinessLine } from "../hooks/useBusinessLine";
import { useChannelType } from "../hooks/useChannelType";
import { useForm2 } from "../hooks/useForm2";

const addNewData = {
  addName: "",
  addShortName: "",
  addIdChannelType: "",
};

interface PropsDataForm2 {
  title?: string;
}

const DataTypeForm2 = ({ title }: PropsDataForm2) => {
  const {
    addName,
    addShortName,
    addIdChannelType,
    onInputChange,
    onResetForm,
  } = useForm2(addNewData);

  const { channelTypeStore, createChannelType } = useChannelType();

  const handleNewData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createChannelType({
      name: addName,
      shortname: addShortName,
      idchanneltype: addIdChannelType,
    });
    channelTypeStore();
    onResetForm();
  };

  return (
    <div style={{ width: "100%" }}>
      <h3>Registro de {title}</h3>
      <form onSubmit={handleNewData}>
        <TextField
          id="addName"
          name="addName"
          label="Nombre"
          value={addName}
          onChange={onInputChange}
          variant="outlined"
          size="small"
          error={false}
          required
          type="text"
          style={{ width: "100%", marginBottom: "10px" }}
          helperText="Digital el nombre"
        />
        <TextField
          id="addShortName"
          name="addShortName"
          label="Nombre corto"
          value={addShortName}
          onChange={onInputChange}
          variant="outlined"
          size="small"
          error={false}
          required
          type="text"
          style={{ width: "100%", marginBottom: "10px" }}
          helperText="Digital el nombre corto"
        />
        <TextField
          id="addIdChannelType"
          name="addIdChannelType"
          label="Tipo de Canal"
          value={addIdChannelType}
          onChange={onInputChange}
          variant="outlined"
          size="small"
          error={false}
          required
          type="number"
          style={{ width: "100%", marginBottom: "10px" }}
          helperText="Digital el nombre corto"
          select
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
        </TextField>
        <Grid style={{ margin: "10px 0 30px 0" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={addName.length === 0 || addShortName.length === 0}
          >
            <Typography variant="button">Registrar {title}</Typography>
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default DataTypeForm2;
