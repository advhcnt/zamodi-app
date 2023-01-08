import { Button, Modal, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function UpdatedModal({affiche}) {
  const [opened, { close, open }] = useDisclosure(true);
  const theme = useMantineTheme();

  if(affiche)
  {
    document.getElementById('openModal').click();
  }

  return (
    <>
      <Button onClick={open} hidden id="openModal" >Open modal</Button>

      <Modal
        centered
        closeOnClickOutside={false}
        withCloseButton={false}
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
        <div style={{ padding: theme.spacing.xl * 2 }}>
          <div style={{ marginBottom: theme.spacing.xl }}>
            <h2>Modal title</h2>
          </div>
        </div>
      </Modal>
    </>
  );
}
