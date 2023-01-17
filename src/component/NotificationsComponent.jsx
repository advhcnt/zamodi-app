import { createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    marginBlock: 20,
    '&:hover': {
      cursor: 'pointer'
    }
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0,
    },
  },
}));

const data = {
  "postedAt": "10 minutes ago",
  "body": "<p>  pretium fusce id velit ut. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus a. </p>",
  "author": {
    "name": "Zamodi Team",
    //   "image": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
  }
}

export function Notifications({ element,afficheOperation }) {

  const { postedAt, body, author } = data;
  const { classes } = useStyles();
  const navigate = useNavigate()
  return (
    <Paper withBorder radius="md" className={classes.comment} onClick={afficheOperation} >
      <Group>
        <Avatar src={author.image} alt={author.name} radius="xl" />
        <div>
          <Text size="sm">{author.name}</Text>
          <Text size="xs" color={element.statut === 'Valide' ? 'green' : 'red'}>
            {element.statut}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content} dangerouslySetInnerHTML={{ __html: element.notification }} />
      </TypographyStylesProvider>
    </Paper>
  );
}