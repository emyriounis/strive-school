export const putExperience = async (profileID, experienceID, data) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${ profileID }/experiences/${ experienceID }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${ process.env.REACT_APP_TOKEN }`,
        },
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    } else {
      const updatedExperience = await response.json();
      return updatedExperience;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
