let visibility = true;
const navVisibility = () => {
  let nav = document.querySelector("nav");
  let main = document.querySelector("main");

  visibility ? nav.classList.add("d-none") : nav.classList.remove("d-none");
  visibility ? main.classList.remove("d-none") : main.classList.add("d-none");

  visibility = !visibility;
};

let menuButtonMain = document
  .getElementById("menuButton")
  .addEventListener("click", () => navVisibility());

let menuButtonNav = document
  .getElementById("menuButtonNav")
  .addEventListener("click", () => navVisibility());

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

fetch(
  `https://striveschool-api.herokuapp.com/api/deezer/search?q=${
    params.query ? params.query : "queen"
  }`
)
  .then((resp) => resp.json())
  .then((data) => {
    document.getElementById("goodCards").innerHTML = data.data
      .map((song) => {
        return `
    <a class="text-white" href="../album-page/album.html?album=${song.album.id}"
      <div class="music-card mx-2"  id="cardHover" onmouseover="mouseOver('linear-gradient(180deg, rgb(28, 4, 83) 0%, rgb(0, 0, 0) 35%)')" onmouseout="mouseOut() ">
        <div class="media d-flex">
          <img
            src="${song.album.cover_medium}"
            class="mr-3 img-fluid img1"
            alt="..."
          />
          <div class="media-body bodyHover d-flex align-self-center">
            <h6 class="mt-0">${song.title}</h6>
            <h6 class="card-title ml-3"><i class="bi bi-play-circle-fill playHover"></i></h6>
          </div>
        </div>
      </div>
    </a>
      `;
      })
      .join("");
  });

fetch(
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=Michael%20Jackson"
)
  .then((resp) => resp.json())
  .then((data) => {
    document.getElementById("recentCards").innerHTML = data.data
      .map((song) => {
        return `
          <a href="../album-page/album.html?album=${song.album.id}" class="col-sm-6 col-md-3 col-lg-2 mb-3 px-0">
            <div class="card cardwrap mx-2 h-100 bg-dark border-dark">
              <img
                src="${song.album.cover_medium}"
                class="p-3"
                alt="..."
                id="notRounded"
              />
              <div class="card-body d-flex justify-content-between">
                
                <p class="card-text text-white"><strong>${song.title}</strong> <br>
                
                  <small class="text-muted">${song.album.title}</small>
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-play-circle-fill playButton" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                </svg>
              </div>
            
            </div>
          </a>
      `;
      })
      .join("");
  });

fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem")
  .then((resp) => resp.json())
  .then((data) => {
    document.getElementById("showsCards").innerHTML = data.data
      .map((song) => {
        return `
          <a href="../album-page/album.html?album=${song.album.id}" class="col-sm-6 col-md-3 col-lg-2 mb-3 px-0">
            <div class="card cardwrap mx-2 h-100 bg-dark border-dark">
              <img
                src="${song.album.cover_medium}"
                class="p-3"
                alt="..."
                id="notRounded"
              />
              <div class="card-body d-flex justify-content-between">
                
                <p class="card-text text-white"><strong>${song.title}</strong> <br>
                
                  <small class="text-muted">${song.album.title}</small>
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-play-circle-fill playButton" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                </svg>
              </div>
            
            </div>
          </a>
      `;
      })
      .join("");
  });

fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem")
  .then((resp) => resp.json())
  .then((data) => {
    document.getElementById("albumsList").innerHTML = data.data
      .map((song) => {
        return `
        <li class="row">
          <a href="${song.link}" class="col-12 px-3 py-1">${song.title}</a>
        </li>
      `;
      })
      .join("");
  });

const inputChange = () => document.getElementById("searchInput").value;

const search = () =>
  window.location.replace(`../home-page/Home-Page.html?query=${inputChange()}`);
