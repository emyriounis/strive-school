const loadSrc = (query) =>
  fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=${Math.floor(
      Math.random() * 80 + 1
    )}`,
    {
      method: "GET",
      headers: {
        Authorization:
          "563492ad6f917000010000010d52224fd6a14f92a27491e14407be4a",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("cardsPlace").innerHTML = "";
      data.photos.map((i) => {
        let node = document.createElement("div");
        node.classList.add("col-md-4");
        node.id = i.id;
        node.innerHTML = `
        <div class="card mb-4 shadow-sm">
            <img src="${i.src.medium}" alt="photo" height="250px" style="object-fit: cover;" />
            <div class="card-body">
                <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
                </p>
                <div
                class="d-flex justify-content-between align-items-center"
                >
                <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                onclick="hideCard(${i.id})"
                >
                Hide
                </button>
                <small class="text-muted">${i.id}</small>
                </div>
            </div>
        </div>
    `;
        document.getElementById("cardsPlace").appendChild(node);
      });
      document
        .getElementsByClassName("alert")[0]
        .classList.remove("alert-primary", "alert-success", "alert-danger");
      document
        .getElementsByClassName("alert")[0]
        .classList.add("alert-success");
      document.getElementsByClassName(
        "alert"
      )[0].innerHTML = `${data.photos.length} images loaded`;
    })
    .catch((error) => {
      document
        .getElementsByClassName("alert")[0]
        .classList.remove("alert-primary", "alert-success", "alert-danger");
      document.getElementsByClassName("alert")[0].classList.add("alert-danger");
      document.getElementsByClassName("alert")[0].innerHTML = `error: ${error}`;
    });

const hideCard = (id) =>
  document.getElementById(`${id}`).classList.add("d-none");

let query = "";
const getSrcResult = (str) => (query = str);

const src = () => loadSrc(query);
