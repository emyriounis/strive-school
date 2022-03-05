import { FormEvent, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import registerUser from "../api/post/registerUser";
import useWindowDimentions from "../tools/windowDimentions";
import { setCredentialsAction } from "../redux/actions/credentials";
import { setRegisteredAction } from "../redux/actions/registered";
import { RegisterInfoType } from "../types";

const Register = () => {
  const { width, height } = useWindowDimentions();

  const [registerInfo, setRegisterInfo] = useState<RegisterInfoType>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      registerInfo.password.length >= 8 &&
      registerInfo.password === registerInfo.confirmPassword
    ) {
      const { email, username, password } = registerInfo;
      try {
        const res = await registerUser({ email, username, password });

        if (res) {
          const { accessToken, refreshToken } = res;
          dispatch(setCredentialsAction({ accessToken, refreshToken }));

          setRegisterInfo({
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          });
        }
      } catch (error: any) {
        const { text } = JSON.parse(error?.message);
        setError(text);
      }
    } else {
      setError("Passwords doesn't much");
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
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            required
            value={registerInfo.email}
            onChange={(event) =>
              setRegisterInfo({
                ...registerInfo,
                email: event.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            required
            value={registerInfo.username}
            onChange={(event) =>
              setRegisterInfo({
                ...registerInfo,
                username: event.target.value,
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
            value={registerInfo.password}
            onChange={(event) =>
              setRegisterInfo({
                ...registerInfo,
                password: event.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={registerInfo.confirmPassword}
            onChange={(event) =>
              setRegisterInfo({
                ...registerInfo,
                confirmPassword: event.target.value,
              })
            }
          />
        </Form.Group>

        <Button
          className="me-1"
          variant="outline-secondary"
          type="button"
          onClick={() => dispatch(setRegisteredAction(true))}
        >
          Already have an account?
        </Button>
        <Button className="ms-1" variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
