const logoutUser = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users/session`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        JSON.stringify({ text: await response.text(), status: response.status })
      );
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export default logoutUser;
