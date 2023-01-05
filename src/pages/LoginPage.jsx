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
import { IconLock, IconMail } from "@tabler/icons";
import facebook from "./../assets/facebook.png";
import authLogo from "./../assets/Auth.svg";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import authService from "../services/authService";
import authHeader from './../services/auth-header'
import Chargement from "../component/Chargement";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from 'jwt-decode'
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

function LoginPage(props) {
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const navigation = useNavigate();

  const { classes } = useStyles();
  const [type, toggle] = useToggle(["login", "register"]);
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
    setvisible(true);
    e.preventDefault();
    // setvisible(true);
    if (user && pwd && pwd.length >= 8) {
      authService.login(user, pwd).then(
        (data) => {
          if (data.status === 200 || data.state === 'success') {

            authHeader(data.accessToken)

            navigate("/dashboard");
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
    }
  };

  const [visible, setvisible] = useState(false)


  const loginGoogle = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            "Authorization": `Bearer ${tokenResponse.access_token}`
          }
        })

        console.log('info user ', res.data)
      } catch (error) {
        console.log(error)
      }




      var decoded = jwt_decode(tokenResponse.credential)
      console.log('decodage du token', decoded)
      // email = decoded.email
      // email verify = decoded.verify_email
      // familiname = decoded.family_name
      // given_name = decoded.given_name
      // piture = decoded.picture
    },
    onError: (error) => {
      console.log('Login Failed');
    }


  });
  return (
    <Box style={{ maxWidth: "100vw", position: 'relative' }}>

      {/* LAZY LOAD */}
      <Chargement visible={visible} />

      <Grid className={"secondplaceLogin"}>
        {/* Première partie */}
        <Grid.Col
          md={6}
          order={2}
          orderMd={1}
          className={` ${classes.partieChamp}`}
        >
          <Box className={classes.boxStyle}>
            <Image
              src={ZamodiLogo}
              width={"70%"}
              mb={"8%"}
              className={classes.hiddenMobile}
            />
            <Image src={ZamodiLogo} className={classes.logo} />

            <Text size={25} weight={900}>
              Connexion
            </Text>
            <Text size={"xs"} mb={"8%"}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi,
              porro. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Modi, porro.
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
                  placeholder="username"
                  variant={"filled"}
                  value={user}
                  onChange={(event) => setUser(event.target.value)}
                  error={form.errors.email && "Invalid email"}
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
                  value={pwd}
                  onChange={(event) => setPwd(event.target.value)}
                  error={
                    form.errors.password &&
                    "Password should include at least 6 characters"
                  }
                />

                {type === "register" && (
                  <Checkbox
                    label="I accept terms and conditions"
                    checked={form.values.terms}
                    onChange={(event) =>
                      form.setFieldValue("terms", event.currentTarget.checked)
                    }
                  />
                )}
              </Stack>

              <Group position="apart" mt="xl">
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
                type="submit"
                radius={"lg"}
                className={classes.loginButton}
              // onClick={() =>navigation('/dashboard')}
              // type={"submit"}
              >
                {upperFirst("Se connecter")}
              </Button>
            </form>

            <Divider
              label="Or continue with email"
              labelPosition="center"
              my="lg"
            />
            <Group position="apart" mt="xl">
              <Button onClick={loginGoogle}>
                <Image src={facebook} alt="facebook" width={25} />
              </Button>


              {/* <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  var decoded = jwt_decode(credentialResponse.credential)
                  console.log('decodage du token',decoded)
                  // email = decoded.email
                  // email verify = decoded.verify_email
                  // familiname = decoded.family_name
                  // given_name = decoded.given_name
                  // piture = decoded.picture
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />; */}
            </Group>
            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                style={{ color: "black" }}
                size="xs"
              >
                Je n'ai pas encore de compte?
                <Link to={"/register"}>
                  <span style={{ color: "#20986e" }}>Créer un compte</span>
                </Link>
              </Anchor>
            </Group>
          </Box>
        </Grid.Col>

        {/* Second partie */}
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
                marginTop: "30px",
              }}
            >
              <Text size={10} ta="center" style={{ color: "whitesmoke" }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
                sed blanditiis sint. Odio, magni vero minus blanditiis
                cupiditate nisi
              </Text>
            </Box>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default LoginPage;
