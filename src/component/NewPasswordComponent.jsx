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
  PasswordInput,
} from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { IconLock, IconMail } from "@tabler/icons";
import React from "react";
import { useState } from "react";
import authService from "../services/authService";
import { verifyEmail } from "../utils/fonctions";
import ZamodiLogo from "./../assets/Zamodi-Logo.png";
import Chargement from "./Chargement";
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
function NewPasswordComponent({ setpageKing, email, code }) {
  const [visible, setvisible] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [pwd, setPwd] = useState({ valeur: "", erreur: false });
  const [pwdConfirm, setpwdConfirm] = useState({ valeur: "", erreur: false });
  const { classes } = useStyles();

  // Fonction pour demander le code de restauration
  const handlePassword = () => {
    if (
      pwd.valeur &&
      pwdConfirm.valeur &&
      pwdConfirm.valeur === pwd.valeur &&
      pwd.valeur.length >= 8
    ) {
      setvisible(true);
      try {
        authService
          .NewPassword(code, email, pwd.valeur, pwdConfirm.valeur)
          .then(
            (data) => {
              setvisible(false);
              let response = data.data;
              if (response.state === "success") {
                setpageKing("login");
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
      setPwd({ ...pwd, erreur: "Veuillez entrer un mail valide" });
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
        <Text size={20} weight={700} ta={"center"} mt={0} mb={20}>
          Nouveau mot de passe
        </Text>
        <Text size={"xs"} mb={"8%"}>
          Insérez vos nouveaux mots de passe
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
            <PasswordInput
              radius={12}
              icon={
                <IconLock
                  size={20}
                  color={"#20986e"}
                  className={classes.lesIcones}
                />
              }
              size={"sm"}
              placeholder="Entrer votre nouveau mot de passe"
              variant={"filled"}
              value={pwd.valeur}
              onChange={(event) =>
                setPwd({ valeur: event.target.value, erreur: false })
              }
              error={pwd.erreur && <>{pwd.erreur}</>}
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
              placeholder="Confirmer mot de passe"
              variant={"filled"}
              value={pwdConfirm.valeur}
              onChange={(event) =>
                setpwdConfirm({ valeur: event.target.value, erreur: false })
              }
              error={pwdConfirm.erreur && <>{pwdConfirm.erreur}</>}
            />
          </Stack>
          <Button
            size="xs"
            fw={"xs"}
            radius={12}
            className={classes.loginButton}
            onClick={handlePassword}
          >
            {upperFirst("Mettre à jour ")}
          </Button>
        </form>
        <Group position="center" mt="xl">
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

export default NewPasswordComponent;
