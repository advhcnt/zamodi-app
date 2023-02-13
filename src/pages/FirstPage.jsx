import {
  Box,
  Button,
  Container,
  createStyles,
  Grid,
  Group,
  Image,
  Paper,
  Text,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Chargement from "../component/Chargement";
import authLogo from "./../assets/authLogo.svg";
import ZamodiLogo from "./../assets/Zamodi-Logo2.png";
import bgMobile from "./../assets/backround1.png";

const useStyles = createStyles((theme) => ({
  image: {
    width: "70%",
    height: "70%",
  },
  LesButtonsTTONS: {
    marginInline: "20px",

    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
  Mobile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    marginTop: "18vh",
    [theme.fn.smallerThan("md")]: {
      marginTop: "1vh",
    },
  },
  hiddenDesktop: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
  onMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  secondplaceBottom2: {
    height: "30%",
    bottom: 0,
    display: "flex",

    [theme.fn.smallerThan("md")]: {
      marginTop: "4%",
    },

    secondPlacejsx: {
      paddingTop: 70,
      [theme.fn.smallerThan("md")]: {
        paddingTop: 0,
      },
    },
  },
}));

function FirstPage(props) {
  const { classes, cx } = useStyles();
  const navigation = useNavigate();
  const [visible, setvisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setvisible(false);
    }, 1500);
  }, []);

  return (
    <>
      <Chargement visible={visible} />
      <Box className={classes.onMobile}>
        {/* LAZY LOAD */}

        <Grid>
          {/* Première partie */}
          <Grid.Col
            md={6}
            order={2}
            orderMd={1}
            className={`FirstPathAuth ${classes.onMobile} `}
          >
            <div
              className={"FirstPathAuth2"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
                height: "100vh",
                width: "100%",
              }}
            >
              <Box sx={{ width: "80%", bottom: 0, top: "auto" }}>
                <Text fz="60px" ta={"center"} fw={900} c={"white"} mb={30}>
                  WELCOME
                </Text>
                <Text fz={"sm"} mb={100} c={"white"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                  reiciendis eaque maxime quisquam fuga cum corrupti ullam.
                  Maxime, porro veniam? Vel, amet aperiam rerum magni fugit ex
                  at modi dolore.
                </Text>
                <Group grow mb="md" mt="md" position="center">
                  <Button
                    onClick={() => navigation("/login")}
                    size={"lg"}
                    style={{
                      borderRadius: "32px",
                      color: "black",
                      backgroundColor: "white",
                    }}
                  >
                    <IconArrowRight />
                    Connexion
                  </Button>

                  <Button
                    onClick={() => navigation("/register")}
                    size={"lg"}
                    style={{
                      borderRadius: "32px",
                      color: "white",
                      backgroundColor: "#20986e",
                    }}
                  >
                    <IconArrowRight />
                    Inscription
                  </Button>
                </Group>
              </Box>
            </div>
          </Grid.Col>

          {/* Seconde partie */}
          <Grid.Col
            md={6}
            order={1}
            orderMd={2}

            // style={{
            //   border: "1px solid black",
            //   borderRadius: " 115px 0px 0px 0px "
            // }}
          >
            <div
              className={`secondplace ${classes.secondPlacejsx}`}
              style={{ height: "100vh" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  justifyItems: "center",
                  textAlign: "center",
                  // justifyContent: "center",
                  alignContent: "center",
                  width: "100%",
                }}
              >
                <Image
                  radius="md"
                  src={ZamodiLogo}
                  alt="Random unsplash image"
                  height={"100%"}
                  width={"100%"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </div>
              <Box className={classes.Mobile}>
                <img src={authLogo} className={classes.image} alt={"Hello"} />
              </Box>
              <Box className={classes.LesButtonsTTONS}>
                <Text fz="43px" ta={"center"} fw={700} c={"#20986e"} mb="lg">
                  WELCOME
                </Text>
                <Text fz={"sm"} c={"black"} mb="lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                  reiciendis eaque maxime quisquam fuga cum corrupti ullam.
                </Text>
                <Group grow mb="md" mt="md" position="center">
                  <Button
                    onClick={() => navigation("/login")}
                    size={"lg"}
                    style={{
                      borderRadius: "32px",
                      color: "white",
                      backgroundColor: "#20986e",
                    }}
                  >
                    <IconArrowRight /> Connexion
                  </Button>

                  <Button
                    onClick={() => navigation("/register")}
                    size={"lg"}
                    style={{
                      borderRadius: "32px",
                      color: "white",
                      backgroundColor: "#20986e",
                    }}
                  >
                    <IconArrowRight /> Inscription
                  </Button>
                </Group>
              </Box>
              <div
                className={`secondplaceBottom ${classes.secondplaceBottom2}`}
              ></div>
            </div>
          </Grid.Col>
        </Grid>
      </Box>

      {/* Afichage version mobile */}

      <Box className={classes.hiddenDesktop}>
        <Box
          sx={{

            marginBottom: "-35vh",
            borderRadius: "0 0 32px 32px",
            height: "60vh",
            marginTop: "3vh",
            alignContent: "center",
            alignItems: "center",
            zIndex: 99999,
            position: "relative",
          }}
        >
          <Paper radius={32} pb={40}>
            <Group position={"center"} mb={20}>
              <Image
                radius="md"
                src={ZamodiLogo}
                alt="Logo ZAMODI"
                width={200}
              />
            </Group>

            <Group position="center">
              <Image src={authLogo} width={200} alt={"Hello"} />
            </Group>
          </Paper>
        </Box>
        {/* <BackgroundImage src={bgMobile}>
        <Box sx={{ height: "80vh" ,backgroundSize:'contain'}}></Box>
        </BackgroundImage> */}
        <Box className={`FirstPathAuthMobile `}>
          <Box
            sx={{
              height: "60vh",
              paddingTop: 10,
              background: "#484D69",
              opacity: "85%",
            }}
          >
            <Container>
              <Text fz={"50px"} ta={"center"} fw={900} c={"white"} mt={50}>
                Welcome
              </Text>
              <Text fz={"sm"} mb={50} c={"white"} mt={"vh"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                reiciendis eaque maxime quisquam fuga Maxime,
              </Text>
              <Box mb="md"  position="center">
                <Button
                  onClick={() => navigation("/login")}
                  size={"lg"}
                  fullWidth
                  my={20}
                  style={{
                    borderRadius: "32px",
                    color: "black",
                    backgroundColor: "white",
                  }}
                >
                  <IconArrowRight />
                  Connexion
                </Button>

                <Button
                  my={20}
                  fullWidth
                  onClick={() => navigation("/register")}
                  size={"lg"}
                  style={{
                    borderRadius: "32px",
                    color: "white",
                    backgroundColor: "#20986e",
                  }}
                >
                  <IconArrowRight />
                  Inscription
                </Button>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default FirstPage;
