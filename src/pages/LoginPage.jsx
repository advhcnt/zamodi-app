import { useToggle, upperFirst } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Grid,
  Box,
  createStyles,
  Image,
  Card,
} from "@mantine/core";
import ZamodiLogo2 from "./../assets/Zamodi-Logo2.png";
import ZamodiLogo3 from "./../assets/Zamodi-Logo3.png";
import { Link, useNavigate } from "react-router-dom";
import { IconLock, IconMail } from "@tabler/icons";
import authLogo from "./../assets/Auth.svg";
import { useEffect, useState, useRef } from "react";
import authService from "../services/authService";
import authHeader from "../services/auth-header";
import Chargement from "../component/Chargement";

import { LoginSocialGoogle } from "reactjs-social-login";
import PasswordForgotComponent from "../component/PasswordForgotComponent";
import EnterCodeComponent from "../component/EnterCodeComponent";
import NewPasswordComponent from "../component/NewPasswordComponent";

import { verifyEmail } from "../utils/fonctions";
import { GoogleLoginButton } from "react-social-login-buttons";
import { showError } from "../utils/NotificationPopUp";

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
    paddingTop:70
   
  },
  partieNeutre: {
    backgroundColor: "#20986e",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: " 110px 0px 0px 0px ",
    border: "1px solid white",
    height: "100vh",
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

function Login2Page(props) {
  const errRef = useRef();
  const [user, setUser] = useState({ valeur: "", erreur: false });
  const [pwd, setPwd] = useState({ valeur: "", erreur: false });
  const [errMsg, setErrMsg] = useState(false);
  const [pageKing, setpageKing] = useState("login");
  const [visible, setvisible] = useState(false);
  const [client, setclient] = useState(false);
  const [Code, SetCode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const { classes } = useStyles();
  const [type, toggle] = useToggle(["login", "register"]);

  const handleSubmit = async (e) => {
    setvisible(true);
    e.preventDefault();
    // setvisible(true);
    if (user.valeur && verifyEmail(user.valeur)) {
      if (pwd.valeur && pwd.valeur.length >= 8) {
        authService.login(user.valeur, pwd.valeur).then(
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
              showError("Connexion", data.message);
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
            showError("Connexion", resMessage);
          }
        );
      } else {
        setPwd({ ...pwd, erreur: "Veuillez entrer un mot de passe valide" });
      }
    } else {
      setUser({ ...user, erreur: "Veuillez entrer un nom d'utilisateur" });
    }
  };

  const googleAuth = (data, provider) => {
    authService.authWithGoogle(data, provider).then(
      (data) => {
        setvisible(true);
        if (data.status === 200 || data.state === "success") {
          authHeader(data.accessToken);
          if (data.isAdmin) {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        } else {
          setvisible(false);
          showError("Connexion", data.message);
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
        showError("Connexion", resMessage);
      }
    );
  };

  return (
    <>
      <Chargement visible={visible} />
      <Box>
        <Box style={{ maxWidth: "100vw", position: "relative" }}>
          <Grid style={{margin:0}}>
            {/* Première partie */}
            <Grid.Col md={6} order={2} orderMd={1} className={``} style={{padding:0}}>
              <Box
                className={`${classes.hiddenMobile}  ${classes.partieChamp} secondplaceLogin `}

              >
                {pageKing === "login" && (
                  <Box className={classes.boxStyle}>
                    <Group>
                      <Image
                        src={ZamodiLogo3}
                        width={"70%"}
                        mb={"4%"}
                        mt={"10%"}
                        className={classes.hiddenMobile}
                      />
                    </Group>

                    <Image src={ZamodiLogo3} className={classes.logo} />

                    <Text size={30} weight={900}>
                      Connexion
                    </Text>
                    <Text
                      size={"xl"}
                      mb={"8%"}
                      mt={"5%"}

                      className={classes.hiddenMobile}
                    >
                      Nous sommes heureux de vous revoir !
                      Connectez-vous sur Zamodi.
                    </Text>
                    <Text
                      size={"xs"}
                      mb={"8%"}
                      mt={"5%"}
                      className={classes.hiddenDesktop}
                    >
                      Content de vous revoir !
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
                    <form onSubmit={handleSubmit}>
                      <Stack>
                        <TextInput
                        mb={"5%"}
                        mt={"2%"}
                          radius={12}
                          icon={
                            <IconMail
                              size={30}
                              color={"#20986e"}

                              className={classes.lesIcones}
                            />
                          }
                          size={"lg"}

                          placeholder="Adresse Email"
                          variant={"filled"}
                          value={user.valeur}
                          onChange={(event) =>
                            setUser({
                              valeur: event.target.value,
                              erreur: false,
                            })
                          }
                          error={user.erreur && <>{user.erreur}</>}
                        />

                        <PasswordInput
                         mb={"5%"}
                        mt={"2%"}
                          radius={12}
                          size={"lg"}
                          icon={
                            <IconLock
                              size={30}
                              color={"#20986e"}
                              className={classes.lesIcones}
                            />
                          }
                          placeholder="Mot de passe"
                          variant={"filled"}
                          value={pwd.valeur}
                          onChange={(event) =>
                            setPwd({
                              valeur: event.target.value,
                              erreur: false,
                            })
                          }
                          error={pwd.erreur && <>{pwd.erreur}</>}
                        />
                      </Stack>

                      <Group position="apart" mt="xl">
                        <Anchor
                          component="button"
                          type="button"
                          color="dimmed"
                          onClick={() => toggle()}
                         size={"lg"}
                        >
                          <span
                            style={{ color: "#20986e" }}
                            onClick={() => setpageKing("forgotpassword")}
                          >
                            Mot de passe oublié ?
                          </span>
                        </Anchor>
                      </Group>
                      <Button
                       size={"md"}
                       mb={"5%"}
                        mt={"2%"}
                        fw={"xs"}
                        type="submit"
                        radius={12}
                        className={classes.loginButton}
                        // onClick={() =>navigation('/dashboard')}
                        // type={"submit"}
                      >
                        {upperFirst("Se connecter")}
                      </Button>
                    </form>

                    <Divider
                      label="Ou continuez avec "
                      labelPosition="center"
                      my="sm"
                    />
                  </Box>
                )}

                {pageKing === "forgotpassword" && (
                  <PasswordForgotComponent
                    setpageKing={setpageKing}
                    setclient={setclient}
                  />
                )}

                {pageKing === "EnterCode" && (
                  <EnterCodeComponent
                    email={client}
                    setpageKing={setpageKing}
                    SetCode={SetCode}
                  />
                )}

                {pageKing === "NewPassword" && (
                  <NewPasswordComponent
                    email={client}
                    setpageKing={setpageKing}
                    code={Code}
                  />
                )}
              </Box>

              <Box className={classes.hiddenDesktop}>
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
                  {pageKing === "login" && (
                    <Box pt={10}>
                      <Text size={20} weight={700} ta={"center"} mt={0}>
                        Connexion
                      </Text>
                      <Text size={"xs"} ta={"center"} c={"dimmed"} mt={15}>
                        Content de vous revoir !
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

                      <form
                        onSubmit={handleSubmit}
                        style={{ paddingInline: 10, marginTop: 20 }}
                      >
                        <Stack>
                          <TextInput
                            radius="12px"
                            icon={
                              <IconMail
                                size={20}
                                color={"#20986e"}
                                className={classes.lesIcones}
                              />
                            }
                            size={"md"}
                            placeholder="votre email"
                            variant={"filled"}
                            value={user.valeur}
                            onChange={(event) =>
                              setUser({
                                valeur: event.target.value,
                                erreur: false,
                              })
                            }
                            error={user.erreur && <>{user.erreur}</>}
                          />

                          <PasswordInput
                            radius="12px"
                            size={"md"}
                            icon={
                              <IconLock
                                size={20}
                                color={"#20986e"}
                                className={classes.lesIcones}
                              />
                            }
                            placeholder=" Votre mot de passe"
                            variant={"filled"}
                            value={pwd.valeur}
                            onChange={(event) =>
                              setPwd({
                                valeur: event.target.value,
                                erreur: false,
                              })
                            }
                            error={pwd.erreur && <>{pwd.erreur}</>}
                          />
                        </Stack>

                        <Group position="right" mt="xs">
                          <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => toggle()}
                           size={"md"}
                          >
                            <span
                              style={{ color: "#20986e" }}
                              onClick={() => setpageKing("forgotpassword")}
                            >
                              Mot de passe oublié ?
                            </span>
                          </Anchor>
                        </Group>
                        <Button
                          my={20}
                         size={"md"}
                          fw={"xs"}
                          type="submit"
                          radius={12}
                          className={classes.loginButton}
                          // onClick={() =>navigation('/dashboard')}
                          // type={"submit"}
                        >
                          {upperFirst("Se connecter")}
                        </Button>
                      </form>
                    </Box>
                  )}

                  {pageKing === "forgotpassword" && (
                    <PasswordForgotComponent
                      setpageKing={setpageKing}
                      setclient={setclient}
                    />
                  )}

                  {pageKing === "EnterCode" && (
                    <EnterCodeComponent
                      email={client}
                      setpageKing={setpageKing}
                      SetCode={SetCode}
                    />
                  )}

                  {pageKing === "NewPassword" && (
                    <NewPasswordComponent
                      email={client}
                      setpageKing={setpageKing}
                      code={Code}
                    />
                  )}
                </Card>
               
              </Box>

              {pageKing === "login" && (
                <Box>
                   <Divider
                  label="Ou continuez avec "
                  labelPosition="center"
                  my="sm"
                  mx={"lg"}
                  className={classes.hiddenDesktop}
                 
                />
                  <Group position="center" pw={0} my={"sm"}>
                    <LoginSocialGoogle
                      client_id={
                        "164454011985-g4tmud0sacpen1sogb30rn6tfs569c2s.apps.googleusercontent.com"
                      }
                      // onLoginStart={onLoginStart}
                      redirect_uri={"https://app.zamodi.com"}
                      scope="openid profile email"
                      discoveryDocs="claims_supported"
                      access_type="offline"
                      onResolve={({ provider, data }) => {
                        // setProvider(provider);
                        // setProfile(data);
                        googleAuth(data, provider);
                      }}
                      onReject={(err) => {
                        console.log(err);
                      }}
                    >
                      <GoogleLoginButton text={"Connexion avec Google"} style={{borderRadius:32,fontSize:15,fontWeight:500}} />
                    </LoginSocialGoogle>
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
                     size={"md"}
                    >
                      <Text ta={"center"}>
                        Nouveau sur Zamodi ?
                        <Link to={"/register"}>
                          <span style={{ color: "#20986e", marginLeft: 5 }}>
                            S'inscrire
                          </span>
                        </Link>
                      </Text>
                    </Anchor>
                  </Group>
                </Box>
              )}
            </Grid.Col>

            {/* Second partie */}
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
                    marginTop: "30px",
                  }}
                >
                  <Text size={10} ta="center" style={{ color: "whitesmoke" }}>
                    Avec ZAMODI, vous pouvez transférer facilement et rapidement
                    des soldes entre MTN Money, Moov Money et Celtiis Cash ou
                    acheter facilement du crédit d'appel ou des données
                    internet. <br />
                    Connectez-vous !
                  </Text>
                </Box>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Login2Page;
