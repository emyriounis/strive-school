const postData = async () => {
  try {
    const request = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyOGVjZmFhY2FhMjAwMTU1MmExN2MiLCJpYXQiOjE2MzU5NDYxOTEsImV4cCI6MTYzNzE1NTc5MX0.Nlyj9HHBZ_rBlsOlnyfINlvAPFFeHyVqunKdfoHSoL0",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          brand: document.getElementById("brand").value,
          description: document.getElementById("description").value,
          imageUrl: document.getElementById("imageUrl").value,
          name: document.getElementById("name").value,
          price: document.getElementById("price").value,
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

const handleSubmit = async (event) => {
  try {
    event.preventDefault();
    await postData();
    alert("success");
  } catch (error) {
    alert(error);
  }
};
