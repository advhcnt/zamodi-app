import { Card, Image, Paper, Text } from '@mantine/core';
import React from 'react';
import mtnLogo from "./../assets/momo.png";
import moovLogo from "./../assets/flooz.png";
import sbinLogo from "./../assets/celtiis.png";
import { createStyles } from '@mantine/core';


const useStyles = createStyles((theme) => ({
    secondCard: {
        display: "flex",
        alignItems: "center",
        paddingLeft: "2vw",
        marginBlock: "2vh",
        gap:15,
        borderRadius: theme.radius.md,
        height: 80,
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        transition: "box-shadow 150ms ease, transform 100ms ease",
        boxShadow: "unset",
    },
}));
function HistoriqueComponent(props) {
    const { classes, theme } = useStyles();
    return (
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
                </Paper>
            ))}
        </Card>
    );
}

export default HistoriqueComponent;