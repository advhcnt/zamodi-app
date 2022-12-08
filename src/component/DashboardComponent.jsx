import {
  Box,
  Card,
  createStyles,
  Grid,
  Image,
  Paper,
  Text,
  UnstyledButton,
} from "@mantine/core";
import React from "react";
import mtnLogo from "./../assets/momo.png";
import moovLogo from "./../assets/flooz.png";
import sbinLogo from "./../assets/celtiis.png";
import Tableau from "./Tableau";
import graphOrange from './../assets/grapheOrange.png';
import graphBlanc from './../assets/graphBlanc.png';

const tableData = [
  {
    name: "Athena Weissnat",
    company: "Little - Rippin",
    email: "Elouise.Prohaska@yahoo.com",
  },
  {
    name: "Deangelo Runolfsson",
    company: "Greenfelder - Krajcik",
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
  {
    name: "Austin Jacobi",
    company: "Botsford - Corwin",
    email: "Genesis42@yahoo.com",
  },
  {
    name: "Hershel Mosciski",
    company: "Okuneva, Farrell and Kilback",
    email: "Idella.Stehr28@yahoo.com",
  },
  {
    name: "Mylene Ebert",
    company: "Kirlin and Sons",
    email: "Hildegard17@hotmail.com",
  },
  {
    name: "Lou Trantow",
    company: "Parisian - Lemke",
    email: "Hillard.Barrows1@hotmail.com",
  },
  {
    name: "Dariana Weimann",
    company: "Schowalter - Donnelly",
    email: "Colleen80@gmail.com",
  },
  {
    name: "Dr. Christy Herman",
    company: "VonRueden - Labadie",
    email: "Lilyan98@gmail.com",
  },
  {
    name: "Katelin Schuster",
    company: "Jacobson - Smitham",
    email: "Erich_Brekke76@gmail.com",
  },
  {
    name: "Melyna Macejkovic",
    company: "Schuster LLC",
    email: "Kylee4@yahoo.com",
  },
  {
    name: "Pinkie Rice",
    company: "Wolf, Trantow and Zulauf",
    email: "Fiona.Kutch@hotmail.com",
  },
  {
    name: "Brain Kreiger",
    company: "Lueilwitz Group",
    email: "Rico98@hotmail.com",
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
    alignItems: "center",
    paddingLeft: "2vw",
    marginBlock:'2vh',
    gap: 10,
    justifyItems: "center",
    textAlign: "center",
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

  return (
    <Box>
      <Grid>
        {/* Partie info */}
        <Grid.Col md={10}>
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
                <Card>dsezteer</Card>
              </Grid.Col>
              <Grid.Col md={6}>
                <Card>
                  <Paper withBorder radius="md" p="xs" className={classes.secondCard}>
                   
                    <div>
                      <Text size="sm" mt={7} fw={700}>
                        10.000 Fcfa
                      </Text>
                      <Text size="xs" mt={1} c="dimmed">
                        lorem ipsum
                      </Text>
                    </div>

                    <div>
                      <Image
                        src={graphBlanc}
                        style={{ height: "100%", width: "100%" }}
                        alt={"Logo mtn"}
                      />
                    </div>
                  </Paper>

                  <Paper withBorder radius="md" p="xs" className={classes.secondCard}>
                    
                    <div>
                      <Text size="sm" mt={7} fw={700}>
                        10.000 Fcfa
                      </Text>
                      <Text size="xs" mt={1} c="dimmed">
                        lorem ipsum
                      </Text>
                    </div>
                    <div>
                      <Image
                        src={graphOrange}
                        style={{ height: "80%", width: "80%",margin:"0px" }}
                        alt={"Logo mtn"}
                      />
                    </div>
                  </Paper>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* /tableau */}
          <Box my={15}>
            <Card radius={'md'} >
              <Tableau data={tableData} />
            </Card>
          </Box>
        </Grid.Col>

        {/* Parie Historique */}
        <Grid.Col md={2}>
          <Text>Historique</Text>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default DashboardComponent;
