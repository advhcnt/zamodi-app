import { Card, Paper, Text, Container, Box, Button, Group, TextInput, Grid, Divider, Textarea } from '@mantine/core';
import React from 'react';

function ServiceComponent(props) {
    return (
        <div>

            <Container size={'sm'}>

                <Card shadow="lg">
                    <Card.Section
                        withBorder
                        inheritPadding
                        py="xs"
                        className="ArrierePlan"
                    >
                        <Box>
                            <Text fz={"sm"} weight={500} ta={"center"} c={"white"}>
                                Noter le service
                            </Text>
                        </Box>
                    </Card.Section>
                    <Card.Section>
                        <Container>
                            <Paper my={20} shadow={'lg'}>
                                <Group position={'apart'}>
                                    <Box c={'dark'}>
                                        ArrierePlan
                                        <Text fz={"sm"} weight={500} ta={"center"} c={"white"}>
                                            Noter le service
                                        </Text>
                                    </Box>
                                    <Box c={'dark'}>
                                        ArrierePlan
                                        <Text fz={"sm"} weight={500} ta={"center"} c={"white"}>
                                            Noter le service
                                        </Text>
                                    </Box>
                                    <Box c={'dark'}>
                                        ArrierePlan
                                        <Text fz={"sm"} weight={500} ta={"center"} c={"white"}>
                                            Noter le service
                                        </Text>
                                    </Box>
                                    <Box c={'dark'}>
                                        ArrierePlan
                                        <Text fz={"sm"} weight={500} ta={"center"} c={"white"}>
                                            Noter le service
                                        </Text>
                                    </Box>
                                </Group>
                            </Paper>
                        </Container>
                    </Card.Section>


                    <Card.Section>
                        <Grid >
                            <Grid.Col md={5} style={{ justifyContent: 'space-around' }}>

                                <Container mt={20}>
                                <Text fz={'md'} fw={'900'} mt={20}>Note globale</Text>
                                    <Divider mt={15} mb={40} />
                                </Container>

                            </Grid.Col>
                            <Grid.Col md={7}>
                                <Container>
                                    <Text fz={'md'} fw={'900'} mt={20}>Écrire un avis sur</Text>
                                    <Divider mt={15} mb={40} />
                                    <Box my={20}>
                                        <Text size={'md'}>Nom d'utilisateur</Text>
                                        <TextInput size={'md'} variant={'filled'} style={{ borderColor: '#20986e' }} />
                                    </Box>

                                    <Box my={20}>
                                        <Text size={'md'}>Avis</Text>
                                        <Textarea
                                            autosize
                                            minRows={2}
                                            variant={'filled'}
                                            style={{ borderColor: '#20986e' }}
                                        />
                                    </Box>
                                    <Box my={40}>
                                        <Button className={'ArrierePlan'} c={'white'} fullWidth >
                                            Envoyer
                                        </Button>
                                    </Box>
                                </Container>
                            </Grid.Col>
                        </Grid>
                    </Card.Section>
                </Card>
            </Container>
        </div>
    );
}

export default ServiceComponent;