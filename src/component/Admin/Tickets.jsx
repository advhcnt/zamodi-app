import {
  ActionIcon,
  Box,
  Button,
  createStyles,
  Group,
  Menu,
  Modal,
  Paper,
  ScrollArea,
  Select,
  Table,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconDotsVertical, IconEdit, IconLock, IconTrash } from "@tabler/icons";
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

function Tickets(props) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [opened, { close, open }] = useDisclosure(false);
  const theme = useMantineTheme();
  const handleChange = () => {
    close();
  };

  return (
    <>
      <ScrollArea
        sx={{ height: 300 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Text variant={"title"} fz={"xl"} fw={900} my={10}>
          Liste des tickets
        </Text>
        <Table sx={{ minWidth: 700 }}
          striped
          highlightOnHover
          withBorder
          withColumnBorders
          horizontalSpacing="md"
          verticalSpacing="md"
          fontSize="md"
        >

          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr>
              <th>Numero</th>
              <th>Username</th>
              <th>Email</th>
              <th>Sujet</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr key="row.namfge">
              <td>2313</td>
              <td>adv</td>
              <td>advhcnt23@gmail.com</td>
              <td>question</td>
              <td>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, fuga!
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
                    <Menu.Item icon={<IconEdit size={14} />} onClick={open} >Répondre</Menu.Item>
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


      <Modal
        centered
        closeOnClickOutside={false}
        withCloseButton={true}
        opened={opened}
        onClose={close}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <div>
          <div style={{ marginBottom: theme.spacing.sm }}>
            <h2>Répondre au ticket </h2>
          </div>
          <Box>
            <Paper withBorder shadow={'xl'} p={'md'} >
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                tenetur provident labore corporis
                asperiores aspernatur ea natus ut doloremque voluptatibus?
              </Text>
            </Paper>

            <TextInput placeholder="Sujet" required label={'Sujet'} />

            <Textarea
              my={15}
              label="Message "
              autosize
              minRows={2}
              maxRows={4}
              required
            />

            <Group position={"center"} my={20} onClick={handleChange}>
              <Button>Répondre</Button>
            </Group>
          </Box>
        </div>
      </Modal>
    </>
  );
}

export default Tickets;
