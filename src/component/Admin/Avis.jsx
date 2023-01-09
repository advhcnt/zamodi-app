import {
  ActionIcon,
  Box,
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
      borderBottom: `1px solid ${theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
        }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

function Avis(props) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  return (
    <Box>
      <Text variant={"title"} fz={"xl"} fw={900} my={10}>
        Liste des Avis clients
      </Text>
      <ScrollArea
        sx={{ height: 300 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ minWidth: 700 }}
          striped
          highlightOnHover
          withBorder
          withColumnBorders
          horizontalSpacing="md"
          verticalSpacing="md"
          fontSize="md"
        >
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Note</th>
              <th>Message</th>
              <th>Dates</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr key="row.namfge">
              <td>adv</td>
              <td>advhcnt23@gmail.com</td>
              <td>5</td>
              <td>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus commodi odit debitis voluptas illum ut?
                </p>
              </td>
              <td>12/12/2022</td>
              <td>
                <Menu withinPortal position="bottom-end" shadow="sm">
                  <Menu.Target>
                    <ActionIcon>
                      <IconDotsVertical size={16} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item icon={<IconEdit size={14} />}>
                      Modifier
                    </Menu.Item>
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
    </Box>
  );
}

export default Avis;
