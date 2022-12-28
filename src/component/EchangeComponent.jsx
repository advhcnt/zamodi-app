import {
  Card,
  Container,
  Text,
  TextInput,
  Box,
  Grid,
  Select,
  Button,
  Notification,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IconArrowsLeftRight, IconChevronDown, IconX } from "@tabler/icons";
import { IconArrowRight } from "@tabler/icons";
import ResumeComponent from "./ResumeComponent";
import operation from './../services/operations.service'
import authService from "../services/authService";


function EchangeComponent(props) {
  const currentUser = authService.getCurrentUser();
  const [operations, setOperation] = useState({})
  const [montant, setMontant] = useState('')
  const [jai, setjai] = useState('')
  const [jeveux, setjeveux] = useState('')
  const [numero, setnumero] = useState('')
  const [numeroConfirm, setnumeroConfirm] = useState('')
  const [valide, setvalide] = useState(false);
  const [error, seterror] = useState({
    statut: false,
    message: ''
  });

  useEffect(() => {

    setOperation(operation.getUserOperation(currentUser.message._id))
    console.log(operations)

  }, [])

  const handleEchange = () => {
    let phoneNumberRegex = /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/;
    let amountRegex = /^\d+(\.\d{2})?$/;

    if (montant && jai && jeveux && numero && numeroConfirm) {

      if (numero === numeroConfirm) {

        if (jeveux !== jai) {

          if (amountRegex.test(montant)) {
            seterror(false,'');
            setvalide(true)

          }
          else {
            seterror({ statut:true, message:'Veillez entrer un montant correct'})
          }
        }
        else{
          seterror({ statut:true, message:'Vous ne pouvez pas à la fois avoir et vouloir la même chose'})
        }
      }
      else{
        seterror({ statut:true, message:'Veillez entrer un numéro correct'})
      }
    }
    else{
      seterror({ statut:true, message:'Veillez remplir les champs'})
    }
  }

  return (
    <Container size={'sm'}>
      {!valide && (
        <Grid style={{ justifyContent: "space-around" }}>
          <Grid.Col md={10}>
            {error.statut &&
              (<Notification icon={<IconX size={18} />} color="red" onClick={()=>seterror(false,'')}>
                {error.message}
              </Notification>
              )}
            <Card shadow="lg" p="lg" radius="md" withBorder>
              <Card.Section
                withBorder
                inheritPadding
                py="xs"
                className="ArrierePlan"
              >
                <Box>
                  <Text fz={"sm"} weight={500} ta={"center"} c={"white"}>
                    Faire un échange
                  </Text>
                </Box>
              </Card.Section>

              <Box mb={50}>
                <Grid>
                  <Grid.Col md={4} mt={30}>
                    <Text fz={"md"} weight={500} my={10} className={"dh"}>
                      Montant de recharge
                    </Text>
                    <TextInput

                      placeholder="Your name"
                      withAsterisk
                      className={"ombre"}
                      width={"100%"}
                      value={montant}
                      onChange={(event) => setMontant(event.target.value)}
                      type={'number'}
                    />
                  </Grid.Col>
                </Grid>

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
                      fullWidth

                      placeholder="Pick one"
                      rightSection={<IconChevronDown size={14} />}
                      rightSectionWidth={30}
                      styles={{ rightSection: { pointerEvents: "none" } }}
                      data={["Moov Money", "Mtn money", "Celtiis money"]}
                      onChange={setjai}
                      defaultValue={jai}
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

                      placeholder="Pick one"
                      rightSection={<IconChevronDown size={14} />}
                      rightSectionWidth={30}
                      styles={{ rightSection: { pointerEvents: "none" } }}
                      data={["Moov Money", "Mtn money", "Celtiis money"]}
                      onChange={setjeveux}
                      defaultValue={jeveux}
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
                      onChange={(event) => setnumero(event.target.value)}
                      value={numero}
                      type={'tel'}
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
                      onChange={(event) => setnumeroConfirm(event.target.value)}
                      value={numeroConfirm}
                      type={'tel'}
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

                    mr={"lg"}
                    className={"ArrierePlan"}
                    onClick={handleEchange}
                  >

                    Valider <IconArrowRight size={20} mx={3} />{" "}
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid.Col>
        </Grid>
      )}

      {valide && <ResumeComponent setValide={setvalide} numero={numero} jai={jai} jeveux={jeveux} montant={montant} />}
    </Container>
  );
}

export default EchangeComponent;
