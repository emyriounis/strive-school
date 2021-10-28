const fetchData = (filter = null) =>
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((r) => r.json())
    .then((data) => {
      document.getElementById("cards").innerHTML = data
        .filter((book) => (filter ? book.title.includes(filter) : true))
        .map(
          (book) => `
        <div class="col-md-4" id="${book.asin}">
            <div class="card mb-4 box-shadow">
                <img
                    class="card-img-top"
                    src="${book.img}"
                    alt="Card image cap"
                    height="250px"
                    style="object-fit: cover"
                />
                <div class="card-body">
                    <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                    </p>
                    <div
                    class="d-flex justify-content-between align-items-center"
                    >
                        <div class="btn-group">
                            <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary"
                            onclick="skip('${book.asin}')"
                            >
                            Skip
                            </button>
                            <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary"
                            onclick="cart('${book.asin}')"
                            >
                            Add to cart
                            </button>
                        </div>
                        <small class="text-muted">9 mins</small>
                    </div>
                </div>
            </div>
        </div>
    `
        )
        .join("");
    })
    .catch((error) => alert(error));

const cartItems = [];

const cart = (card) => {
  cartItems.indexOf(card) === -1 ? cartAdd(card) : cartRemove(card);
};

const cartAdd = (card) => {
  cartItems.push(card);
  document
    .getElementById(card)
    .childNodes[1].classList.add("text-white", "bg-success");
  document.getElementById(
    card
  ).childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[3].innerHTML = `Remove from cart`;
};

const cartRemove = (card) => {
  cartItems.splice(cartItems.indexOf(card), 1);
  document
    .getElementById(card)
    .childNodes[1].classList.remove("text-white", "bg-success");
  document.getElementById(
    card
  ).childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[3].innerHTML = `Add to cart`;
};

const skip = (card) => document.getElementById(card).remove();

const inputChange = () =>
  document.getElementById("searchInput").value.length >= 3
    ? fetchData(document.getElementById("searchInput").value)
    : fetchData();

const empty = () => {
  location.reload();
};

window.onload = () => fetchData();
