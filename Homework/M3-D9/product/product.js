const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const getData = async () => {
  try {
    const responce = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${params.p}`,
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

const updateData = async () => {
  try {
    const request = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${params.p}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyOGVjZmFhY2FhMjAwMTU1MmExN2MiLCJpYXQiOjE2MzU5NDYxOTEsImV4cCI6MTYzNzE1NTc5MX0.Nlyj9HHBZ_rBlsOlnyfINlvAPFFeHyVqunKdfoHSoL0",
          "Content-Type": "application/json",
        },
        method: "PUT",
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
    throw new Error(error);
  }
};

const deleteData = async () => {
  try {
    const request = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${params.p}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyOGVjZmFhY2FhMjAwMTU1MmExN2MiLCJpYXQiOjE2MzU5NDYxOTEsImV4cCI6MTYzNzE1NTc5MX0.Nlyj9HHBZ_rBlsOlnyfINlvAPFFeHyVqunKdfoHSoL0",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );
    if (!request.ok) {
      throw new Error("fail to fetch");
    } else {
      const requestResult = await request.json();
      return requestResult;
    }
  } catch (error) {
    throw new Error(error);
  }
};

window.onload = async () => {
  try {
    const data = await getData();
    const { name, description, brand, imageUrl, price, _id } = data;
    document.getElementById("name").value = name;
    document.getElementById("description").value = description;
    document.getElementById("brand").value = brand;
    document.getElementById("imageUrl").value = imageUrl;
    document.getElementById("price").value = price;

    document.getElementById("spinner").classList.add("d-none");
    document.querySelector("form").classList.remove("d-none");
    document.getElementById("buttons").classList.remove("d-none");
  } catch (error) {
    alertFunc("danger", error);
  }
};

const reset = () => {
  try {
    document.getElementById("spinnerReset").classList.remove("d-none");

    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("imageUrl").value = "";
    document.getElementById("price").value = null;

    document.getElementById("spinnerReset").classList.add("d-none");
    alertFunc("success", "Reset was successful");
  } catch (error) {
    alertFunc("danger", error);
  }
};

const handleUpdate = async () => {
  try {
    document.getElementById("spinnerUpdate").classList.remove("d-none");
    await updateData();
    document.getElementById("spinnerUpdate").classList.add("d-none");
    alertFunc("success", "Data updated successfully");
  } catch (error) {
    alertFunc("danger", error);
  }
};

const handleDelete = async () => {
  try {
    document.getElementById("spinnerDelete").classList.remove("d-none");
    await deleteData();
    document.getElementById("spinnerDelete").classList.add("d-none");
    setTimeout(() => window.location.replace("../M3-D9.html"), 3000);
    alertFunc("success", "Data deleted successfully");
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
