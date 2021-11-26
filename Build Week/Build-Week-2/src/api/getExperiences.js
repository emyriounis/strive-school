export const getExperiences = async (profileID) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${profileID}/experiences/`,
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
      const experiences = await response.json();
      return experiences;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
