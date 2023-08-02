import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SignInInterface } from "../interface/ISignIn";
import "../App.css";
import { Link, useLocation } from "react-router-dom";
import LoginPageBg from "../image/LoginPageBg.jpg";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Kanit",
      textTransform: "none",
      fontSize: 18,
    },
  },
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Prop = {
  loginRole: any;
};

function SignIn({ loginRole }: Prop) {
  const [signin, setSignin] = useState<Partial<SignInInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [openMember, setOpenMember] = useState(false);

  const location = useLocation();

  const checkLocation = () => {
    location.pathname === "/employee" && setOpenEmployee(!openEmployee);
    location.pathname === "/member" && setOpenMember(!openMember);
  };

  useEffect(() => {
    checkLocation();
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const submit = async () => {
    let res = await loginRole(signin);
    console.log(res);
    if (res) {
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            เข้าสู่ระบบสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            อีเมลหรือรหัสผ่านไม่ถูกต้อง
          </Alert>
        </Snackbar>

        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
            backgroundSize: "cover",
            color: "#f5f5f5",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${LoginPageBg})`,
          }}
        >
          <Grid
            item
            xs={5}
            component={Paper}
            elevation={6}
            square
            sx={{ borderRadius: 10 }}
          >
            <Box
              sx={{
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LoginIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{
                  textTransform: "uppercase",
                  color: "#000",
                  fontFamily: "Kanit, sans-serif",
                }}
              >
                เข้าสู่ระบบ
              </Typography>
              <Box sx={{ mt: 1, flexDirection: "column" }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Email"
                  label="อีเมล"
                  name="Email"
                  autoComplete="email"
                  autoFocus
                  value={signin.Email || ""}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Password"
                  label="รหัสผ่าน"
                  name="Password"
                  type="password"
                  autoComplete="current-password"
                  value={signin.Password || ""}
                  onChange={handleInputChange}
                />

                {/* ปุ่มเข้าสู่ระบบ */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{
                    color: "#fff",
                    borderRadius: 20,
                    padding: "10px 40px",
                    backgroundColor: "#008000",
                    fontSize: "18px",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onClick={submit}
                >
                  เข้าสู่ระบบ
                </Button>

                {/* ปุ่ม back */}
                <Link
                  to="/role"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    style={{
                      color: "#fff",
                      borderRadius: 20,
                      backgroundColor: "#C0C0C0",
                      padding: "10px 40px",
                      fontSize: "18px",
                    }}
                  >
                    ถอยกลับ
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;
