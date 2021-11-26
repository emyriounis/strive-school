import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const Registration = () => {
  const [required, setRequired] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fullfield, setFullfield] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const passwordEmail = (password) => {
    if (password.length < 8) return false; //password length
    if (!/\d/.test(password)) return false; //number
    if (!/[a-zA-z]/.test(password)) return false; //char
    return true;
  };

  useEffect(() => {
    setRequired({
      name: data.name.length >= 2,
      surname: data.surname.length >= 3,
      email: validateEmail(data.email),
      password: passwordEmail(data.password),
      confirmPassword: data.confirmPassword
        ? data.confirmPassword === data.password
        : false,
    });
  }, [data]);

  useEffect(() => {
    setFullfield(
      required.name &&
        required.surname &&
        required.email &&
        required.password &&
        required.confirmPassword
    );
  }, [required]);

  return (
    <>
      {submitted ? (
        <ul className="m-5">
          {Object.keys(data).map((item) => (
            <li>
              {item}: {data[item]}
            </li>
          ))}
        </ul>
      ) : (
        <Form className="m-5">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="name"
              isValid={required.name}
              isInvalid={data.name && !required.name}
              onChange={(event) =>
                setData({ ...data, name: event.target.value })
              }
            />
            {data.name && !required.name && (
              <Form.Text className="text-muted">
                Required, at least 2 chars
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="surname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              placeholder="surname"
              isValid={required.surname}
              isInvalid={data.surname && !required.surname}
              onChange={(event) =>
                setData({ ...data, surname: event.target.value })
              }
            />
            {data.surname && !required.surname && (
              <Form.Text className="text-muted">
                Required, at least 3 chars
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              isValid={required.email}
              isInvalid={data.email && !required.email}
              onChange={(event) =>
                setData({ ...data, email: event.target.value })
              }
            />
            {data.email && !required.email && (
              <Form.Text className="text-muted">
                Required - Should be an email
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              isValid={required.password}
              isInvalid={data.password && !required.password}
              onChange={(event) =>
                setData({ ...data, password: event.target.value })
              }
            />
            {data.password && !required.password && (
              <Form.Text className="text-muted">
                Required - Should contain at least 8 chars, 1 digit, 1 letter
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="confirmPassword"
              isValid={required.confirmPassword}
              isInvalid={data.confirmPassword && !required.confirmPassword}
              onChange={(event) =>
                setData({ ...data, confirmPassword: event.target.value })
              }
            />
            {data.confirmPassword && !required.confirmPassword && (
              <Form.Text className="text-muted">
                Required - Should have the same value as Password
              </Form.Text>
            )}
          </Form.Group>

          <Button
            variant="primary"
            type="button"
            disabled={!fullfield}
            onClick={() => setSubmitted(true)}
          >
            Submit
          </Button>
        </Form>
      )}
    </>
  );
};

export default Registration;
