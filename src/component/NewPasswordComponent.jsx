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
  function NewPasswordComponent({ setpageKing, email,code }) {
    const [visible, setvisible] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [pwd, setPwd] = useState({ valeur: "", erreur: false });
    const [pwdConfirm, setpwdConfirm] = useState({ valeur: "", erreur: false });
    const { classes } = useStyles();
  
    // Fonction pour demander le code de restauration
    const handlePassword = () => {
      if (pwd.valeur && verifyEmail(pwd.valeur)) {
        setvisible(true);
        try {
          authService.NewPassword(pwd.valeur).then(
            (data) => {
              setvisible(false);
              let response = data.data;
              console.log(response);
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
        setPwd({ ...pwd, erreur: "Veillez entrer un mail valide" });
      }
    };
  
    return (
      <>
        {/* LAZY LOAD */}
        <Chargement visible={visible} />
  
        <Box className={classes.boxStyle}>
          <Image
            src={ZamodiLogo}
            width={"70%"}
            mb={"8%"}
            className={classes.hiddenMobile}
          />
          <Image src={ZamodiLogo} className={classes.logo} />
  
          <Text size={25} weight={900}>
            Mot depasse oublié
          </Text>
          <Text size={"xs"} mb={"8%"}>
            Inséré votre mail pour recevoir le code de confirmation
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
                radius="32px"
                icon={
                  <IconLock
                    size={20}
                    color={"#20986e"}
                    className={classes.lesIcones}
                  />
                }
                size={"sm"}
                type={'password'}
                placeholder="Votre mail"
                variant={"filled"}
                value={pwd.valeur}
                onChange={(event) =>
                    setPwd({ valeur: event.target.value, erreur: false })
                }
                error={pwd.erreur && <>{pwd.erreur}</>}
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
                    placeholder="Your password"
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
              radius={"lg"}
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
  
  export default NewPasswordComponent;
  