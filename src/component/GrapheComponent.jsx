import { Box, Tabs } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import operationsService from '../services/operations.service';
import Graphe from './Graphe';

const listeMois = ['Janvier ', 'Février', 'Mars ', 'Avril ', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre']

function GrapheComponent(props) {

    const [dataHistorique, setdataHistorique] = useState([])
    const [dataMois, setdataMois] = useState([])
    const [dataSemaine, setdataSemaine] = useState([])
    const [dataAnnee, setdataAnnee] = useState([])
    const [dataMontant, setdataMontant] = useState([]);
    const [chartSemaineData, setchartSemaineData] = useState({});
    const [chartMoisData, setchartMoisData] = useState({});
    const [chartAnneeData, setchartAnneeData] = useState({});

    useEffect(() => {
        operationsService.getUserOperation().then(
            (data) => {
                let Years = [];
                let Month = [];
                let Week = [];
                let Montant = [];

                const dataR = data.data;
                setdataHistorique([...dataR]);
                console.log("Historique ", dataHistorique);

                for (let i = 0; i < dataHistorique.length; i++) {
                    let element = dataHistorique[i];
                    Years.push(element.annee);
                    Month.push(listeMois[parseInt(element.mois)]);
                    Week.push('Semaine ' + element.semaine);
                    Montant.push(element.montant);
                }
                setdataMois([...Month]);
                setdataSemaine([...Week]);
                setdataAnnee([...Years]);
                setdataMontant([...Montant]);


                // setchartAnneeData({
                //     labels: [...Years],
                //     datasets: [{
                //         data: [...Montant],
                //         backgroundColor: 'transparent',
                //         borderColor: 'red',
                //         pointBorderColor: 'transparent',
                //         pointBorderWidth: 4,
                //         tension: 0.5


                //     }]
                // })

                // setchartMoisData({
                //     labels: [...Month],
                //     datasets: [{
                //         data: [...Montant],
                //         backgroundColor: 'transparent',
                //         borderColor: 'red',
                //         pointBorderColor: 'transparent',
                //         pointBorderWidth: 4,
                //         tension: 0.5


                //     }]
                // })

                // setchartSemaineData({
                //     labels: [...Week],
                //     datasets: [{
                //         data: [...Montant],
                //         backgroundColor: 'transparent',
                //         borderColor: 'red',
                //         pointBorderColor: 'transparent',
                //         pointBorderWidth: 4,
                //         tension: 0.5


                //     }]
                // })





            },
            (error) => {
                console.log(error);
            }
        );
    }, [dataHistorique]);



    return (
        <Box>
            Mois  {dataMois[0]} <br/>
           Semaine {dataSemaine[0]} <br/>
           Annee {dataAnnee[0]} <br/>
           Montant {dataMontant[0]} <br/>

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

        </Box>
    );
}

export default GrapheComponent;