import { Avatar, Box, createStyles, Grid, Image, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import mtnLogo from "./../../assets/momo.png";
import moovLogo from "./../../assets/flooz.png";
import sbinLogo from "./../../assets/celtiis.png";
import operationsService from "../../services/operations.service";

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
    },
  },
}));

function DetailsComponent(props) {
  const { classes, theme } = useStyles();
  const [celtiis, setceltiis] = useState({});
  const [mtn, setmtn] = useState({});
  const [moov, setmoov] = useState({});
  const [user, setuser] = useState(0);

  useEffect(() => {
    operationsService.globalInfo().then(
      (data) => {
        const detail = data.data;
        
        setceltiis({ ...detail.Celtiis });
        setmtn({ ...detail.Mtn });
        setmoov({ ...detail.Moov });
        setuser(detail.utilisateurs);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  return (
    <Box my={40}>
      <Grid>
        <Grid.Col md={3}>
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
                {mtn.montant} Fcfa
              </Text>
              <Text size="xs" mt={1} c="dimmed">
                Toutes les dépenses
              </Text>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col md={3}>
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
                {moov.montant} Fcfa
              </Text>
              <Text size="xs" mt={1} c="dimmed">
                Toutes les dépenses
              </Text>
            </div>
          </div>
        </Grid.Col>

        <Grid.Col md={3}>
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
                {celtiis.montant} Fcfa
              </Text>
              <Text size="xs" mt={1} c="dimmed">
                Toutes les dépenses
              </Text>
            </div>
          </div>
        </Grid.Col>

        <Grid.Col md={3}>
          <div className={classes.item}>
            <div>
              <Avatar size={50} radius={360}/>
            </div>
            <div>
              <Text size="sm" mt={7} fw={700}>
                {user} 
              </Text>
              <Text size="xs" mt={1} c="dimmed">
                Clients
              </Text>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default DetailsComponent;
