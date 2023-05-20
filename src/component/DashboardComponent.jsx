import {
  Box,
  Card,
  createStyles,
  Grid,
  Image,
  Loader,
  Paper,
  Tabs,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import mtnLogo from "./../assets/export22/mtn.svg";
import moovLogo from "./../assets/export22/moov.svg";
import sbinLogo from "./../assets/export22/celtiis.svg";
import Tableau from "./Tableau";
import graphOrange from "./../assets/grapheOrange.png";
import graphBlanc from "./../assets/graphBlanc.png";
// import { grapheMoisData, grapheSemaineData, grapheAnneeData } from "./../assets/data/chatData";
import Graphe from "./Graphe";
import HistoriqueDashboard from "./HistoriqueDashboard";
import operationsService from "../services/operations.service";
import Slider from "react-slick";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  hiddenDesktop: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
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

const listeMois = [
  "Janvier ",
  "Février",
  "Mars ",
  "Avril ",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];

function DashboardComponent(props) {
  const { classes, theme } = useStyles();
  const [operationsDetails, setoperationsDetails] = useState({});
  const [historique, sethistorique] = useState([]);
  const [ExBu, setExBu] = useState({});
  const [afficheGraphe, setafficheGraphe] = useState(false);

  const [chartSemaineData, setchartSemaineData] = useState({
    labels: [],
    datasets: [],
  });
  const [chartMoisData, setchartMoisData] = useState({
    labels: [],
    datasets: [],
  });
  const [chartAnneeData, setchartAnneeData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    operationsService.getUserOperationDetails().then((data) => {
      const dataResponse = data.data;
      console.log(dataResponse);
      setoperationsDetails({ ...dataResponse });
      console.log("coucou la team 1", dataResponse);
      // console.log('coucou la team ', operationsDetails)
    });

    operationsService.getUserOperation().then((data) => {
      let dataR = data.data;
      console.log(dataR);
      sethistorique([...dataR]);

      let Years = [];
      let Month = [];
      let Week = [];
      let Montant = [];

      let NewYears = [];
      let NewMonth = [];
      let NewWeek = [];

      let montantMois = [];
      let montantAn = [];
      let montantSemaine = [];

      let YearsInter = {};
      let WeekInter = {};
      let MontInter = {};

      let dataHistorique = [...dataR];
      console.log("Historique ", dataHistorique);

      for (let i = 0; i < dataHistorique.length; i++) {
        let element = dataHistorique[i];

        Years.push(element.annee);
        Month.push(listeMois[parseInt(element.mois)]);
        Week.push("Semaine " + element.semaine);
        Montant.push(element.montant);
      }

      for (let i = 0; i < Years.length; i++) {
        let element = Years[i];
        if (NewYears.indexOf(element) !== -1) {
          montantAn[NewYears.indexOf(element)] += parseInt(Montant[i]);
        } else {
          NewYears.push(element);
          montantAn[NewYears.indexOf(element)] = parseInt(Montant[i]);
        }
      }

      for (let i = 0; i < Month.length; i++) {
        let element = Month[i];
        if (NewMonth.indexOf(element) !== -1) {
          montantMois[NewMonth.indexOf(element)] += parseInt(Montant[i]);
        } else {
          NewMonth.push(element);
          montantMois[NewMonth.indexOf(element)] = parseInt(Montant[i]);
        }
      }

      for (let i = 0; i < Week.length; i++) {
        let element = Week[i];
        if (NewWeek.indexOf(element) !== -1) {
          montantSemaine[NewWeek.indexOf(element)] += parseInt(Montant[i]);
        } else {
          NewWeek.push(element);
          montantSemaine[NewWeek.indexOf(element)] = parseInt(Montant[i]);
        }
      }

      YearsInter = {
        labels: [...NewYears],
        datasets: [
          {
            data: [...montantAn],
            backgroundColor: "transparent",
            borderColor: "green",
            pointBorderColor: "transparent",
            pointBorderWidth: 4,
            tension: 0.5,
          },
        ],
      };

      WeekInter = {
        labels: [...NewWeek],
        datasets: [
          {
            data: [...montantSemaine],
            backgroundColor: "transparent",
            borderColor: "green",
            pointBorderColor: "transparent",
            pointBorderWidth: 4,
            tension: 0.5,
          },
        ],
      };

      MontInter = {
        labels: [...NewMonth],
        datasets: [
          {
            data: [...montantMois],
            backgroundColor: "transparent",
            borderColor: "green",
            pointBorderColor: "transparent",
            pointBorderWidth: 4,
            tension: 0.5,
          },
        ],
      };

      setchartAnneeData({ ...YearsInter });

      setchartMoisData({ ...MontInter });

      setchartSemaineData({ ...WeekInter });
    });

    operationsService.SommeOperation().then(
      (data) => {
        console.log(data.data);
        setExBu({ ...data.data });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    console.log('COUCOU ET DOUDOUD',[chartSemaineData, chartMoisData, chartAnneeData]);
    setTimeout(() => {
      setafficheGraphe(true);
    }, 100);
  }, [chartSemaineData, chartMoisData, chartAnneeData]);

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    // variableWidth: true,
    centerPadding: "10px",
    // autoplay: true,
    // autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box>
      <Grid>
        {/* Partie info */}
        <Grid.Col md={8.5}>
          <Box className={classes.hiddenMobile}>
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
                      {operationsDetails.Mtn} Fcfa
                    </Text>
                    <Text size="xs" mt={1} c="dimmed">
                      Toutes les dépenses
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
                      {operationsDetails.Moov} Fcfa
                    </Text>
                    <Text size="xs" mt={1} c="dimmed">
                      Toutes les dépenses
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
                      {operationsDetails.Celtiis} Fcfa
                    </Text>
                    <Text size="xs" mt={1} c="dimmed">
                      Toutes les dépenses
                    </Text>
                  </div>
                </div>
              </Grid.Col>
            </Grid>
          </Box>

          <Box className={classes.hiddenDesktop} mb={15}>
            <Slider {...settings}>
              <Box px={10}>
                <div className={classes.item}>
                  <div>
                    <Image src={mtnLogo} width={50} alt={"Logo mtn"} />
                  </div>
                  <div>
                    <Text size="sm" mt={7} fw={700}>
                      {operationsDetails.Mtn} Fcfa
                    </Text>
                    <Text size="xs" mt={1} c="dimmed">
                      Toutes les dépenses
                    </Text>
                  </div>
                </div>
              </Box>

              <Box px={10}>
                <div className={classes.item}>
                  <div>
                    <Image src={moovLogo} width={100} alt={"Logo mtn"} />
                  </div>
                  <div>
                    <Text size="sm" mt={7} fw={700}>
                      {operationsDetails.Moov} Fcfa
                    </Text>
                    <Text size="xs" mt={1} c="dimmed">
                      Toutes les dépenses
                    </Text>
                  </div>
                </div>
              </Box>

              <Box px={10}>
                <div className={classes.item}>
                  <div>
                    <Image src={sbinLogo} width={50} alt={"Logo mtn"} />
                  </div>
                  <div>
                    <Text size="sm" mt={7} fw={700}>
                      {operationsDetails.Celtiis} Fcfa
                    </Text>
                    <Text size="xs" mt={1} c="dimmed">
                      Toutes les dépenses
                    </Text>
                  </div>
                </div>
              </Box>
            </Slider>
          </Box>

          {/* Niveau 2 */}
          <Box>
            <Grid>
              <Grid.Col md={6}  style={{display:'flex',flex:1}} >
                <Card style={{display:'flex',flex:1}}>
                  {/* <GrapheComponent /> */}

                  <Tabs defaultValue="semaine" color="#20986e" center>
                    <Tabs.List position={"center"}>
                      <Tabs.Tab value="semaine">Semaines</Tabs.Tab>
                      <Tabs.Tab value="mois">Mois</Tabs.Tab>
                      <Tabs.Tab value="annees">Années</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="semaine" pt="xs">
                      {afficheGraphe ? (
                        <>
                          {chartSemaineData.labels.length > 0 ? (
                            <>jhfergregjberjhbeg</>
                            // <Graphe
                            //   chartData={chartSemaineData}
                            //   titre={"Dépense de la semaine"}
                            //   text={"Dépense sur la semaine N°"}
                            // />
                          ) : (
                            <Text color="#20986e" ta={"center"}>
                              Aucune transaction disponible actuellement
                            </Text>
                          )}
                        </>
                      ) : (
                        <Box>
                          <Text color="#20986e" ta={"center"}>
                            {" "}
                            <Loader color="green" variant="bars" />
                          </Text>
                        </Box>
                      )}
                    </Tabs.Panel>

                    <Tabs.Panel value="mois" pt="xs">
                      {afficheGraphe ? (

                        <>
                          {chartMoisData.labels.length > 0 ? (
                            <>hjrejtjertjretkje</>
                            // <Graphe
                            //   chartData={chartMoisData}
                            //   titre={"Dépense de la semaine"}
                            //   text={"Dépense sur la semaine N°"}
                            // />
                          ) : (
                            <Text color="#20986e" ta={"center"}>
                              Aucune transaction disponible actuellement
                            </Text>
                          )}
                        </>
                      ) : (
                        
                        <Box>
                          <Text color="#20986e" ta={"center"}>
                            {" "}
                            <Loader color="green" variant="bars" />
                          </Text>
                        </Box>
                      )}
                    </Tabs.Panel>

                    <Tabs.Panel value="annees" pt="xs">
                      {afficheGraphe ? (
                        <>
                        {chartAnneeData.labels.length > 0 ? (
                          <Graphe
                            chartData={chartAnneeData}
                            titre={"Dépense de la semaine"}
                            text={"Dépense sur la semaine N°"}
                          />
                        ) : (
                          <Text color="#20986e" ta={"center"}>
                            Aucune transaction disponible actuellement
                          </Text>
                        )}
                      </>
                      ) : (
                        
                        <Box>
                          <Text color="#20986e" ta={"center"}>
                            {" "}
                            <Loader color="green" variant="bars" />
                          </Text>
                        </Box>
                      )}
                    </Tabs.Panel>
                  </Tabs>
                </Card>
              </Grid.Col>
              <Grid.Col md={6}>
                <Card>
                  <Paper withBorder radius="md" p="xs" my={28}>
                    <Grid>
                      <Grid.Col span={4}>
                        <Text size="sm" mt={7} fw={700}>
                          {ExBu.Achat} Fcfa
                        </Text>
                        <Text size="xs" mt={1} c="dimmed">
                          en Achats
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

                  <Paper withBorder radius="md" p="xs" my={28}>
                    <Grid>
                      <Grid.Col span={4}>
                        <Text size="sm" mt={7} fw={700}>
                          {ExBu.Echange} Fcfa
                        </Text>
                        <Text size="xs" mt={1} c="dimmed">
                          en Echange
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={8} style={{ padding: 0 }}>
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
              <Tableau />
            </Card>
          </Box>
        </Grid.Col>

        {/* Parie Historique */}
        <Grid.Col md={3.5}>
          <HistoriqueDashboard />
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default DashboardComponent;
