import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Grid,
  Box,
  createStyles,
  Image,
} from "@mantine/core";
import ZamodiLogo from "./../assets/Zamodi-Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IconLock, IconMail, IconUser } from "@tabler/icons";
import authLogo from "./../assets/Auth.svg";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../services/authService";
import Chargement from "../component/Chargement";
import { verifyEmail } from "../utils/fonctions";
import { LoginSocialFacebook } from "reactjs-social-login";
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  logo: {
    marginBottom: "1%",
    marginInline: "10vw",
    justifyContent: "center",
    alignContent: "center",
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
  loginButton: {
    backgroundColor: "#20986e",
    width: "100%",
    marginTop: "3vh",
  },
  partieChamp: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    height: "100vh",
  },
  partieNeutre: {
    backgroundColor: "#20986e",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: " 110px 0px 0px 0px ",
    border: "1px solid white",
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  hiddenDesktop: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  boxStyle: {
    width: "70%",
    [theme.fn.smallerThan("md")]: {
      width: "80%",
    },
  },
}));

// const verifyEmail = (email)=> {
//   var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
//   return regex.test(email);
// }
function RegisterPage(props) {
  const errRef = useRef();
  const [user, setUser] = useState({ valeur: "", erreur: false });
  const [pwd, setPwd] = useState({ valeur: "", erreur: false });
  const [mail, setMail] = useState({ valeur: "", erreur: false });
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setvisible] = useState(false);
  const [condition, setcondition] = useState({ valeur: false, erreur: false });
  const navigation = useNavigate();
  const { classes, cx } = useStyles();
  const [type, toggle] = useToggle(["register", "login"]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.valeur && user.valeur !== "") {
      if (mail.valeur && mail.valeur !== "" && verifyEmail(mail.valeur)) {
        if (pwd.valeur && pwd.valeur.length >= 8) {
          if (condition.valeur) {
            setvisible(true);
            authService.register(user.valeur, mail.valeur, pwd.valeur).then(
              (data) => {
                if (data.status === 200 || data.state === "success") {
                  setvisible(false);
                  console.log(data);
                  // navigate("/login");
                  // window.location.reload();
                } else {
                  setvisible(false);
                  setErrMsg(data.message);
                }
              },
              (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();

                setvisible(false);
                setErrMsg(resMessage);
              }
            );
          } else {
            setcondition({
              ...condition,
              erreur: "Veillez accepter les termes et conditions d'utilisation",
            });
          }
        } else {
          setPwd({ ...pwd, erreur: "Veillez entrer un mot de passe valide" });
        }
      } else {
        setMail({ ...mail, erreur: "Veillez entrer un mail valide" });
      }
    } else {
      setUser({ ...user, erreur: "Veillez entrer un nom d'utilisateur" });
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        console.log("info user ", res.data);
      } catch (error) {
        console.log(error);
      }

      var decoded = jwt_decode(tokenResponse.credential);
      console.log("decodage du token", decoded);
      // email = decoded.email
      // email verify = decoded.verify_email
      // familiname = decoded.family_name
      // given_name = decoded.given_name
      // piture = decoded.picture
    },
    onError: (error) => {
      console.log("Login Failed");
    },
  });

  return (
    <div
      style={{
        maxWidth: "100vw",
        overflow: "hidden",
        maxHeight: "100vh",
        position: "relative",
      }}
    >
      {/* LAZY LOAD */}
      <Chargement visible={visible} />
      <Grid
        className={"secondplaceLogin"}
        style={{ maxHeight: "102vh", overflow: "hidden" }}
      >
        {/* Partie une */}
        <Grid.Col
          md={6}
          order={2}
          orderMd={1}
          className={` ${classes.partieChamp}`}
        >
          <Box style={{ width: "70%" }}>
            <Image
              src={ZamodiLogo}
              width={"70%"}
              mb={"8%"}
              className={classes.hiddenMobile}
            />
            <Image src={ZamodiLogo} className={classes.logo} />

            <Text size={28} weight={900}>
              Créer un compte
            </Text>
            <Text size={"xs"} mb={"8%"}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi,
            </Text>
            <Text
              ta={"center"}
              c={"red"}
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </Text>
            <form>
              <Stack>
                <TextInput
                  icon={
                    <IconUser
                      size={20}
                      color={"#20986e"}
                      className={classes.lesIcones}
                    />
                  }
                  radius="32px"
                  variant={"filled"}
                  placeholder="Your name"
                  value={user.valeur}
                  onChange={(event) =>
                    setUser({
                      valeur: event.currentTarget.value,
                      erreur: false,
                    })
                  }
                  error={user.erreur && <>{user.erreur}</>}
                />

                <TextInput
                  radius="32px"
                  icon={
                    <IconMail
                      size={20}
                      color={"#20986e"}
                      className={classes.lesIcones}
                    />
                  }
                  required
                  size={"sm"}
                  placeholder="exemple@zamodi.com"
                  variant={"filled"}
                  value={mail.valeur}
                  onChange={(event) =>
                    setMail({
                      valeur: event.currentTarget.value,
                      erreur: false,
                    })
                  }
                  error={mail.erreur && <>{mail.erreur}</>}
                />

                <PasswordInput
                  radius="32px"
                  size={"sm"}
                  icon={
                    <IconLock
                      size={20}
                      color={"#20986e"}
                      className={classes.lesIcones}
                    />
                  }
                  required
                  placeholder="Your password"
                  variant={"filled"}
                  value={pwd.valeur}
                  onChange={(event) =>
                    setPwd({ valeur: event.currentTarget.value, erreur: false })
                  }
                  error={pwd.erreur && <>{pwd.erreur}</>}
                />

                {type === "register" && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <Checkbox
                      checked={condition.valeur}
                      size={15}
                      className={"lesCheckbox"}
                      onChange={(event) =>
                        setcondition({
                          valeur: event.currentTarget.checked,
                          erreur: false,
                        })
                      }
                      error={condition.erreur && <>{condition.erreur}</>}
                    />
                    <Text size={10}>
                      J'accepte les{" "}
                      <Link
                        to={"#"}
                        style={{ textDecoration: "none", color: "red" }}
                      >
                        conditions d'utilisation
                      </Link>{" "}
                      et{" "}
                      <Link
                        to={"#"}
                        style={{ textDecoration: "none", color: "red" }}
                      >
                        politique de confidentialité
                      </Link>
                    </Text>
                  </div>
                )}
              </Stack>

              <Group position="apart" mt="md">
                <Anchor
                  component="button"
                  type="button"
                  color="dimmed"
                  onClick={() => toggle()}
                  size="xs"
                >
                  <Link to={"/register"} style={{ color: "#20986e" }}>
                    Mot de passe oublier
                  </Link>
                </Anchor>
              </Group>
              <Button
                size="xs"
                fw={"xs"}
                // type="submit"
                radius={"lg"}
                className={classes.loginButton}
                onClick={handleSubmit}
              >
                {upperFirst("Se connecter")}
              </Button>
            </form>

            <Divider
              label="Or continue with email"
              labelPosition="center"
              my="lg"
            />
            <Group position="center" mt="xl">
              {/* Connexion via google */}
              <span className={"spanButton"} onClick={loginGoogle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
              </span>

              {/* Connexion via facebook */}
              <LoginSocialFacebook
                appId={717531253056662}
                onResolve={(response) => {
                  console.log(response);
                }}
                onReject={(error) => {
                  console.log(error);
                }}
              >
                {/* <FacebookLoginButton /> */}

                <span className={"spanButton"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                  >
                    <linearGradient
                      id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                      x1="9.993"
                      x2="40.615"
                      y1="9.993"
                      y2="40.615"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stop-color="#2aa4f4"></stop>
                      <stop offset="1" stop-color="#007ad9"></stop>
                    </linearGradient>
                    <path
                      fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                      d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                    ></path>
                  </svg>
                </span>
              </LoginSocialFacebook>
            </Group>
            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                style={{
                  color: "black",
                  justifyContent: "space-around",
                  textAlign: "center",
                  alignContent: "center",
                }}
                size="xs"
              >
                <Text ta={"center"} display={"inline-block"}>
                  Vous avez un compte?
                  <Link to={"/login"}>
                    <span style={{ color: "#20986e" }}>Se connecter</span>
                  </Link>
                </Text>
              </Anchor>
            </Group>
          </Box>
        </Grid.Col>

        {/* Partie second */}
        <Grid.Col md={6} order={1} orderMd={2} className={classes.partieNeutre}>
          <Box style={{ width: "58%" }}>
            {" "}
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Image
                src={authLogo}
                alt="auth logo"
                width={"100%"}
                marginX={"auto"}
              />
            </Box>
            <Box
              style={{
                marginInline: "auto",
                width: "80%",
                textAlign: "center",
                justifyContent: "center",
                alignContent: "center",
                display: "flex",
              }}
            >
              <Text
                size={10}
                ta="center"
                style={{ color: "whitesmoke", marginTop: "30px" }}
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
                sed blanditiis sint. Odio, magni vero minus blanditiis
                cupiditate nisi
              </Text>
            </Box>
          </Box>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default RegisterPage;
