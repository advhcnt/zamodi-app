import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  SimpleGrid,
  Box,
} from "@mantine/core";
import { Link } from "react-router-dom";

function RegisterPage(props) {
  const [type, toggle] = useToggle(["register","login"]);
  
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 8
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  return (
    <div
      style={{
        height:"100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
     
        <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>

          <Box>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque saepe fugit nihil temporibus ab quidem tenetur quasi molestias illo iusto dolorem totam rem qui architecto ipsa, quaerat soluta sint eum, expedita tempora!
          </Box>

          <Box>
            <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" weight={500} ta={'center'}>
              Welcome to ZAMODI, {type} with
            </Text>


            <Divider
              label="Or continue with email"
              labelPosition="center"
              my="lg"
            />

            <form onSubmit={form.onSubmit(() => {})}>
              <Stack>
                {type === "register" && (
                  <TextInput
                    label="Name"
                    placeholder="Your name"
                    variant={'filled'}
                    value={form.values.name}
                    onChange={(event) =>
                      form.setFieldValue("name", event.currentTarget.value)
                    }
                  />
                )}

                <TextInput
                  required
                  label="Email"
                  placeholder="hello@mantine.dev"
                  variant={'filled'}
                  value={form.values.email}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  error={form.errors.email && "Invalid email"}
                />

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  variant={'filled'}
                  onChange={(event) =>
                    form.setFieldValue("password", event.currentTarget.value)
                  }
                  error={
                    form.errors.password &&
                    "Password should include at least 6 characters"
                  }
                />

                {type === "register" && (
                  <Checkbox
                    label="I accept terms and conditions"
                    checked={form.values.terms}
                    onChange={(event) =>
                      form.setFieldValue("terms", event.currentTarget.checked)
                    }
                  />
                )}
              </Stack>

              <Group position="apart" mt="xl">
                <Anchor
                  component="button"
                  type="button"
                  color="dimmed"
                  onClick={() => toggle()}
                  size="xs"
                >
                  <Link to={"/login"}>
                  {type === "register"
                    ? "Already have an account? Login"
                    : "Don't have an account? Register"}
                    </Link>
                </Anchor>
                <Button type="submit">{upperFirst(type)}</Button>
              </Group>
            </form>
          </Paper>
        
          </Box>
          
      </SimpleGrid>
    </div>
  );
}

export default RegisterPage;
