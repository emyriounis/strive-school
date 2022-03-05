import { FormEvent, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import useWindowDimentions from "../tools/windowDimentions";

import { setRegisteredAction } from "../redux/actions/registered";
import { setCredentialsAction } from "../redux/actions/credentials";
import { LoginCredentialsType } from "../types";
import loginUser from "../api/post/loginUser";

const Login = () => {
  const { width, height } = useWindowDimentions();

  const [loginCredentials, setLoginCredentials] =
    useState<LoginCredentialsType>({
      identifier: "",
      password: "",
    });
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { identifier, password } = loginCredentials;
    try {
      const res = await loginUser({ identifier, password });

      if (res) {
        const { accessToken, refreshToken } = res;
        dispatch(setCredentialsAction({ accessToken, refreshToken }));

        setLoginCredentials({
          identifier: "",
          password: "",
        });
      }
    } catch (error: any) {
      const { text } = JSON.parse(error.message);
      setError(text);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center p-0"
      style={{ width: 0.8 * width, height }}
    >
      <Form className="w-100" onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Email or Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email or Username"
            required
            value={loginCredentials.identifier}
            onChange={(event) =>
              setLoginCredentials({
                ...loginCredentials,
                identifier: event.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={loginCredentials.password}
            onChange={(event) =>
              setLoginCredentials({
                ...loginCredentials,
                password: event.target.value,
              })
            }
          />
        </Form.Group>

        <Button
          className="me-1"
          variant="outline-secondary"
          type="button"
          onClick={() => dispatch(setRegisteredAction(false))}
        >
          Dont you have an account?
        </Button>
        <Button className="ms-1" variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
