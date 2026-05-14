import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Grid, Snackbar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [formstate, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } =
    React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formstate === 0) {
        await handleLogin(username, password);
      }

      if (formstate === 1) {
        let result = await handleRegister(
          name,
          username,
          password
        );

        setUsername("");
        setPassword("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
      }
    } catch (err) {
      let message = err.response.data.message;
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          px: 2,
        }}
      >
        <CssBaseline />

        {/* Background */}
        <Grid
          sx={{
            position: "absolute",
            top: 0,
            left: 0,

            width: "100%",
            height: "100%",

            backgroundImage:
              "url(https://images.unsplash.com/photo-1585974738771-84483dd9f89f)",

            backgroundSize: "cover",
            backgroundPosition: "center",

            zIndex: 1,
          }}
        />

        {/* Form Card */}
        <Grid
          component={Paper}
          elevation={6}
          square={false}
          sx={{
            position: "relative",
            zIndex: 2,

            width: "100%",
            maxWidth: {
              xs: "100%",
              sm: "450px",
              md: "500px",
            },

            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

              p: {
                xs: 2,
                sm: 3,
                md: 4,
              },

              bgcolor: "white",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "secondary.main",
              }}
            >
              <LockOutlinedIcon />
            </Avatar>

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                width: "100%",
                mb: 2,
              }}
            >
              <Button
                fullWidth
                variant={
                  formstate === 0
                    ? "contained"
                    : "outlined"
                }
                onClick={() => {
                  setFormState(0);
                }}
              >
                Sign In
              </Button>

              <Button
                fullWidth
                variant={
                  formstate === 1
                    ? "contained"
                    : "outlined"
                }
                onClick={() => {
                  setFormState(1);
                }}
              >
                Sign Up
              </Button>
            </Box>

            {/* Form */}
            <Box
              component="form"
              noValidate
              sx={{
                width: "100%",
              }}
            >
              {formstate === 1 ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Fullname"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              ) : null}

              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />

              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <Typography
                sx={{
                  color: "red",
                  fontSize: "14px",
                  mt: 1,
                }}
              >
                {error}
              </Typography>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  height: 50,
                }}
                onClick={handleAuth}
              >
                {formstate === 0
                  ? "Login"
                  : "Register"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
      />
    </ThemeProvider>
  );
}