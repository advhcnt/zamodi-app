import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  createStyles,
  Divider,
  Grid,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";
import authService from "../services/authService";

const useStyles = createStyles((theme) => ({
  ProfileLogo: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));

function ProfileComponent(props) {
  const currentUser = authService.getCurrentUser().message;

  const { classes, cx } = useStyles();
  return (
    <Box>
      <Box sx={{height:'100px'}}  className={"ArrierePlan"}></Box>
      <Box shadow={'xl'} >
        <Container size={"sm"}>
          <Grid bg={'white'} sx={{marginTop:'-50px',border:'1px solid white',borderRadius: "10px"}}>
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
                <Avatar size={90} sx={{ borderRadius: "360px" }} />
              </Box>
              <Button bg={"yellow"} c={"white"} shadow={"xl"}>
                Ajouter une photo
              </Button>

              <Box my={30}>
                <Text ml={20} c={"white"} fw={"bold"}>
                  Mon Compte
                </Text>
                <Divider my={10} />
                <Text ml={20} c={"white"}>
                  Notification{" "}
                </Text>
              </Box>
              <Button bg={"yellow"} c={"white"} shadow={"xl"}>
                Supprimer le compte
              </Button>
            </Grid.Col>
            <Grid.Col sm={9}>
              <Text fw={900}>Mon compte</Text>
              <Box my={15}>
                <Text>Nom d'utilisateur</Text>
                <TextInput value={currentUser.username} />
              </Box>

              <Box my={15}>
                <Text>Email</Text>
                <TextInput value={currentUser.email} type={'email'} />
              </Box>

              <Box my={15}>
                <Text>Mot de passe</Text>
                <TextInput type={'password'} />
              </Box>
              <Button c={'white'} className={"ArrierePlan"} >Modifier</Button>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default ProfileComponent;
