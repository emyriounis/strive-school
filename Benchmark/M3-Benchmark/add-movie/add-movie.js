const postData = async () => {
  try {
    const request = await fetch(
      "https://striveschool-api.herokuapp.com/api/movies/",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyOGVjZmFhY2FhMjAwMTU1MmExN2MiLCJpYXQiOjE2MzU5NDYxOTEsImV4cCI6MTYzNzE1NTc5MX0.Nlyj9HHBZ_rBlsOlnyfINlvAPFFeHyVqunKdfoHSoL0",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          category: document.getElementById("category").value,
          description: document.getElementById("description").value,
          imageUrl: document.getElementById("imageUrl").value,
          name: document.getElementById("name").value,
        }),
      }
    );
    if (!request.ok) {
      throw new Error("fail to fetch");
    } else {
      const requestResult = await request.json();
      return requestResult;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const reset = () => {
  try {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
    document.getElementById("imageUrl").value = "";
  } catch (error) {
    alertFunc("danger", error);
  }
};

const handleSubmit = async (event) => {
  try {
    event.preventDefault();
    await postData();
    alertFunc("success", "Movie added successfully");
    setTimeout(() => reset(), 3000);
  } catch (error) {
    alertFunc("danger", error);
  }
};

const alertFunc = (type, message) => {
  document.getElementById(
    "alert"
  ).innerHTML = `<div class="alert alert-${type}" role="alert">
      ${message}
    </div>`;
  setTimeout(() => {
    document.getElementById("alert").innerHTML = ``;
  }, 3000);
};
