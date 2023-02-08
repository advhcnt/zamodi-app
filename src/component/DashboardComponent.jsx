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
import mtnLogo from "./../assets/momo.png";
import moovLogo from "./../assets/flooz.png";
import sbinLogo from "./../assets/celtiis.png";
import Tableau from "./Tableau";
import graphOrange from "./../assets/grapheOrange.png";
import graphBlanc from "./../assets/graphBlanc.png";
// import { grapheMoisData, grapheSemaineData, grapheAnneeData } from "./../assets/data/chatData";
import Graphe from "./Graphe";
import HistoriqueDashboard from "./HistoriqueDashboard";
import operationsService from "../services/operations.service";


// const tableData = [
//   {
//     name: "Athena Weissnat",
//     company: "Little - Rippin",
//     email: "Elouise.Prohaska@yahoo.com",
//   },
//   {
//     name: "Deangelo Runolfsson",
//     company: "#20986efelder - Krajcik",
//     email: "Kadin_Trantow87@yahoo.com",
//   },
//   {
//     name: "Danny Carter",
//     company: "Kohler and Sons",
//     email: "Marina3@hotmail.com",
//   },
//   {
//     name: "Trace Tremblay PhD",
//     company: "Crona, Aufderhar and Senger",
//     email: "Antonina.Pouros@yahoo.com",
//   },
//   {
//     name: "Derek Dibbert",
//     company: "Gottlieb LLC",
//     email: "Abagail29@hotmail.com",
//   },
//   {
//     name: "Viola Bernhard",
//     company: "Funk, Rohan and Kreiger",
//     email: "Jamie23@hotmail.com",
//   },
// ];

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


