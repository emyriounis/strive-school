const refreshTokens = async (refreshToken: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/session/refresh`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
      method: "POST",
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

export default refreshTokens;
