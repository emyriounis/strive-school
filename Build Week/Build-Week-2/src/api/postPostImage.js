export const postPostImage = async (postID, formData) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/posts/${postID}`,
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
      const postImage = await response.json();
      return postImage;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
