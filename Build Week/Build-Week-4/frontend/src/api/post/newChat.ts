const newChat = async (token: string, _id: string) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/chats`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({ recipient: _id }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(
      JSON.stringify({ text: await response.text(), status: response.status })
    );
  }
};

export default newChat;
