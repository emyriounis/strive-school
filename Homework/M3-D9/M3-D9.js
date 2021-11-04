const getData = async () => {
  try {
    const responce = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyOGVjZmFhY2FhMjAwMTU1MmExN2MiLCJpYXQiOjE2MzU5NDYxOTEsImV4cCI6MTYzNzE1NTc5MX0.Nlyj9HHBZ_rBlsOlnyfINlvAPFFeHyVqunKdfoHSoL0",
        },
      }
    );
    if (!responce.ok) {
      throw new Error("fail to fetch");
    }
    return responce.json();
  } catch (error) {
    throw new Error(error);
  }
};

window.onload = async () => {
  try {
    const data = await getData();
    console.log(data);
    document.querySelector("tbody").innerHTML = data
      .map(
        (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.description}</td>
          <td>${item.brand}</td>
          <td>
            <img
              src="${item.imageUrl}"
              alt="image"
              width="50px"
            />
          </td>
          <td>${item.price}</td>
          <td>
            <a href="./product/product.html?p=${item._id}">View Details</a>
          </td>
        </tr>`
      )
      .join("");
    document.getElementById("spinner").classList.add("d-none");
    document.querySelector("table").classList.remove("d-none");
  } catch (error) {
    alert(error);
  }
};
