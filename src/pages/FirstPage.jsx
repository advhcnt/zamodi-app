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
  onMobile:{
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  }
}));

function FirstPage(props) {
  const { classes, cx } = useStyles();
  const navigation = useNavigate();

  return (
    <div style={{ maxWidth: "100vw", overflow: "hidden",maxHeight:'100vh' }}>
      <Grid style={{ maxHeight: "102vh",overflow: "hidden" }}>
        {/* Première partie */}
        <Grid.Col md={6} order={2} orderMd={1} className={`FirstPathAuth ${classes.hiddenDesktop}` }>
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
                  <IconArrowRight />Connexion
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
                  <IconArrowRight />Inscription
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
          <div style={{ paddingTop: 80 }} className={"secondplace"}>
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
              <Image
                radius="md"
                src={authLogo}
                alt="Random unsplash image"
                width={450}
                className={"imageStyle"}
              />
            </Box>
            <Box className={classes.LesButtonsTTONS}>
              <Text fz="60px" ta={"center"} fw={700} c={"#20986e"} mb="md">
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
            className="secondplaceBottom"
            style={{ height: "20vh", marginTop: "0vh", marginLeft: "-8px" }}
          ></div>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default FirstPage;
