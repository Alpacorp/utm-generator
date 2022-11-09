import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useAuthStore } from "../hooks/useAuthStore";
import { useForm2 } from "../hooks/useForm2";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
          <Grid style={{ margin: "10px 0" }}></Grid>
          <FormControl variant="outlined" sx={{ m: 1, width: "25ch" }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Correo
            </InputLabel>
            <OutlinedInput
              type="email"
              name="loginEmail"
              value={loginEmail}
              onChange={onLoginInputChange}
              required
              label="Correo"
              autoFocus
            />
          </FormControl>
          <FormControl variant="outlined" sx={{ m: 1, width: "25ch" }}>
            <InputLabel htmlFor="loginPassword">Contraseña</InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              value={loginPassword}
              name="loginPassword"
              id="loginPassword"
              onChange={onLoginInputChange}
              label="Contraseña"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
