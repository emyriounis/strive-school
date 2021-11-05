const getData = async () => {
  try {
    const responce = await fetch(
      "https://striveschool-api.herokuapp.com/api/movies/comedy",
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
    // console.log(responce.json());
    return responce.json();
  } catch (error) {
    throw new Error(error);
  }
};

// // open sourse
// const randomName = (length) => {
//   var result = "";
//   var characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   var charactersLength = characters.length;
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// };

// // open sourse
// const randomGenre = () => {
//   let genres = ["horror", "comedy", "romance", "documentary", "drama"];
//   return genres[Math.floor(Math.random() * genres.length)];
// };

// const postData = async () => {
//   try {
//     const request = await fetch(
//       "https://striveschool-api.herokuapp.com/api/movies",
//       {
//         headers: {
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyOGVjZmFhY2FhMjAwMTU1MmExN2MiLCJpYXQiOjE2MzU5NDYxOTEsImV4cCI6MTYzNzE1NTc5MX0.Nlyj9HHBZ_rBlsOlnyfINlvAPFFeHyVqunKdfoHSoL0",
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify({
//           name: `${randomName(10)}`,
//           description: `${randomName(50)}`,
//           category: `${randomGenre()}`,
//           imageUrl: "https://bit.ly/3cMc2IH",
//         }),
//       }
//     );
//     if (!request.ok) {
//       throw new Error("fail to fetch");
//     }
//     return request.json();
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// };

window.onload = async () => {
  await displayData();
};

const displayData = async () => {
  const data = await getData();
  document.getElementById("trending").innerHTML = data
    .map(
      (movie) => `
        <a href="../details/details.html?m=${movie._id}&n=${movie.name}&d=${movie.description}&c=${movie.category}&i=${movie.imageUrl}" class="col-12 col-sm-6 col-md-4 col-lg-3 px-1">
          <img
            class="images"
            src="${movie.imageUrl}"
            class="w-100 img-fluid rounded"
            alt="movie cover"
          />
          <img
            class="prime-logo pl-1"
            class="images"
            src="./images/prime.jpg"
            alt=""
          />
        </a>
  `
    )
    .join("");
};
