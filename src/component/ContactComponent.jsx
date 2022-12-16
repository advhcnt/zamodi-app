import { Card, Divider, Image, Text, Textarea, TextInput, Grid, Container, Box, Button } from '@mantine/core';
import React from 'react';
import ContactLogo from './../assets/contact.svg'

function ContactComponent(props) {
    return (
        <div>

            <Container>
                <Text fz={'lg'} fw={'bold'} my={30}>Créer un ticket</Text>
                <Card shadow="lg">
                    <Card.Section>
                        <Grid >
                            <Grid.Col md={5} style={{ justifyContent: 'space-around', backgroundColor: '#f7f7f7' }}>
                                <Image src={ContactLogo} style={{ width: '80%' }} mt={40} />
                                <Container mt={20}>
                                    <Text ta={'center'}>
                                        Notre service client disponible pour vous écouter
                                        24h/ 24h
                                    </Text>
                                </Container>

                            </Grid.Col>
                            <Grid.Col md={7}>
                                <Container>
                                    <Text fz={'md'} fw={'bold'} mt={20}>Support</Text>
                                    <Divider mt={15} mb={40} />
                                    <Box my={20}>
                                        <Text size={'md'}>Sujet</Text>
                                        <TextInput size={'md'} variant={'filled'} style={{ borderColor: '#20986e' }} />
                                    </Box>

                                    <Box my={20}>
                                        <Text size={'md'}>Sujet</Text>
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

export default ContactComponent;