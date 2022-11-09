import { useEffect } from "react";
import Swal from "sweetalert2";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useAuthStore } from "../hooks/useAuthStore";
import { useForm2 } from "../hooks/useForm2";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm2(loginFormFields);

  const loginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Alerta", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <Grid
      container
      itemScope
      itemType="https://schema.org/Thing"
      style={{
        display: "flex",
        justifyContent: "center",
        height: "80vh",
        alignItems: "center",
      }}
    >
      <Grid item lg={12} md={12} xs={12}>
        <Typography variant="h6" color="primary">
          Inicia Sesión
        </Typography>
        <form onSubmit={loginSubmit}>
          <Grid style={{ margin: "10px 0" }}>
            <TextField
              type="email"
              placeholder="Correo"
              name="loginEmail"
              value={loginEmail}
              onChange={onLoginInputChange}
              variant="outlined"
              helperText="Digita tu correo electrónico"
              size="small"
              required
              label="Correo"
              autoFocus
            />
          </Grid>
          <Grid style={{ margin: "10px 0" }}>
            <TextField
              type="password"
              placeholder="Contraseña"
              name="loginPassword"
              value={loginPassword}
              onChange={onLoginInputChange}
              autoComplete="off"
              variant="outlined"
              helperText="Digita tu contraseña"
              size="small"
              required
              label="Contraseña"
            />
          </Grid>
          <Grid style={{ margin: "10px 0" }}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              disabled={loginEmail.length === 0 || loginPassword.length === 0}
              type="submit"
              className="btnSubmit"
              value="Login"
            >
              Ingresar
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
