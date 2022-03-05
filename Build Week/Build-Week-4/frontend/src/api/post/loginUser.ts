import { LoginCredentialsType } from "../../types";

const loginUser = async (credentials: LoginCredentialsType) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/session`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(credentials),
    }
  );

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(
      JSON.stringify({ text: await response.text(), status: response.status })
    );
  }
};

export default loginUser;
