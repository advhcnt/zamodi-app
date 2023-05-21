import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Container,
  createStyles,
  Divider,
  Grid,
  Group,
  Modal,
  Notification,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCheck, IconEdit, IconX } from "@tabler/icons";
import React, { useState } from "react";
import authService from "../services/authService";
import userService from "../services/user.service";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { modalMessage, verifyEmail } from "../utils/fonctions";

const useStyles = createStyles((theme) => ({
  ProfileLogo: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  centrer: {
    justifySelf: "center",
    alignSelf: "center",
    textAlign: "center",
  },
}));

function ProfileComponent(props) {
  const currentUser = authService.getCurrentUser().message;
  const [username, setusername] = useState(currentUser.username);
  const [email, setemail] = useState(currentUser.email);
  const [avatar, setavatar] = useState(currentUser.photo);
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [erreur, seterreur] = useState({ state: false, message: "" });
  const [succes, setsucces] = useState({ state: false, message: "" });
  const [opened, { open, close }] = useDisclosure(false);
  const [updatedData, setupdatedData] = useState("");

  const changeUpdatedData = (data) => {
    setupdatedData(data);
    open();
  };

  const updateUsername = () => {
    if (username && username.length >= 4) {
      if (oldPassword && oldPassword.length >= 8) {
        let data = { username: username, oldPassword: oldPassword };
        close();
        TraitementNotification(false, false, false);
        userService.updateUser(currentUser._id, data).then(
          (data) => {
            if (data.data.status === "success") {
              var item = JSON.parse(localStorage.getItem("user"));
              item.message.username = data.data.message._doc.username;
              localStorage.setItem("user", JSON.stringify(item));
              setsucces({
                state: true,
                message: data.data.message._doc.description,
              });
              TraitementNotification(true, data.data.description, true);
            } else {
              console.log(data.response.response);
              TraitementNotification(
                true,
                "Une erreur est survenue lors du traitement de la requete",
                false
              );
            }
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.description) ||
              error.message ||
              error.toString();

            TraitementNotification(true, resMessage, false);
          }
        );
      } else {
        seterreur({
          state: true,
          message: "Veuillez entrer votre ancien mot de passe",
        });
      }
    } else {
      seterreur({
        state: true,
        message: "Veuillez entrer votre ancien mot de passe",
      });
    }
  };

  const updateEmail = () => {
    if (email && verifyEmail(email)) {
      if (oldPassword && oldPassword.length >= 8) {
        let data = { email: email, oldPassword: oldPassword };
        close();
        TraitementNotification(false, false, false);
        userService.updateUser(currentUser._id, data).then(
          (data) => {
            if (data.data.status === "success") {
              var item = JSON.parse(localStorage.getItem("user"));
              item.message.email = data.data.message._doc.email;
              localStorage.setItem("user", JSON.stringify(item));
              setsucces({
                state: true,
                message: data.data.message._doc.description,
              });
              TraitementNotification(true, data.data.description, true);
            } else {
              TraitementNotification(
                true,
                "Une erreur est survenue lors du traitement de la requete",
                false
              );
            }
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.description) ||
              error.message ||
              error.toString();

            TraitementNotification(true, resMessage, false);
          }
        );
      } else {
        seterreur({
          state: true,
          message: "Veuillez entrer votre ancien mot de passe",
        });
      }
    } else {
      seterreur({
        state: true,
        message: "Veuillez entrer un email valide",
      });
    }
  };

  const updatePassword = () => {
    if (password && password.length >= 8 && confirmPassword === password) {
      if (oldPassword && oldPassword.length >= 8) {
        let data = {
          newPassword: password,
          oldPassword: oldPassword,
          confirmPassword: confirmPassword,
        };

        close();
        TraitementNotification(false, false, false);

        userService.updateUser(currentUser._id, data).then(
          (data) => {
            if (data.data.status === "success") {
              var item = JSON.parse(localStorage.getItem("user"));
              item.message.password = data.data.message._doc.password;
              localStorage.setItem("user", JSON.stringify(item));
              setsucces({
                state: true,
                message: data.data.message._doc.description,
              });
              TraitementNotification(true, data.data.description, true);
            } else {
              TraitementNotification(
                true,
                "Une erreur est survenue lors du traitement de la requete",
                false
              );
            }
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            TraitementNotification(true, resMessage, false);
          }
        );
      } else {
        seterreur({
          state: true,
          message: "Veuillez entrer votre ancien mot de passe",
        });
      }
    } else {
      seterreur({
        state: true,
        message: "Les mots de passe ne correspondent pas",
      });
    }
  };

  const [file, setFile] = useState(null);

  const handleImageSubmit = () => {
    TraitementNotification(false, false, false);
    const formData = new FormData();
    formData.append("zamodi", file);

    userService.changeImage(formData).then(
      (data) => {
        userService.changeImage(formData).then(
          (data) => {
            if (data.data.status === "success") {
              var item = JSON.parse(localStorage.getItem("user"));
              item.message.photo = data.data.message._doc.photo;
              localStorage.setItem("user", JSON.stringify(item));
              setsucces({
                state: true,
                message: data.data.message._doc.description,
              });
              TraitementNotification(true, data.data.description, true);
            } else {
              TraitementNotification(
                true,
                "Une erreur est survenue lors du traitement de la requete",
                false
              );
            }
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            TraitementNotification(true, resMessage, false);
          }
        );
      },
      (error) => {
        userService.changeImage(formData).then(
          (data) => {
            if (data.data.status === "success") {
              var item = JSON.parse(localStorage.getItem("user"));
              item.message.photo = data.data.message._doc.photo;
              localStorage.setItem("user", JSON.stringify(item));
              TraitementNotification(true, data.data.description, true);
            } else {
              TraitementNotification(
                true,
                "Une erreur est survenue lors du traitement de la requete",
                false
              );
            }
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            // setErrMsg(resMessage);
            TraitementNotification(true, resMessage, false);
          }
        );
      }
    );
  };

  const [ImageLink, setImageLink] = useState(false);

  const UploadChange = () => {
    document.getElementById("champUpload").click();
  };

  const { classes, cx } = useStyles();

  const TraitementNotification = (etat, message, success) => {
    if (etat === false && message === false) {
      notifications.show({
        id: "load-data",
        loading: true,
        title: "Traitement en cours",
        message: "Mise à jour de votre photo en cours",
        autoClose: false,
        disallowClose: true,
      });
    }

    if (etat) {
      notifications.update({
        id: "load-data",
        color: success ? "teal" : "red",
        title: "Traitement terminé",
        message: message,
        icon: success ? <IconCheck size={16} /> : <IconX size={16} />,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    if (file) {
      setImageLink(URL.createObjectURL(file));
      setavatar(URL.createObjectURL(file));

      handleImageSubmit();
    }
  }, [file]);

  return (
    <>
      <Box>
        <Box sx={{ height: "100px" }} className={"ArrierePlan"}></Box>
        <Box shadow={"xl"}>
          <Container size={"sm"}>
            <Grid
              bg={"white"}
              sx={{
                marginTop: "-50px",
                border: "1px solid white",
                borderRadius: "10px",
              }}
            >
              <Grid.Col
                sm={3}
                className={"ArrierePlan"}
                sx={{ borderRadius: "10px" }}
              >
                <Box
                  my={10}
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    size={90}
                    sx={{ borderRadius: "360px" }}
                    src={avatar}
                  />
                </Box>
                <Box
                  my={10}
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    hidden
                    id="champUpload"
                  />

                  <Button
                    c={"white"}
                    shadow={"xl"}
                    onClick={UploadChange}
                    className={"ArrierePlan " + classes.centrer}
                    bg={"green"}
                  >
                    Ajouter une photo
                  </Button>
                </Box>

                <Box my={30}>
                  <Box>
                    <Text
                      ta={"center"}
                      c={"red"}
                      className={errMsg ? "errmsg" : "offscreen"}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </Text>
                  </Box>
                  <Divider my={10} />
                </Box>
                <Box
                  my={10}
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                ></Box>
              </Grid.Col>
              <Grid.Col sm={9}>
                <Text fw={900}>Mon compte</Text>
                <Box my={15}>
                  <Box
                    my={5}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text display={"flex"}>Nom d'utilisateur</Text>
                    <Button
                      onClick={() => changeUpdatedData("username")}
                      compact
                      variant="outline"
                      color="green"
                    >
                      <IconEdit size="1rem" />
                      Modifier
                    </Button>
                  </Box>

                  <TextInput value={username} />
                </Box>

                <Box my={15}>
                  <Box
                    my={5}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text display={"flex"}>Email</Text>
                    <Button
                      onClick={() => changeUpdatedData("email")}
                      compact
                      variant="outline"
                      color="green"
                    >
                      <IconEdit size="1rem" />
                      Modifier
                    </Button>
                  </Box>
                  <TextInput value={email} type={"email"} />
                </Box>

                <Box my={15}>
                  <Box
                    my={5}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text display={"flex"}> Votre mot de passe</Text>
                    <Button
                      onClick={() => changeUpdatedData("password")}
                      compact
                      variant="outline"
                      color="green"
                    >
                      <IconEdit size="1rem" />
                      Modifier
                    </Button>
                  </Box>
                  <PasswordInput minLength={8} type={"password"} required />
                </Box>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>
      </Box>

      <Modal opened={opened} onClose={close} title={modalMessage(updatedData)}>
        <>
          {erreur.state && (
            <Notification
              icon={<IconX size={18} />}
              color="red"
              onClose={() => seterreur({ state: false, message: "" })}
            >
              {erreur.message}
            </Notification>
          )}
        </>
        {updatedData === "username" && (
          <>
            <Box my={15}>
              <Text>Nom d'utilisateur</Text>
              <TextInput
                value={username}
                onChange={(event) => setusername(event.target.value)}
              />
            </Box>

            <Box my={15}>
              <Text> Votre mot de passe </Text>
              <PasswordInput
                minLength={8}
                type={"password"}
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
              />
            </Box>
            <Group position="right">
              <Button
                c={"white"}
                className={"ArrierePlan"}
                onClick={updateUsername}
              >
                Modifier
              </Button>
            </Group>
          </>
        )}

        {/* Modification du mail */}
        {updatedData === "email" && (
          <>
            <Box my={15}>
              <Text>Email</Text>
              <TextInput
                value={email}
                type={"email"}
                onChange={(event) => setemail(event.target.value)}
              />
            </Box>

            <Box my={15}>
              <Text> Votre mot de passe </Text>
              <PasswordInput
                minLength={8}
                type={"password"}
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
              />
            </Box>

            <Group position="right">
              <Button
                c={"white"}
                className={"ArrierePlan"}
                onClick={updateEmail}
              >
                Modifier
              </Button>
            </Group>
          </>
        )}

        {/* Modification du mot de passe */}
        {updatedData === "password" && (
          <>
            <Box my={15}>
              <Text> Ancien mot de passe </Text>
              <PasswordInput
                minLength={8}
                type={"password"}
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
              />
            </Box>
            <Box my={15}>
              <Text>Nouveau mot de passe</Text>
              <PasswordInput
                type={"password"}
                value={password}
                onChange={(event) => setpassword(event.target.value)}
                minLength={8}
              />
            </Box>
            <Box my={15}>
              <Text>Confirmer mot de passe</Text>
              <PasswordInput
                type={"password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </Box>
            <Group position="right">
              <Button
                c={"white"}
                className={"ArrierePlan"}
                onClick={updatePassword}
              >
                Modifier
              </Button>
            </Group>
          </>
        )}
      </Modal>
    </>
  );
}

export default ProfileComponent;
