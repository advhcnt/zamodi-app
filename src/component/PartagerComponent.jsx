import { Container, Text, Box, TextInput, Button, Group, Divider,Image } from '@mantine/core';
import React from 'react';
import { useState } from 'react';
import facebook from './../assets/facebook.png';

function PartagerComponent(props) {
    const [valeur, setValeur] = useState('https://app.zamodi.com/register')
    return (
        <Container size="sm">
            <Text fz={'md'} fw={'bold'}>
                Partager l'application
            </Text>

            <Text fz={'sm'} c={'dimmed'} my={30}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            </Text>

            <Box>
                <Text fz={"md"} mb={10}>
                    Lien
                </Text>
                <TextInput value={valeur} readOnly rightSection={<Button className={'ArrierePlan'}>Copier</Button>} />
            </Box>
            <Divider my={30} />
            <Text mb={20}>Partager sur les réseaux</Text>
            <Group >
            <Image src={facebook} alt="facebook" width={25} />
            <Image src={facebook} alt="facebook" width={25} />
            <Image src={facebook} alt="facebook" width={25} />
            <Image src={facebook} alt="facebook" width={25} />
            </Group>
        </Container>
    );
}

export default PartagerComponent;