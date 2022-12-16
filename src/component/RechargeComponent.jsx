import {
  ActionIcon,
  Card,
  Container,
  Menu,
  Text,
  TextInput,
  Box,
  Grid,
  Select,
  Button,
} from "@mantine/core";
import React, { useState } from "react";
import { Group } from "@mantine/core";
import { IconArrowsLeftRight, IconChevronDown } from "@tabler/icons";
import { IconArrowRight } from "@tabler/icons";
import ResumeComponent from "./ResumeComponent";

function RechargeComponent(props) {
  const [valide, setvalide] = useState(false);
  return (
    <Container size={'sm'}>
      <Grid style={{ justifyContent: "space-around" }}>
        <Grid.Col md={10}>
          <Card shadow="lg" p="lg" radius="md" withBorder>
            <Card.Section
              withBorder
              inheritPadding
              py="xs"
              className="ArrierePlan"
            >
              <Box>
                <Text fz={"sm"} weight={500} ta={"center"} c={"white"}>
                  Recharge
                </Text>
              </Box>
            </Card.Section>

            <Box mb={50}>
              <Box
                mt={15}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 30,
                  alignItems: "center",
                }}
              >
                <Box>
                  <Text fz={"md"} weight={500} my={10} className={"dh"}>
                  Type d'opération
                  </Text>
                  <Select
                    width={"100%"}
                  
                    placeholder="Opération Type"
                    rightSection={<IconChevronDown size={14} />}
                    rightSectionWidth={30}
                    styles={{ rightSection: { pointerEvents: "none" } }}
                    data={["Moov Money", "Mtn money", "Celtiis money"]}
                  />
                </Box>
                <Box>
                  <IconArrowsLeftRight size={20} color="green" />
                </Box>
                <Box>
                  <Text fz={"md"} weight={500} my={10} className={"dh"}>
                   Montant de recharge
                  </Text>
                  <Select
                  
                    placeholder="Amount"
                    rightSection={<IconChevronDown size={14} />}
                    rightSectionWidth={30}
                    styles={{ rightSection: { pointerEvents: "none" } }}
                    data={["Moov Money", "Mtn money", "Celtiis money"]}
                  />
                </Box>
              </Box>

              <Box
                mt={15}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 30,
                  alignItems: "center",
                }}
              >
                <Box>
                  <Text fz={"md"} weight={500} my={10} className={"dh"}>
                    J'ai
                  </Text>
                  <Select
                    width={"100%"}
                  
                    placeholder="I get"
                    rightSection={<IconChevronDown size={14} />}
                    rightSectionWidth={30}
                    styles={{ rightSection: { pointerEvents: "none" } }}
                    data={["Moov Money", "Mtn money", "Celtiis money"]}
                  />
                </Box>
                <Box>
                  <IconArrowsLeftRight size={20} color="green" />
                </Box>
                <Box>
                  <Text fz={"md"} weight={500} my={10} className={"dh"}>
                    Je veux
                  </Text>
                  <Select
                  
                    placeholder="I want"
                    rightSection={<IconChevronDown size={14} />}
                    rightSectionWidth={30}
                    styles={{ rightSection: { pointerEvents: "none" } }}
                    data={["Moov Money", "Mtn money", "Celtiis money"]}
                  />
                </Box>
              </Box>

              <Box
                mt={15}
                mb={30}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 30,
                  alignItems: "center",
                }}
              >
                <Box>
                  <Text fz={"md"} weight={500} my={10} className={"dh"}>
                    Le numéro :
                  </Text>
                  <TextInput
                  
                    placeholder="Votre numéro"
                    withAsterisk
                    className={"ombre"}
                  />
                </Box>
                <Box></Box>
                <Box>
                  <Text fz={"md"} weight={500} my={10} className={"dh"}>
                    Confirmé le numéro :
                  </Text>
                  <TextInput
                  
                    placeholder="Confirmer numéro"
                    withAsterisk
                    className={"ombre"}
                  />
                </Box>
              </Box>

              <Box
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                <Button
                
                  mr={"sm"}
                  className={"ArrierePlan"}
                  onClick={() => {
                    console.log(valide);
                    setvalide(!valide);
                  }}
                >
                  Valider <IconArrowRight size={14} mx={3} />{" "}
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default RechargeComponent;
