export const movies = async (query) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query
        .split(" ")
        .join("%20")}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    } else {
      const movies = await response.json();
      return movies;
    }
  } catch (error) {
    throw new Error(error);
  }
};
