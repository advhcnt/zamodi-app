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
  Card,
  Image,
} from "@mantine/core";
import ZamodiLogo from "./../assets/Zamodi-Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IconLock, IconMail, IconUser } from "@tabler/icons";
import facebook from "./../assets/facebook.png";
import authLogo from "./../assets/Auth.svg";
const useStyles = createStyles((theme) => ({
  logo: {
    marginBottom: "12vh",
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
}));

function LoginPage(props) {
  const navigation = useNavigate();
  const { classes, cx } = useStyles();
  const [type, toggle] = useToggle(["register", "login"]);
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
              mb={"4vh"}
              className={classes.hiddenMobile}
            />
            <Image src={ZamodiLogo} className={classes.logo} />

            <Text size={28} weight={900}>
              Créer un compte
            </Text>
            <Text size={"xs"} mb={"4vh"}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi,
              porro. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Modi, porro.
            </Text>

            <form onSubmit={form.onSubmit(() => {})}>
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
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
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
                  size={"md"}
                  placeholder="hello@mantine.dev"
                  variant={"filled"}
                  value={form.values.email}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  error={form.errors.email && "Invalid email"}
                />

                <PasswordInput
                  radius="32px"
                  size={"md"}
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
                  value={form.values.password}
                  onChange={(event) =>
                    form.setFieldValue("password", event.currentTarget.value)
                  }
                  error={
                    form.errors.password &&
                    "Password should include at least 6 characters"
                  }
                />

                {type === "register" && (
                  <div style={{display:'flex',alignItems:'center',gap:5}}>
                    <Checkbox
                      checked={form.values.terms}
                      size={15}
                      className={'lesCheckbox'}
                      onChange={(event) =>
                        form.setFieldValue("terms", event.currentTarget.checked)
                      }
                    />
                    <Text size={10}>
                      J'accepte les <Link to={"#"} style={{textDecoration:'none',color:'red'}}>conditions d'utilisation</Link>  et <Link to={"#"}  style={{textDecoration:'none',color:'red'}}>politique de confidentialité</Link> 
                      
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
                onClick={() =>navigation('/dashboard')}
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
              <Text size={10} ta="center" style={{ color: "whitesmoke",marginTop:'30px'  }}>
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

export default LoginPage;
