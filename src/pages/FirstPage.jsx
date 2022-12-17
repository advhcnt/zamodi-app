import {
  Box,
  Button,
  createStyles,
  Grid,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authLogo from "./../assets/authLogo.svg";
import ZamodiLogo from "./../assets/Zamodi-Logo.png";

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
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  onMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  secondplaceBottom2: {
    height: "15.3vh",
    marginTop: "11vh",
   
    [theme.fn.smallerThan("md")]: {
      marginTop: "4%",
      
    },
    [theme.fn.smallerThan("sm")]: {
      height: "16vh",
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

  return (
    <Box style={{ maxWidth: "100vw" }}>
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
              height: "100%",
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
                Maxime, porro veniam? Vel, amet aperiam rerum magni fugit ex at
                modi dolore.
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
          <div className={`secondplace ${classes.secondPlacejsx}`}>
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
          </div>
          <div
            className={`secondplaceBottom ${classes.secondplaceBottom2}`}
          ></div>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default FirstPage;
