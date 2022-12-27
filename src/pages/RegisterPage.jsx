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
import facebook from "./../assets/facebook.png";
import authLogo from "./../assets/Auth.svg";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../services/authService";


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


function RegisterPage(props) {
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [mail, setMail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

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
    setloading(true);
    if (user && pwd && pwd.length >= 8) {
      authService.register(user, mail, pwd).then(
        (data) => {
          if (data.status === 200 || data.state === "success") {
            navigate("/login");
            // window.location.reload();
          } else {
            setloading(false);
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

          setloading(false);
          setErrMsg(resMessage);
        }
      );
    }
  };

  return (
    <div style={{ maxWidth: "100vw", overflow: "hidden", maxHeight: "100vh" }}>
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
                  value={user}
                  onChange={(event) => setUser(event.currentTarget.value)}
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
                  placeholder="hello@mantine.dev"
                  variant={"filled"}
                  value={mail}
                  onChange={(event) => setMail(event.currentTarget.value)}
                  // error={form.errors.email && "Invalid email"}
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
                  onChange={(event) => setPwd(event.currentTarget.value)}
                  // error={
                  //   form.errors.password &&
                  //   "Password should include at least 6 characters"
                  // }
                />

                {type === "register" && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <Checkbox
                      checked={form.values.terms}
                      size={15}
                      className={"lesCheckbox"}
                      onChange={(event) =>
                        form.setFieldValue("terms", event.currentTarget.checked)
                      }
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
            <Group position="apart" mt="xl">
              <Image src={facebook} alt="facebook" width={25} />
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
