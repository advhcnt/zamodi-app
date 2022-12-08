import { useState } from "react";
import { createStyles, Navbar, Group, Code, Image } from "@mantine/core";
import {
 
  IconStar,
  IconSwitchHorizontal,
  IconLogout,
  IconArrowsLeftRight,
  IconWallet,
  IconShare,
  IconAlertOctagon,
  IconFileText,
  IconHome,
} from "@tabler/icons";
import  ZamodiLogo  from "./../assets/Zamodi-Logo.png";
import { Link } from "react-router-dom";

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
      display:'block',
    },
    firstPart: {
      display: "none",
    },

    linkIcon: {
      ref: icon,
      color: "black",
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: "green",
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
  { link: "", label: "Dashboard", icon: IconHome },
  { link: "", label: "Faire un échange", icon: IconArrowsLeftRight },
  { link: "", label: "Recharge", icon: IconWallet },
  { link: "", label: "Historique", icon: IconFileText },
  { link: "", label: "Créer un ticket", icon: IconAlertOctagon },
  { link: "", label: "Partager l'application", icon: IconShare },
  { link: "", label: "Noter le service", icon: IconStar },
];


function SidebarLayout() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Dashboard");
  const [DivActive, setDivActive] = useState("Dashboard");

  const links = data.map((item) => (
    <div
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
        <a
          className={cx(classes.link, {
            [classes.linkActive]: item.label === active,
          })}
          href={item.link}
          key={item.label}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </a>
      </div>
    </div>
  ));

  return (
    <Navbar height={"100%"} width={"auto"} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Image src={ZamodiLogo} size={28} />
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link
          to="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </Link>

        <Link
          to="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </Navbar.Section>
    </Navbar>
  );
}

export default SidebarLayout;
