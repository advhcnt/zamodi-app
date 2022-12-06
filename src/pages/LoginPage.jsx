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
  Grid,
  Box,
  SimpleGrid,
} from "@mantine/core";

import { Link } from "react-router-dom";

function LoginPage(props) {
  const [type, toggle] = useToggle(["login", "register"]);
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
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  return (
    <div>
      <Grid>
        <Grid.Col md={6} order={2} orderMd={1} style={{
            display: "flex",
            alignItems: "center",
            justifyContent:'center',
            justifyItems:'center',
            height:'100vh'
          }}>
          <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" weight={500} ta={"center"}>
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
                    variant={"filled"}
                    placeholder="Your name"
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
                  variant={"filled"}
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
                  variant={"filled"}
                  value={form.values.password}
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
                  <Link to={"/register"}>
                    {type === "register"
                      ? "Already have an account? Login"
                      : "Don't have an account? Register"}
                  </Link>
                </Anchor>
                <Button type="submit">{upperFirst(type)}</Button>
              </Group>
            </form>
          </Paper>
        </Grid.Col>
        <Grid.Col
          md={6}
          order={1}
          orderMd={2}
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: " 115px 0px 0px 115px ",
            border: "1px solid black",
          }}
        >
          <Box>
            {" "}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos sed
            blanditiis sint. Odio, magni vero minus blanditiis cupiditate nisi
            quas omnis a id vel quo voluptates expedita sapiente tenetur soluta
            facere sunt placeat nemo at accusamus aliquid sed vitae. Debitis.
          </Box>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default LoginPage;
