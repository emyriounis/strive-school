export const postExperienceImage = async (
  profileID,
  experienceID,
  formData
) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${profileID}/experiences/${experienceID}/picture`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
        method: "POST",
        body: formData,
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    } else {
      const experienceImage = await response.json();
      return experienceImage;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
