import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Grid, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useAuthStore } from "../hooks/useAuthStore";
import { useForm2 } from "../hooks/useForm2";
import Actions from "./Actions";
import { useUsers } from "../hooks/useUsers";

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerRole: "",
  registerPassword: "",
  registerPassword2: "",
};

const CreateUsers = () => {
  const { user } = useAuthStore();
  const { createUser, usersStore, updateUser, deleteUser } = useUsers();

  const { user: userData } = useSelector((state: any) => state.users);

  const {
    registerName,
    registerEmail,
    registerRole,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
    onResetForm: onRegisterResetForm,
  } = useForm2(registerFormFields);

  useEffect(() => {
    if (user?.role === "admin") {
      usersStore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const registerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (registerPassword !== registerPassword2) {
      Swal.fire("Error", "Las contraseñas deben de ser iguales", "error");
      return;
    }

    createUser({
      name: registerName,
      email: registerEmail,
      role: registerRole,
      password: registerPassword,
    });

    setTimeout(() => {
      usersStore();
    }, 1000);

    setTimeout(() => {
      onRegisterResetForm();
    }, 50);
  };

  const [rowId, setRowId] = useState(null);
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      { field: "_id", headerName: "id", width: 250 },
      { field: "date", headerName: "created date", width: 250 },
      { field: "name", headerName: "name", width: 250, editable: true },
      {
        field: "email",
        headerName: "email",
        width: 350,
        editable: true,
      },
      {
        field: "role",
        headerName: "role",
        width: 100,
        editable: true,
        type: "singleSelect",
        valueOptions: ["admin", "user"],
      },
      {
        field: "actions",
        headerName: "actions",
        type: "actions",
        width: 200,
        renderCell: (params: any) => {
          return (
            <Actions
              {...{
                params,
                rowId,
                setRowId,
                updateData: updateUser,
                storeData: usersStore,
                deleteData: deleteUser,
              }}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rowId]
  );

  useMemo(() => {
    setData(userData.users ? userData.users : []);
  }, [userData]);

  return (
    <div>
      <h3>Registro de nuevos usuarios</h3>
      <Grid
        container
        style={{ margin: "20px 0", justifyContent: "center", padding: 10 }}
        itemScope
        itemType="https://schema.org/Thing"
      >
        <Grid item lg={6} md={12} xs={12}>
          <form onSubmit={registerSubmit}>
            <Grid style={{ margin: "10px 0" }}>
              <TextField
                type="text"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
                variant="outlined"
                helperText="Digita tu nombre"
                size="small"
                required
                label="Nombre"
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid style={{ margin: "10px 0" }}>
              <TextField
                type="email"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
                variant="outlined"
                helperText="Digita tu correo electrónico"
                size="small"
                required
                label="Correo"
                fullWidth
              />
            </Grid>
            <Grid style={{ margin: "10px 0" }}>
              <TextField
                type="email"
                placeholder="Rol"
                name="registerRole"
                value={registerRole}
                onChange={onRegisterInputChange}
                variant="outlined"
                helperText="Selecciona el rol"
                size="small"
                required
                label="Rol"
                select
                defaultValue={registerRole}
                fullWidth
              >
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="user">Usuario</MenuItem>
              </TextField>
            </Grid>
            <Grid style={{ margin: "10px 0" }}>
              <TextField
                type="password"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
                autoComplete="off"
                variant="outlined"
                helperText="Digita tu contraseña"
                size="small"
                required
                label="Contraseña"
                fullWidth
              />
            </Grid>
            <Grid style={{ margin: "10px 0" }}>
              <TextField
                type="password"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
                autoComplete="off"
                variant="outlined"
                helperText="Repite la contraseña"
                size="small"
                required
                label="Repite la contraseña"
                fullWidth
              />
            </Grid>
            <Grid style={{ margin: "10px 0" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  registerName.length === 0 ||
                  registerEmail.length === 0 ||
                  registerPassword.length === 0 ||
                  registerPassword2.length === 0
                }
              >
                <Typography variant="button">Registrar</Typography>
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          getRowId={(row: any) => row._id}
          rowsPerPageOptions={[5, 10, 20, 50]}
          components={{
            Toolbar: GridToolbar,
          }}
          getRowSpacing={(params: any) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          onCellEditCommit={(params: any) => {
            setRowId(params.id);
          }}
        />
      </div>
    </div>
  );
};

export default CreateUsers;
