const singleChat = async (token: string, _id: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/chats/${_id}`,
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

export default singleChat;
