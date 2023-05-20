import {
  Container,
  Text,
  Box,
  TextInput,
  Button,
  Group,
  Divider,
  Alert,
} from "@mantine/core";
import React from "react";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { IconAlertCircle } from "@tabler/icons";
import FacebookShare from "../ShareButtons/FacebookShare";
import WhatsappShare from "../ShareButtons/WhatsappShare";
import TwitterShare from "../ShareButtons/TwitterShare";

function PartagerComponent(props) {
  const [valeur, setValeur] = useState("https://app.zamodi.com/register");
  const [copyText, setCopyText] = useState(false);

  const copyToClipboard = () => {
    copy(valeur);
    setCopyText(true);

    setTimeout(() => {
      setCopyText(false);
    }, 500);
  };
  return (
    <Container size="sm">
      <Text fz={"md"} fw={"bold"}>
        Partager l'application
      </Text>

      <Text fz={"sm"} c={"dimmed"} my={30}>
        Partagez l'expérience ZAMODI avec vos proches ! Avec ses fonctionnalités
        innovantes et faciles à utiliser, ZAMODI est l'application idéale pour
        améliorer votre quotidien. Invitez vos amis et votre famille à rejoindre
        le mouvement et découvrez ensemble tout ce que ZAMODI peut offrir.
        Faites connaître ZAMODI à ceux que vous aimez et profitez ensemble d'une
        gestion plus aisée de votre Mobile Money !
      </Text>

      <Box>
        <Text fz={"md"} mb={10}>
          Lien
        </Text>
        <TextInput
          value={valeur}
          readOnly
          rightSection={
            <Button className={"ArrierePlan"} onClick={copyToClipboard}>
              Copier
            </Button>
          }
        />
        {copyText && (
          <Alert
            mt={30}
            withCloseButton
            icon={<IconAlertCircle size={16} />}
            ta={"center"}
            color="#20986e"
            size={"xs"}
          >
            Texte copié avec succès
          </Alert>
        )}
      </Box>
      <Divider my={30} />
      <Text mb={20}>Partager sur les réseaux</Text>
      <Group>
        <WhatsappShare />

        <TwitterShare />
        
        <FacebookShare />
      </Group>
    </Container>
  );
}

export default PartagerComponent;
