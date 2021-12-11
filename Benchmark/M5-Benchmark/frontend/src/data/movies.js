export const movies = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/media`);
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
