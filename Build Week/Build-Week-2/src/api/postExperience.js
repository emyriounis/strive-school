export const postExperience = async (profileID, data) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${profileID}/experiences`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    } else {
      const postedExperience = await response.json();
      return postedExperience;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
