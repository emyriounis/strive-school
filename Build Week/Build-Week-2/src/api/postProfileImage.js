export const postProfileImage = async (profileID, formData) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${profileID}/picture`,
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
      const profileImage = await response.json();
      return profileImage;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
