export const getProfileMe = async (id) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/me`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    } else {
      const profileMe = await response.json();
      return profileMe;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
