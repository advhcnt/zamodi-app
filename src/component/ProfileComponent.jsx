import {
  Avatar,
  Box,
  Button,
  Container,
  createStyles,
  Divider,
  Grid,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import authHeader from "../services/auth-header";
import authService from "../services/authService";
import userService from "../services/user.service";

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
  const [password, setpassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = () => {
    if ((username && email) || (password && username && email)) {
      if (
        (username !== "" && email !== "" && username.length >= 4) ||
        (password.length >= 8 &&
          username !== "" &&
          email !== "" &&
          username.length > 5)
      ) {
        let data =
          password.length >= 8
            ? { username: username, email: email, password: password }
            : { username: username, email: email };
        userService.updateUser(currentUser._id, data).then(
          (data) => {
            if (data.status === 200 || data.state === "success") {
              console.log(data);
              authHeader(data.accessToken);
            } else {
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

            setErrMsg(resMessage);
          }
        );
      } else {
        alert("rien");
      }
    } else {
      alert("rien 2");
    }
  };

  const [file, setFile] = useState(null);

  const handleImageSubmit = () => {
    const formData = new FormData();
    formData.append("zamodi", file);

    console.log(file);

    userService.changeImage(formData).then(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const [ImageLink, setImageLink] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setImageLink(URL.createObjectURL(event.target.files[0]));

    handleImageSubmit();
  };

  const UploadChange = () => {
    document.getElementById("champUpload").click();
  };

  const { classes, cx } = useStyles();
  return (
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
                  src={ImageLink}
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
                  onChange={handleFileChange}
                  hidden
                  id="champUpload"
                />

                <Button
                 
                  c={"white"}
                  shadow={"xl"}
                  onClick={UploadChange}
                  className={"BgYellow "+classes.centrer}
                >
                  Ajouter une photo
                </Button>
              </Box>

              <Box my={30}>
                <Text ml={20} c={"white"} fw={"bold"}>
                  Mon Compte
                </Text>
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
                <Text ml={20} c={"white"}>
                  Notification{" "}
                </Text>
              </Box>
              <Box
                my={10}
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Button className="BgYellow" c={"white"} shadow={"xl"}>
                  Supprimer le compte
                </Button>
              </Box>
            </Grid.Col>
            <Grid.Col sm={9}>
              <Text fw={900}>Mon compte</Text>
              <Box my={15}>
                <Text>Nom d'utilisateur</Text>
                <TextInput
                  value={username}
                  onChange={(event) => setusername(event.target.value)}
                />
              </Box>

              <Box my={15}>
                <Text>Email</Text>
                <TextInput
                  value={email}
                  type={"email"}
                  onChange={(event) => setemail(event.target.value)}
                />
              </Box>

              <Box my={15}>
                <Text>Mot de passe</Text>
                <TextInput
                  type={"password"}
                  value={password}
                  onChange={(event) => setpassword(event.target.value)}
                />
              </Box>
              <Button
                c={"white"}
                className={"ArrierePlan"}
                onClick={handleSubmit}
              >
                Modifiers
              </Button>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default ProfileComponent;
