const searchUsers = async (token: string, query: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users?search=${query}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export default searchUsers;
