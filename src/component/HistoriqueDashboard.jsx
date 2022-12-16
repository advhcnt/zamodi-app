import { Box, Card, Group, Image, Paper, Text } from "@mantine/core";
import React from "react";
import mtnLogo from "./../assets/momo.png";
import moovLogo from "./../assets/flooz.png";
import sbinLogo from "./../assets/celtiis.png";
import { createStyles } from "@mantine/core";
import { IconDots, IconDotsVertical } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
    secondCard: {
        display: "flex",
        alignItems: "center",
        paddingLeft: "2vw",
        marginBlock: "2vh",
        gap: 15,
        borderRadius: theme.radius.md,
        height: 80,
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        transition: "box-shadow 150ms ease, transform 100ms ease",
        boxShadow: "unset",
        marginInline: '3px',
    },
}));
function HistoriqueDashboard(props) {
    const { classes, theme } = useStyles();
    return (
        <Card style={{ width: "100%", height: "100%" }}>
            <Text size={"md"} fw={'bolder'}>
                Historique
            </Text>

            {[...Array(8).keys()].map((item) => (
                <Paper
                    withBorder
                    radius="md"
                    p="xs"
                    className={classes.secondCard}
                    key={item}
                >
                    <Group
                        // position={"apart"}
                        style={{
                            display: "flex",
                            alignItems: 'center',
                            // justifyContent: "space-between",
                            width: "100%",
                            gap:5,
                        }}
                    >

                        <Box>
                            <Image
                                src={mtnLogo}
                                style={{ height: "80%", width: "80%" }}
                                alt={"Logo mtn"}
                            />
                        </Box>
                        <Box>
                            <Text size="xs" fw={'bold'} c="dark">
                                MTN MOMO
                            </Text>
                            <Text size="10px" c={'dimmed'}>
                                31 Avril 2022,Dimanche
                            </Text>
                        </Box>



                        <Text size="xs" mt={7} fw={'bold'} c="dark">
                            5000F cfa
                        </Text>


                    </Group>
                </Paper>
            ))}
        </Card>
    );
}

export default HistoriqueDashboard;
