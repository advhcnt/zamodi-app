import { createStyles, Container, Title, Text, Button, Group } from '@mantine/core';
import { Illustration } from './illustrations/_503Illustration';


const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 120,
    paddingBottom: 120,
    top:0,
    right:0,
    left:0,
    position: 'absolute',
    // display: 'flex',
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
  },

  inner: {
    position: 'relative',
  },

  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 0,
    opacity: 0.65,
  },

  content: {
    paddingTop: 220,
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,
    color: theme.white,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 460,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][1],
  },
}));

function ServerOverload() {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.inner}>
          <Illustration className={classes.image} />
          <div className={classes.content}>
            <Title className={classes.title}>Tous nos serveurs sont occupés</Title>
            <Text size="lg" align="center" className={classes.description}>
            Nous ne pouvons pas traiter votre demande en ce moment, s’il vous plaît attendre quelques minutes et
              actualiser la page. Notre équipe travaille déjà sur cette question.
            </Text>
            <Group position="center">
              <Button size="md" variant="white" onClick={()=>window.location.reload() } >
              Actualiser la page
              </Button>
            </Group>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ServerOverload;