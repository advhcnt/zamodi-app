import {
  ActionIcon,
  createStyles,
  Menu,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { IconDotsVertical, IconEdit, IconLock, IconTrash } from "@tabler/icons";
import React, { useState } from "react";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

function Recharge(props) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  return (
    <ScrollArea
      sx={{ height: 300 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Text variant={"title"} fz={"xl"} fw={900} my={10}>
        Liste des recharges clients
      </Text>
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Operation</th>
            <th>Identifiant</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr key="row.namfge">
            <td>adv</td>
            <td>advhcnt23@gmail.com</td>
            <td>Echange</td>
            <td>123456789</td>
            <td>
              <span className={"attente"}>En attente</span>
            </td>
            <td>2/12/2022</td>
            <td>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon>
                    <IconDotsVertical size={16} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item icon={<IconEdit size={14} />}>Modifier</Menu.Item>
                  <Menu.Item icon={<IconLock size={14} />}>Blocker</Menu.Item>
                  <Menu.Item icon={<IconTrash size={14} />} color="red">
                    Supprimer
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </td>
          </tr>
          <tr key="row.nameszx">
            <td>anne</td>
            <td>anne@gmail.com</td>
            <td>Echange</td>
            <td>123456489</td>
            <td>
              <span className={"valide"}>Validé</span>
            </td>
            <td>2/01/2022</td>
            <td>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon>
                    <IconDotsVertical size={16} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item icon={<IconEdit size={14} />}>Modifier</Menu.Item>
                  <Menu.Item icon={<IconLock size={14} />}>Blocker</Menu.Item>
                  <Menu.Item icon={<IconTrash size={14} />} color="red">
                    Supprimer
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </td>
          </tr>
          <tr key="row.namescx">
            <td>yves</td>
            <td>yves@gmail.com</td>
            <td>Echange</td>
            <td>123456189</td>
            <td>
              <span className={"annule"}>Annulée</span>
            </td>
            <td>2/01/2022</td>
            <td>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon>
                    <IconDotsVertical size={16} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item icon={<IconEdit size={14} />}>Modifier</Menu.Item>
                  <Menu.Item icon={<IconLock size={14} />}>Blocker</Menu.Item>
                  <Menu.Item icon={<IconTrash size={14} />} color="red">
                    Supprimer
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </td>
          </tr>
        </tbody>
      </Table>
    </ScrollArea>
  );
}

export default Recharge;
