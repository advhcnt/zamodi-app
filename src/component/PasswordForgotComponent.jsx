import {
  Image,
  Stack,
  Text,
  TextInput,
  Button,
  Group,
  Anchor,
  Box,
  createStyles,
} from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { IconMail } from "@tabler/icons";
import React from "react";
import { useState } from "react";
import authService from "../services/authService";
import { verifyEmail } from "../utils/fonctions";
import ZamodiLogo from "./../assets/Zamodi-Logo.png";
import Chargement from "./Chargement";
import ZamodiLogo2 from "./../assets/Zamodi-Logo2.png";
import ZamodiLogo3 from "./../assets/Zamodi-Logo3.png";

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
    '&:hover':{
      backgroundColor: "#20986e",
    }
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
function PasswordForgotComponent({ setpageKing, setclient }) {
  const [visible, setvisible] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [user, setUser] = useState({ valeur: "", erreur: false });
  const { classes } = useStyles();

  // Fonction pour demander le code de restauration
  const handlePassword = () => {
    if (user.valeur && verifyEmail(user.valeur)) {
      setvisible(true);
      try {
        authService.forgetPassword(user.valeur).then(
          (data) => {
            setclient(user.valeur);
            setvisible(false);
            let response = data.data;
            if (response.state === "success") {
              setpageKing("EnterCode");
            }
          },
          (error) => {
            setvisible(false);
            console.log(error);
          }
        );
      } catch (error) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setvisible(false);
        setErrMsg(resMessage);
      }
    } else {
      setUser({ ...user, erreur: "Veuillez entrer un mail valide" });
    }
  };

  return (
    <>
      {/* LAZY LOAD */}
      <Chargement visible={visible} />

      <Box className={classes.boxStyle} mx={"auto"} pt={10}>
        <Group position={"center"}>
          <Image
            src={ZamodiLogo3}
            width={200}
            mb={"8%"}
            className={classes.hiddenMobile}
          />
        </Group>

        <Text size={20} weight={700} ta={"center"}>
          Mot depasse oublié
        </Text>
        <Text size={"xs"} mb={"8%"} ta={"center"} c={"dimmed"} mt={30}>
          Insérez votre mail pour recevoir le code de confirmation !
        </Text>
        <Text
          ta={"center"}
          c={"red"}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </Text>
        <form>
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
              placeholder="Votre mail"
              variant={"filled"}
              value={user.valeur}
              onChange={(event) =>
                setUser({ valeur: event.target.value, erreur: false })
              }
              error={user.erreur && <>{user.erreur}</>}
            />
          </Stack>
          <Button
            size="xs"
            fw={"xs"}
            radius={12}
            className={classes.loginButton}
            onClick={handlePassword}
          >
            {upperFirst("Recevoir le code")}
          </Button>
        </form>
        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            style={{ color: "black" }}
            size="xs"
          >
            <span
              className="pointer"
              style={{ color: "#20986e", marginInline: 10 }}
              onClick={() => setpageKing("login")}
            >
              Me connecter avec mot de passe
            </span>
          </Anchor>
        </Group>
      </Box>
    </>
  );
}

export default PasswordForgotComponent;
