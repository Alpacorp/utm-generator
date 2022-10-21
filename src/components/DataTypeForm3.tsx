import { useSelector } from "react-redux";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useForm2 } from "../hooks/useForm2";

const addNewData = {
  addName: "",
  addIdChannelType: "",
};

interface PropsDataForm3 {
  title?: string;
  createData?: any;
  storeData?: any;
  getStoreData?: any;
}

const DataTypeForm3 = ({ title, createData, storeData }: PropsDataForm3) => {
  const { addName, addIdChannelType, onInputChange, onResetForm } =
    useForm2(addNewData);

  const handleNewData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createData({ name: addName, idchanneltype: addIdChannelType });
    setTimeout(() => {
      storeData();
    }, 1000);
    onResetForm();
  };

  const { channelType: channelTypeData } = useSelector(
    (state: any) => state.channelType
  );

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
          helperText="Selecciona el tipo de canal"
          select
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
        <Grid style={{ margin: "10px 0 30px 0" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={addName.length === 0 || addIdChannelType.length === 0}
          >
            <Typography variant="button">Registrar {title}</Typography>
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default DataTypeForm3;
