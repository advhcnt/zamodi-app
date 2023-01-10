import { useState } from "react";
import { createStyles, Navbar, Group, Code, Image, Card, Text, Paper, Button } from "@mantine/core";
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
import ZamodiLogo from "./../assets/Zamodi-Logo.png";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2]
        }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === "dark"
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
      display: 'block',
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
      }
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
  { link: "/admin", label: "Dashboard", icon: IconHome },
  { link: "operations", label: "Operations", icon: IconArrowsLeftRight },
  { link: "historique", label: "Historique", icon: IconFileText },
  { link: "contact", label: "Tickets Clients", icon: IconAlertOctagon },
  { link: "avis", label: "Avis clients", icon: IconStar },
];

function SidebarAdminLayout() {
  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Dashboard");
  const [DivActive, setDivActive] = useState("Dashboard");

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
          <Image src={ZamodiLogo} size={28} />
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section >
        <Paper style={{ border: '2px solid #f7f7f7',padding:'15px' }}>
          <Text ta="center" fw={'bold'}>À Propos</Text>
          <Text fz={'xs'} >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor
          </Text>
        </Paper>
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>


        <Button
        
          className={classes.link2}
          // onClick={(event) => event.preventDefault()}

          style={{ backgroundColor: '#20986e', borderRadius: '12px', paddingLeft: '10px', color: "white" }}
        onClick={logOut}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Deconnexion</span>
        </Button>
      </Navbar.Section>
    </Navbar>
  );
}

export default SidebarAdminLayout;
