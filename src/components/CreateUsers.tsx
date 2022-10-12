import Swal from "sweetalert2";
import { useAuthStore } from "../hooks/useAuthStore";
import { useForm2 } from "../hooks/useForm2";
import { Grid, Typography, TextField, Button, MenuItem } from "@mui/material";

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerRole: "",
  registerPassword: "",
  registerPassword2: "",
};

const CreateUsers = () => {
  const { startRegister } = useAuthStore();
  const {
    registerName,
    registerEmail,
    registerRole,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
    onResetForm: onRegisterResetForm,
  } = useForm2(registerFormFields);

  const registerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (registerPassword !== registerPassword2) {
      Swal.fire("Error", "Las contraseñas deben de ser iguales", "error");
      return;
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      role: registerRole,
      password: registerPassword,
    });

    setTimeout(() => {
      onRegisterResetForm();
    }, 50);
  };

  return (
    <Grid style={{ padding: 10 }}>
      <h3>Registro de nuevos usuarios</h3>
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
            // style={{ maxWidth: "210px", width: "100%" }}
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
  );
};

export default CreateUsers;
