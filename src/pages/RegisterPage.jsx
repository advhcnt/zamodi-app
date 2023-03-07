import { useToggle, upperFirst } from "@mantine/hooks";
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
  Card,
} from "@mantine/core";
import ZamodiLogo from "./../assets/Zamodi-Logo.png";
import ZamodiLogo2 from "./../assets/Zamodi-Logo2.png";
import ZamodiLogo3 from "./../assets/Zamodi-Logo3.png";
import { Link, useNavigate } from "react-router-dom";
import { IconLock, IconMail, IconUser } from "@tabler/icons";
import authLogo from "./../assets/Auth.svg";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../services/authService";
import Chargement from "../component/Chargement";
import { verifyEmail } from "../utils/fonctions";
import authHeader from "./../services/auth-header";
import { LoginSocialFacebook } from "reactjs-social-login";
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import facebook from "./../assets/export22/Facebook.svg";
import google from "./../assets/export22/google.svg";
import { API_URL } from "../services/http-common";

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
    "&:hover": {
      backgroundColor: "#20986e",
    },
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
  const [visible, setvisible] = useState(false);
  const [condition, setcondition] = useState({ valeur: false, erreur: false });

  const { classes, cx } = useStyles();
  const [type, toggle] = useToggle(["register", "login"]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  // Fonction pour l'inscription
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
                  // setvisible(false);
                  // console.log(data);
                  //  Login

                  authService.login(mail.valeur, pwd.valeur).then(
                    (data) => {
                      if (data.status === 200 || data.state === "success") {
                        authHeader(data.accessToken);
                        if (data.isAdmin) {
                          navigate("/admin");
                        } else {
                          navigate("/dashboard");
                        }
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
                  // login
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




  const googleAuth = () => {
    window.open(
      `${API_URL}/auth/google/auth/google`,
      "_self"
    );
  };

  return (
    <>
      <Box
        className={classes.hiddenMobile}
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
              <Group>
                <Image
                  src={ZamodiLogo3}
                  width={"70%"}
                  mb={"4%"}
                  className={classes.hiddenMobile}
                />
              </Group>

              <Text size={28} weight={900}>
                Créer un compte
              </Text>
              <Text size={"xs"} mb={"8%"}>
                Inscrivez-vous gratuitement !{" "}
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
                    radius={12}
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
                    radius={12}
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
                    radius={12}
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
                      setPwd({
                        valeur: event.currentTarget.value,
                        erreur: false,
                      })
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
                          les politiques de confidentialité
                        </Link>
                      </Text>
                    </div>
                  )}
                </Stack>

                <Button
                  size="xs"
                  fw={"xs"}
                  // type="submit"
                  radius={12}
                  className={classes.loginButton}
                  onClick={handleSubmit}
                >
                  {upperFirst("Se connecter")}
                </Button>
              </form>

              <Divider
                label="Ou continuez avec"
                labelPosition="center"
                my="lg"
              />
              <Group position="center">
                <Image src={facebook} width={60} />
                <Image src={google} width={60} onClick={googleAuth} className="spanButton" />
              </Group>
              <Group position="center" mt="xl">
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
                      <span style={{ color: "#20986e" }}> Se connecter</span>
                    </Link>
                  </Text>
                </Anchor>
              </Group>
            </Box>
          </Grid.Col>

          {/* Partie second */}
          <Grid.Col
            md={6}
            order={1}
            orderMd={2}
            className={classes.partieNeutre}
          >
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
                  Avec ZAMODI, vous pouvez transférer facilement et rapidement
                  des soldes entre MTN Money, Moov Money et Celtiis Cash ou
                  acheter facilement du crédit d'appel ou des données internet.<br />
                  Inscrivez-vous gratuitement !{" "}
                </Text>
              </Box>
            </Box>
          </Grid.Col>
        </Grid>
      </Box>

      <Box className={`${classes.hiddenDesktop} `}>
        <Box
          sx={{
            height: "30vh",
            paddingTop: 40,
            paddingBottom: 20,
            background: "#20986E",
            borderRadius: "0 0 0 32px",
          }}
        >
          <Group position={"center"}>
            <Image src={ZamodiLogo2} width={200} />
          </Group>
        </Box>

        <Card
          shadow={"xs"}
          sx={{
            width: "90vw",
            marginInline: "5vw",
            marginTop: "-12vh",
            borderRadius: 22,
          }}
        >
          <Text size={20} weight={700} ta={"center"} mt={0}>
            Créer un compte
          </Text>
          <Text size={"xs"} ta={"center"} c={"dimmed"} my={15}>
            Inscrivez-vous gratuitement !{" "}
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
                radius={12}
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

              <PasswordInput
                radius={12}
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
                radius={12}
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
                  setPwd({
                    valeur: event.currentTarget.value,
                    erreur: false,
                  })
                }
                error={pwd.erreur && <>{pwd.erreur}</>}
              />

              {type === "register" && (
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
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
                      les politiques de confidentialité
                    </Link>
                  </Text>
                </div>
              )}
            </Stack>

            <Button
              size="xs"
              fw={"xs"}
              // type="submit"
              radius={12}
              className={classes.loginButton}
              onClick={handleSubmit}
            >
              {upperFirst("S'inscrire")}
            </Button>
          </form>
        </Card>
        <Box
          sx={{
            width: "90vw",
            marginInline: "5vw",
            paddingInline: 30,
          }}
        >
          <Divider label="Ou continuez avec" labelPosition="center" my="xs" />
          <Group position="center">
            <Image src={facebook} width={60} />
            <Image src={google} width={60} onClick={googleAuth} className="spanButton"/>
          </Group>
          <Group position="center">
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
                Vous avez déjà un compte ?{" "}
                <Link to={"/login"}>
                  <span style={{ color: "#20986e" }}>Se connecter</span>
                </Link>
              </Text>
            </Anchor>
          </Group>
        </Box>
      </Box>
    </>
  );
}

export default RegisterPage;
