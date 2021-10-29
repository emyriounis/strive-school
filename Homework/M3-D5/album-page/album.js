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

let page_url = window.location.href;
let url = new URL(page_url);
const album_id = url.searchParams.get("album");

fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + album_id)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    document.getElementById("jumbotron1").innerHTML = `
    <img
    src="${data.cover_medium}"
    class="img-fluid"
    alt="Atil Album"
    id="albumImg"
  />
  <div class="album-heder flex-coloumn px-2">
    <h6 class="album-title">ALBUM</h6>
    <h1 class="album-header">${data.title}</h1>
    <div class="d-flex">
      <img
        src="./image/album dori.jpg"
        class="rounded-circle"
        width="30px"
        height="30px"
        alt="small image"
      />
      <a class= "ancher-header text-white" href="../artist-page/index.html?artist=${
        data.artist.id
      }">${data.artist.name}</a>
      <div class="">
        <span class="headerSmallRow">${data.release_date.slice(0, 4)}</span>
        <span class="headerSmallRow">•${data.tracks.data.length} songs,</span>
        <span class="headerSmallRow time"></span>
      </div>
    </div>
  </div>
  `;

    let timePlace = document.querySelector(".time");
    let totalSeconds = data.duration;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    timePlace.innerHTML = `${hours}hr ${minutes}min`;

    document.getElementById("tracks-table-body").innerHTML =
      data.tracks.data.map((song, index) => {
        return `<tr class="align-middle">
      <th class="TheaderText align-middle shortWidth p-1"scope="row">${
        index + 1
      }</th>
      <td class="TheaderText align-middle p-1">${
        song.title
      } <br /><a class="link" href="../artist-page/index.html?artist=${
          data.artist.id
        }">${song.artist.name} </a></td>
      <td id="singleSongTime" class="TheaderText align-middle text-right p-1">${secTr(
        song.duration
      )}</td>
    </tr>`;
      });

    document.getElementById(
      "botton-title"
    ).innerHTML = `<h2 class="text-white">More By
     ${data.artist.name}</h2>
    <h5 id="seeMore">SEE Discography</h5>`;
  });

const secTr = (duration) => {
  let total = duration;
  let minute = Math.floor(total / 60);
  let second = total % 60;
  second < 10 && (second = `0${second}`);
  return `${minute}:${second}`;
};
