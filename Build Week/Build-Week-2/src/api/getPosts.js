const getPosts = async () => {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/posts/",
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );
    if (response.ok) {
      const posts = await response.json();
      return posts;
    } else {
      throw new Error("Fetch error!");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default getPosts;