const listeMois = ['Janvier ', 'Février', 'Mars ', 'Avril ', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre']


function DashboardComponent(props) {
  const { classes, theme } = useStyles();
  // const [chartMoisData, setChartMoisData] = useState(grapheMoisData);
  // const [chartAnneeData, setChartAnneeData] = useState(grapheAnneeData);
  // const [chartSemaineData, setChartSemaineData] = useState(grapheSemaineData);
  const [operationsDetails, setoperationsDetails] = useState({})
  const [historique, sethistorique] = useState([])
  const [ExBu, setExBu] = useState({})
  const [afficheGraphe, setafficheGraphe] = useState(false)


  const [chartSemaineData, setchartSemaineData] = useState({});
  const [chartMoisData, setchartMoisData] = useState({});
  const [chartAnneeData, setchartAnneeData] = useState({});



  useEffect(() => {

    operationsService.getUserOperationDetails().then(
      (data) => {
        const dataResponse = data.data;
        console.log(dataResponse)
        setoperationsDetails({ ...dataResponse })
        console.log('coucou la team 1', dataResponse)
        // console.log('coucou la team ', operationsDetails)
      }
    )

    operationsService.getUserOperation().then(
      (data) => {
        let dataR = data.data;
        console.log(dataR)
        sethistorique([...dataR])


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

        let dataHistorique = [...dataR];
        console.log("Historique ", dataHistorique);

        for (let i = 0; i < dataHistorique.length; i++) {
          let element = dataHistorique[i];

          Years.push(element.annee);
          Month.push(listeMois[parseInt(element.mois)]);
          Week.push('Semaine ' + element.semaine);
          Montant.push(element.montant);
        }

        for (let i = 0; i < Years.length; i++) {
          let element = Years[i];
          if(NewYears.indexOf(element)!== -1){
            montantAn[NewYears.indexOf(element)] +=parseInt(Montant[i])
          }else{
            NewYears.push(element);
            montantAn[NewYears.indexOf(element)] =parseInt(Montant[i])
          }
        }

        for (let i = 0; i < Month.length; i++) {
          let element = Month[i];
          if(NewMonth.indexOf(element)!== -1){
            montantMois[NewMonth.indexOf(element)] +=parseInt(Montant[i])
          }else{
            NewMonth.push(element);
            montantMois[NewMonth.indexOf(element)] =parseInt(Montant[i])
          }
        }


        for (let i = 0; i < Week.length; i++) {
          let element = Week[i];
          if(NewWeek.indexOf(element)!== -1){
            montantSemaine[NewWeek.indexOf(element)] +=parseInt(Montant[i])
          }else{
            NewWeek.push(element);
            montantSemaine[NewWeek.indexOf(element)] =parseInt(Montant[i])
          }
        }


        setchartAnneeData({
          labels: [...NewYears],
          datasets: [{
            data: [...montantAn],
            backgroundColor: 'transparent',
            borderColor: 'red',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            tension: 0.5


          }]
        })

        setchartMoisData({
          labels: [...NewMonth],
          datasets: [{
            data: [...montantMois],
            backgroundColor: 'transparent',
            borderColor: 'red',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            tension: 0.5


          }]
        })

        setchartSemaineData({
          labels: [...NewWeek],
          datasets: [{
            data: [...montantSemaine],
            backgroundColor: 'transparent',
            borderColor: 'red',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            tension: 0.5


          }]
        })
      }
    );

    operationsService.SommeOperation().then(
      (data) => {
        console.log(data.data)
        setExBu({ ...data.data })
      },
      (error) => {
        console.log(error)
      }
    )




  }, []);


  useEffect(() => {
    console.log(chartSemaineData)
    setTimeout(() => {
      setafficheGraphe(true)
    }, 5000);
  }, [chartSemaineData])

  return (
    <Box>
      <Grid>
        {/* Partie info */}
        <Grid.Col md={8.5}>
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

          {/* Niveau 2 */}
          <Box>
            <Grid>
              <Grid.Col md={6}>
                <Card>
                  {/* <GrapheComponent /> */}

                  <Tabs defaultValue="semaine" color="#20986e" center>
                    <Tabs.List position={"center"} >
                      <Tabs.Tab value="semaine">Semaines</Tabs.Tab>
                      <Tabs.Tab value="mois">Mois</Tabs.Tab>
                      <Tabs.Tab value="annees">Années</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="semaine" pt="xs">
                      {afficheGraphe ? (
                        <Graphe chartData={chartSemaineData} titre={'Dépense de la semaine'} text={'Dépense sur la semaine N°'} />
                      ) : (
                        <Box>
                          <Text color="#20986e" ta={'center'} > <Loader color="green" variant="bars" /></Text>
                        </Box>

                      )}
                    </Tabs.Panel>

                    <Tabs.Panel value="mois" pt="xs">
                      {afficheGraphe ? (
                        <Graphe chartData={chartMoisData} titre={'Dépense du mois'} text={'Dépense dans le mois N°'} />
                      ) : (
                        <Box>
                          <Text color="#20986e" ta={'center'} > <Loader color="green" variant="bars" /></Text>
                        </Box>

                      )}
                    </Tabs.Panel>

                    <Tabs.Panel value="annees" pt="xs">
                      {afficheGraphe ? (
                        <Graphe chartData={chartAnneeData} titre={"Dépense de l'année"} text={'Dépense sur l\'année'} />
                      ) : (
                        <Box>
                          <Text color="#20986e" ta={'center'} > <Loader color="green" variant="bars" /></Text>
                        </Box>

                      )}
                    </Tabs.Panel>
                  </Tabs>

                  {/* <Tabs defaultValue="semaine" color="#20986e" center>
                    <Tabs.List position={"center"} >
                      <Tabs.Tab value="semaine">Semaines</Tabs.Tab>
                      <Tabs.Tab value="mois">Mois</Tabs.Tab>
                      <Tabs.Tab value="annees">Années</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="semaine" pt="xs">
                      <Graphe chartData={chartSemaineData} titre={'Dépense de la semaine'} text={'Dépense sur la semaine N°'} />
                    </Tabs.Panel>

                    <Tabs.Panel value="mois" pt="xs">
                      <Graphe chartData={chartMoisData} titre={'Dépense du mois'} text={'Dépense dans le mois N°'} />

                    </Tabs.Panel>

                    <Tabs.Panel value="annees" pt="xs">
                      <Graphe chartData={chartAnneeData} titre={"Dépense de l'année"} text={'Dépense sur l\'année'} />

                    </Tabs.Panel>
                  </Tabs> */}
                </Card>
              </Grid.Col>
              <Grid.Col md={6}>
                <Card >
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
