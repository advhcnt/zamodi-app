import { useLayoutEffect, useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Image,
  Text,
  Paper,
  Button,
} from "@mantine/core";
import {
  IconStar,
  IconLogout,
  IconArrowsLeftRight,
  IconWallet,
  IconShare,
  IconAlertOctagon,
  IconFileText,
  IconHome,
} from "@tabler/icons";
import ZamodiLogo from "./../assets/Zamodi-Logo3.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useEffect } from "react";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
    link2: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.xs}px ${theme.spacing.sm}px  0px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.xs}px ${theme.spacing.sm}px  0px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    firstPartActive: {
      backgroundColor: "black",
      display: "block",
    },
    firstPart: {
      display: "none",
    },

    linkIcon: {
      ref: icon,
      color: "white",
      marginRight: theme.spacing.sm,
      "&:hover": {
        color: "white",
      },
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: "#20986e",
        color: "white",
        borderRadius: "0px 12px 12px 0px",
        [`& .${icon}`]: {
          color: "white",
        },
      },
    },
  };
});

const data = [
  { link: "/dashboard", label: "Dashboard", icon: IconHome },
  { link: "echange", label: "Faire un échange", icon: IconArrowsLeftRight },
  { link: "recharge", label: "Recharge", icon: IconWallet },
  { link: "historique", label: "Historique", icon: IconFileText },
  { link: "contact", label: "Centre d'aide", icon: IconAlertOctagon },
  { link: "partager", label: "Partager l'App", icon: IconShare },
  { link: "service", label: "Noter le service", icon: IconStar },
];

function SidebarLayout() {
  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Dashboard");
  const [DivActive, setDivActive] = useState("Dashboard");
  const location = useLocation();

  useLayoutEffect(() => {
    let tablePath = location.pathname.split("/");
    let path = ((tablePath.length>2 &&tablePath[2]!=="profile") ?tablePath[2]:'/'+tablePath[1] );
    let lien = data.filter((item) => item.link === path);
    console.log(path)
    setActive(lien[0].label);
  });

  const links = data.map((item) => (
    <div
      key={item.icon}
      style={{ display: "flex", width: "100%" }}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        setDivActive(item.label);
      }}
    >
      <span
        className={cx(classes.firstPart, {
          [classes.firstPartActive]: item.label === active,
        })}
      >
        ..
      </span>
      <div style={{ width: "100%" }}>
        {" "}
        <Link
          className={cx(classes.link, {
            [classes.linkActive]: item.label === active,
          })}
          to={item.link}
          key={item.label}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Link>
      </div>
    </div>
  ));

  const logOut = () => {
    authService.logout();
    navigate("/login");
  };
  return (
    <Navbar height={"100%"} width={"auto"} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Image src={ZamodiLogo} width={150} mt={10} />
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section>
        <Paper style={{ border: "2px solid #f7f7f7", padding: "15px" }}>
          <Text fw={"bold"} mb={10}>
            À Propos
          </Text>
          <Text fz={"xs"}>
            Avec ZAMODI, vous pouvez transférer facilement et rapidement des
            soldes entre MTN Money, Moov Money et Celtiis Cash ou acheter
            facilement du crédit d'appel ou des données internet.
          </Text>
        </Paper>
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <Button
          className={classes.link2}
          // onClick={(event) => event.preventDefault()}

          style={{
            backgroundColor: "#20986e",
            borderRadius: "12px",
            paddingLeft: "10px",
            color: "white",
          }}
          onClick={logOut}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Deconnexion</span>
        </Button>
      </Navbar.Section>
    </Navbar>
  );
}

export default SidebarLayout;
