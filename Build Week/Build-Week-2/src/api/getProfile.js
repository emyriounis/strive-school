export const getProfile = async (id) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    } else {
      const profile = await response.json();
      return profile;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
