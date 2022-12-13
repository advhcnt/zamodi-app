import {
  Box,
  Card,
  createStyles,
  Grid,
  Image,
  Paper,
  Tabs,
  Text,
  UnstyledButton,
} from "@mantine/core";
import React, { useState } from "react";
import mtnLogo from "./../assets/momo.png";
import moovLogo from "./../assets/flooz.png";
import sbinLogo from "./../assets/celtiis.png";
import Tableau from "./Tableau";
import graphOrange from "./../assets/grapheOrange.png";
import graphBlanc from "./../assets/graphBlanc.png";
import grapheData from "./../assets/data/chatData";
import Graphe from "./Graphe";

const tableData = [
  {
    name: "Athena Weissnat",
    company: "Little - Rippin",
    email: "Elouise.Prohaska@yahoo.com",
  },
  {
    name: "Deangelo Runolfsson",
    company: "#20986efelder - Krajcik",
    email: "Kadin_Trantow87@yahoo.com",
  },
  {
    name: "Danny Carter",
    company: "Kohler and Sons",
    email: "Marina3@hotmail.com",
  },
  {
    name: "Trace Tremblay PhD",
    company: "Crona, Aufderhar and Senger",
    email: "Antonina.Pouros@yahoo.com",
  },
  {
    name: "Derek Dibbert",
    company: "Gottlieb LLC",
    email: "Abagail29@hotmail.com",
  },
  {
    name: "Viola Bernhard",
    company: "Funk, Rohan and Kreiger",
    email: "Jamie23@hotmail.com",
  },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },
  secondCard: {
    display: "flex",
    alignItems: "space-between",
    paddingLeft: "2vw",
    marginBlock: "2vh",
    borderRadius: theme.radius.md,
    height: 80,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",
    boxShadow: "unset",
  },

  item: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "2vw",
    // justifyContent: "space-around",
    gap: 10,
    justifyItems: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: 80,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: `${theme.shadows.md} !important`,
      transform: "scale(1.05)",
    },
  },
}));

function DashboardComponent(props) {
  const { classes, theme } = useStyles();
  const [chartData, setChartData] = useState(grapheData);

  return (
    <Box>
      <Grid>
        {/* Partie info */}
        <Grid.Col md={9}>
          <Box>
            <Grid>
              <Grid.Col md={4}>
                <div className={classes.item}>
                  <div>
                    <Image
                      src={mtnLogo}
                      style={{ height: "100%", width: "100%" }}
                      alt={"Logo mtn"}
                    />
                  </div>
                  <div>
                    <Text size="sm" mt={7} fw={700}>
                      10.000 Fcfa
                    </Text>
                    <Text size="xs" mt={1} c="dimmed">
                      lorem ipsum
                    </Text>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col md={4}>
                {" "}
                <div className={classes.item}>
                  <div>
                    <Image
                      src={moovLogo}
                      style={{ height: "100%", width: "100%" }}
                      alt={"Logo mtn"}
                    />
                  </div>
                  <div>
                    <Text size="sm" mt={7} fw={700}>
                      10.000 Fcfa
                    </Text>
                    <Text size="xs" mt={1} c="dimmed">
                      lorem ipsum
                    </Text>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col md={4}>
                <div className={classes.item}>
                  <div>
                    <Image
                      src={sbinLogo}
                      style={{ height: "100%", width: "100%" }}
                      alt={"Logo mtn"}
                    />
                  </div>
                  <div>
                    <Text size="sm" mt={7} fw={700}>
                      10.000 Fcfa
                    </Text>
                    <Text size="xs" mt={1} c="dimmed">
                      lorem ipsum
                    </Text>
                  </div>
                </div>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Niveau 2 */}
          <Box>
            <Grid>
              <Grid.Col md={6}>
                <Card>
                  <Tabs defaultValue="gallery" color="#20986e" center>
                    <Tabs.List position={"center"}>
                      <Tabs.Tab value="semaine">Semaines</Tabs.Tab>
                      <Tabs.Tab value="mois">Mois</Tabs.Tab>
                      <Tabs.Tab value="annees">Années</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="semaine" pt="xs">
                      {/* <Graphe chartData={chartData} /> */}
                    </Tabs.Panel>

                    <Tabs.Panel value="mois" pt="xs">
                      Graphe du mois
                    </Tabs.Panel>

                    <Tabs.Panel value="annees" pt="xs">
                      Graphe de l'année
                    </Tabs.Panel>
                  </Tabs>
                </Card>
              </Grid.Col>
              <Grid.Col md={6}>
                <Card>
                  <Paper withBorder radius="md" p="xs">
                    <Grid>
                      <Grid.Col span={4}>
                        <Text size="sm" mt={7} fw={700}>
                          10.000 Fcfa
                        </Text>
                        <Text size="xs" mt={1} c="dimmed">
                          lorem ipsum
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={8}>
                        {" "}
                        <Image
                          src={graphBlanc}
                          style={{ height: "100%", width: "100%" }}
                          alt={"Logo mtn"}
                        />
                      </Grid.Col>
                    </Grid>
                  </Paper>

                  <Paper withBorder radius="md" p="xs">
                    <Grid>
                      <Grid.Col span={4}>
                        <Text size="sm" mt={7} fw={700}>
                          10.000 Fcfa
                        </Text>
                        <Text size="xs" mt={1} c="dimmed">
                          lorem ipsumFDGFGF
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={8} style={{padding:0}}>
                        <Image
                          src={graphOrange}
                          style={{
                            height: "100%",
                            width: "100%",
                            margin: "0px",
                          }}
                          alt={"Logo mtn"}
                        />
                      </Grid.Col>
                    </Grid>
                  </Paper>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* /tableau */}
          <Box my={15}>
            <Card radius={"md"}>
              <Tableau data={tableData} />
            </Card>
          </Box>
        </Grid.Col>

        {/* Parie Historique */}
        <Grid.Col md={3}>
          <Card style={{ width: "100%", height: "100%" }}>
            <Text size={"md"} fw={400}>
              Historique
            </Text>
            {[...Array(5).keys()].map((item) => (
              <Paper
                withBorder
                radius="md"
                p="xs"
                className={classes.secondCard}
                key={item}
              >
                <div style={{ display: "flex" }}>
                  <Image
                    src={mtnLogo}
                    style={{ height: "100%", width: "100%", zIndex: 1 }}
                    alt={"Logo mtn"}
                  />
                  <Image
                    src={sbinLogo}
                    style={{
                      height: "100%",
                      width: "100%",
                      zIndex: 1000,
                      marginLeft: -15,
                    }}
                    alt={"Logo mtn"}
                  />
                </div>

                <div>
                  <Text size="sm" mt={7} fw={700}>
                    10.000 Fcfa
                  </Text>
                  <Text size="xs" mt={1} c="dimmed">
                    lorem ipsum
                  </Text>
                </div>
              </Paper>
            ))}
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default DashboardComponent;
