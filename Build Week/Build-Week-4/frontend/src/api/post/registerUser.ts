import { RegisterInfoType } from "../../types";

const registerUser = async (registerInfo: RegisterInfoType) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/account`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(registerInfo),
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

export default registerUser;
