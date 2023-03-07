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
import ZamodiLogo from "./../assets/Zamodi-Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IconLock, IconMail, IconUser } from "@tabler/icons";
import authLogo from "./../assets/Auth.svg";
import { useEffect, useState, useRef } from "react";
import authService from "../services/authService";
import authHeader from "./../services/auth-header";
import Chargement from "../component/Chargement";
import authLogoMobile from "./../assets/Auth-Logo.svg";

import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import PasswordForgotComponent from "../component/PasswordForgotComponent";
import EnterCodeComponent from "../component/EnterCodeComponent";
import NewPasswordComponent from "../component/NewPasswordComponent";
import facebook from "./../assets/export22/Facebook.svg";
import google from "./../assets/export22/google.svg";
import { verifyEmail } from "../utils/fonctions";
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

function LoginPage(props) {
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
    if (user.valeur && verifyEmail(user.valeur) ) {
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
        setPwd({ ...pwd, erreur: "Veillez entrer un mot de passe valide" });
      }
    } else {
      setUser({ ...user, erreur: "Veillez entrer un nom d'utilisateur" });
    }
  };

  const googleAuth = () => {
    window.open(
      `${API_URL}/auth/google`,
      "_self"
    );
  };


  return (
    <>
      <Chargement visible={visible} />
      <Box className={classes.hiddenMobile}>
        <Box style={{ maxWidth: "100vw", position: "relative" }}>
          {/* LAZY LOAD */}
          {/* <Chargement visible={visible} /> */}

          <Grid className={"secondplaceLogin"}>
            {/* Première partie */}
            <Grid.Col
              md={6}
              order={2}
              orderMd={1}
              className={` ${classes.partieChamp}`}
            >
              {pageKing === "login" && (
                <Box className={classes.boxStyle}>
                  <Group>
                    <Image
                      src={ZamodiLogo3}
                      width={"70%"}
                      mb={"4%"}
                      className={classes.hiddenMobile}
                    />
                  </Group>

                  <Image src={ZamodiLogo3} className={classes.logo} />

                  <Text size={25} weight={900}>
                    Connexion
                  </Text>
                  <Text size={"xs"} mb={"8%"}>
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
                        radius={12}
                        icon={
                          <IconMail
                            size={20}
                            color={"#20986e"}
                            className={classes.lesIcones}
                          />
                        }
                        size={"sm"}
                        placeholder="votre email"
                        variant={"filled"}
                        value={user.valeur}
                        onChange={(event) =>
                          setUser({ valeur: event.target.value, erreur: false })
                        }
                        error={user.erreur && <>{user.erreur}</>}
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
                        placeholder="Your password"
                        variant={"filled"}
                        value={pwd.valeur}
                        onChange={(event) =>
                          setPwd({ valeur: event.target.value, erreur: false })
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
                        size="xs"
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
                      size="xs"
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
                    my="lg"
                  />
                  <Group position="center">
                    <Image src={facebook} width={60}  />
                    <Image src={google} width={60} onClick={googleAuth} className="spanButton" />
                  </Group>
                  <Group position="apart" mt="xl">
                    <Anchor
                      component="button"
                      type="button"
                      color="dimmed"
                      style={{ color: "black" }}
                      size="xs"
                    >
                      Nouveau sur Zamodi ?
                      <Link to={"/register"}>
                        <span style={{ color: "#20986e", marginInline: 10 }}>
                          S'inscrire
                        </span>
                      </Link>
                    </Anchor>
                  </Group>
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

              {/* {pageKing === "AddNewPass" && (
            <EnterCodeComponent email={client} setpageKing={setpageKing} SetCode={SetCode}/>
          )} */}

              {pageKing === "NewPassword" && (
                <NewPasswordComponent
                  email={client}
                  setpageKing={setpageKing}
                  code={Code}
                />
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
                    internet. <br/>
                    Connectez-vous !
                  </Text>
                </Box>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </Box>

      {/* Afichage version mobile */}

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
          {pageKing === "login" && (
            <Box pt={10}>
              <Text size={20} weight={700} ta={"center"} mt={0}>
                Connexion
              </Text>
              <Text size={"xs"} ta={"center"} c={"dimmed"} mt={30}>
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
                style={{ paddingInline: 20, marginTop: 40 }}
              >
                <Stack>
                  <TextInput
                    radius="12px"
                    icon={
                      <IconUser
                        size={20}
                        color={"#20986e"}
                        className={classes.lesIcones}
                      />
                    }
                    size={"md"}
                    placeholder="username"
                    variant={"filled"}
                    value={user.valeur}
                    onChange={(event) =>
                      setUser({ valeur: event.target.value, erreur: false })
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
                    placeholder="Your password"
                    variant={"filled"}
                    value={pwd.valeur}
                    onChange={(event) =>
                      setPwd({ valeur: event.target.value, erreur: false })
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
                    size="xs"
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
                  size="xs"
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

          {/* {pageKing === "AddNewPass" && (
            <EnterCodeComponent email={client} setpageKing={setpageKing} SetCode={SetCode}/>
          )} */}

          {pageKing === "NewPassword" && (
            <NewPasswordComponent
              email={client}
              setpageKing={setpageKing}
              code={Code}
            />
          )}
        </Card>

        {pageKing === "login" && (
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
              <Image src={google} width={60} onClick={googleAuth} className="spanButton" />
            </Group>
            <Group position="center" mt={5}>
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                style={{ color: "black" }}
                size="xs"
              >
                Nouveau sur Zamodi ?
                <Link to={"/register"}>
                  <span style={{ color: "#20986e", marginLeft: 5 }}>
                    S'inscrire
                  </span>
                </Link>
              </Anchor>
            </Group>
          </Box>
        )}
      </Box>
    </>
  );
}

export default LoginPage;
