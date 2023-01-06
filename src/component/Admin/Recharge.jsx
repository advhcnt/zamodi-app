import {
    ActionIcon,
    createStyles,
    Menu,
    ScrollArea,
    Table,
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
              <td>"row.name"</td>
              <td>"row.email"</td>
              <td>"row.company"</td>
              <td>"row.IDENTIFIANT"</td>
              <td>"row.status"</td>
              <td>"row.date"</td>
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
              <td>"row.name"</td>
              <td>"row.email"</td>
              <td>"row.company"</td>
              <td>"row.IDENTIFIANT"</td>
              <td>"row.status"</td>
              <td>"row.date"</td>
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
            <tr key="row.namfde">
              <td>"row.name"</td>
              <td>"row.email"</td>
              <td>"row.company"</td>
              <td>"row.IDENTIFIANT"</td>
              <td>"row.status"</td>
              <td>"row.date"</td>
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
            <tr key="row.namdcfde">
              <td>"row.name"</td>
              <td>"row.email"</td>
              <td>"row.company"</td>
              <td>"row.IDENTIFIANT"</td>
              <td>"row.status"</td>
              <td>"row.date"</td>
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
  