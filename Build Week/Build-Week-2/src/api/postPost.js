const postPost = async (postData) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/posts/`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(postData),
      }
    );
    console.log(response);
    if (response.ok) {
      const postedPost = await response.json();
      return postedPost;
    } else {
      throw new Error("Fetch error!");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default postPost;
