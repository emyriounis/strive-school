let visibility = true;
const navVisibility = () => {
  let nav = document.querySelector("nav");
  let main = document.querySelector("main");
  let jumbotron = document.getElementsByClassName("jumbotron")[0];

  visibility ? nav.classList.add("d-none") : nav.classList.remove("d-none");
  visibility ? main.classList.remove("d-none") : main.classList.add("d-none");

  visibility = !visibility;
};

// let menuButtonMain = document
//   .getElementById("menuButton")
//   .addEventListener("click", () => navVisibility());

// let menuButtonNav = document
//   .getElementById("menuButtonNav")
//   .addEventListener("click", () => navVisibility());

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}



fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem")
  .then((res) => res.json())
  .then((body) => {
    document.getElementById("jumbo").innerHTML =
       `
       <div class="container-fluid d-flex flex-column justify-content-between sticky-top p-1 p-sm-2 p-md-3">
       <div
           class="d-sm-flex justify-content-between align-items-center"
           id="topNav"
       >
         
           <div class="d-flex align-items-center" id="arrows">
           <button class="btn btn-dark d-lg-none m-2" id="menuButton">
               <svg
               xmlns="http://www.w3.org/2000/svg"
               width="16"
               height="16"
               fill="currentColor"
               class="bi bi-list"
               viewBox="0 0 16 16"
               >
               <path
                   fill-rule="evenodd"
                   d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
               />
               </svg>
           </button>
           <button
               class="
               d-flex
               justify-content-center
               align-items-center
               text-light
               bg-dark
               border-0
               mx-1 mx-sm-2
               "
           >
               <svg
               xmlns="http://www.w3.org/2000/svg"
               width="16"
               height="16"
               fill="currentColor"
               class="bi bi-chevron-left"
               viewBox="0 0 16 16"
               >
               <path
                   fill-rule="evenodd"
                   d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
               />
               </svg>
           </button>
           <button
               class="
               d-flex
               justify-content-center
               align-items-center
               text-light
               bg-dark
               border-0
               mx-1 mx-sm-2
               "
           >
               <svg
               xmlns="http://www.w3.org/2000/svg"
               width="16"
               height="16"
               fill="currentColor"
               class="bi bi-chevron-right"
               viewBox="0 0 16 16"
               >
               <path
                   fill-rule="evenodd"
                   d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
               />
               </svg>
           </button>
           </div>
           <button
           class="
               d-flex
               justify-content-center
               align-items-center
               text-light
               bg-dark
               border-0
               p-1
               mx-1 mx-sm-2
           "
           id="user"
           >
           <svg
               xmlns="http://www.w3.org/2000/svg"
               width="20"
               height="20"
               fill="currentColor"
               class="bi bi-person-circle"
               viewBox="0 0 16 16"
           >
               <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
               <path
               fill-rule="evenodd"
               d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
               />
           </svg>
           <span class="px-2">Diego 'Ziba' Ba...</span>
           <svg
               xmlns="http://www.w3.org/2000/svg"
               width="16"
               height="16"
               fill="currentColor"
               class="bi bi-caret-down-fill"
               viewBox="0 0 16 16"
           >
               <path
               d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
               />
           </svg>
           </button>
         </div>
     </div>
       <div class="d-flex flex-column justify-content-center">
           <div class="pl-4 d-flex" >
               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="blue" class="bi bi-award-fill" viewBox="0 0 16 16">
                   <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/>
                   <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
               </svg>
               <div class="verified-artist-text ml-1" > 
                   Verified Artist
               </div>
           </div>
           <h1 class="title-text pl-4">
               ${body.data[0].artist.name}
           </h1>
           <p class="title-text-monthly-listen pl-4"> 
               3,420,500 monthly listeners
           </p>
       </div>
      `;
     
    document.getElementById("jumbo").style.backgroundImage =`url(${body.data[0].artist.picture})`
     
  });

  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem")
  .then((res) => res.json())
  .then((body) => {
    document.getElementById("artist-table").innerHTML = body.data
      .map((song) => {
        return `
        <tr class="tracklist-row"> 
        <th  scope="row" colspan="4" class="track-title-text">
            <svg  class="playing-progres-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-bar-chart-line" viewBox="0 0 16 16">
            <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 
            1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z"/>
            </svg>
            <img src="${song.album.cover_medium}" class="img-fluid mx-3" style="height: 40px; height: 40px;" alt="...">
            ${song.title}</th>
        <td class="viewed-text pl-5 pt-4" colspan="2">${song.rank}</td>
        <td class="viewed-text pt-4">
            <svg class="like-song-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 
            5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 
            1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
            ${song.duration}
            <svg class="dropdown-song-menu" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-activity" viewBox="0 0 16 16">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 
            4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z" fill="#000"/>
            </svg>
        </td>
    </tr>
      `;
      })
      .join("");
  });
  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem")
  .then((res) => res.json())
  .then((body) => {
    document.getElementById("artist-pick").innerHTML =
    `
      
        <div class="col-md-12 col-lg-3 pl-4">
        <h4 class="text-white col-lg-12 my-4">Artist's pick</h4>
        <div class="d-flex col-lg-12 ">
            <img class="" src="${body.data[0].artist.picture}" class="img-fluid col-lg-12 mx-3" style="width: 100px; height: 100px; object-fit: scale-down;" alt="...">
            <div class="flex-column align-items-end">
                <div class="d-flex align-items-center justify-content-between col-lg-12 pl-n4">
                    <img src="${body.data[0].artist.picture}" class="img-fluid rounded-circle mx-3" style="width: 40px; height: 40px;" alt="...">
                    <p class="artistpick-text-p1 m-0">Posted by ${body.data[0].artist.name}</p>
                </div>
                <p class="artistpick-text-p pl-4 mb-0 mt-3" >Tool Best Of</p>
                <p class="artistpick-text-p1 pl-4 mb-0">${body.data[0].artist.name}</p>
            </div>
        </div>
    </div>
      `;
      
    
  });
  
  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem")
  .then((res) => res.json())
  .then((body) => {
    document.getElementById("popular-cards").innerHTML = body.data
      .map((song) => {
        return `
        <a class="card card-popular-release flex-column align-items-center mt-3" 
            style="text-decoration: none;" 
            href="../album-page/album.html">
              <img class="album-img pt-3" src="${song.album.cover_medium}" class="card-img-top rounded" alt="...">
              <div class="card-body  d-flex align-items-start justify justify-content-between" style="width: 212px;">
                  <div class="card-text">
                      <h6 class="text-white" >  <strong>${song.title} </strong></h6>
                      <p class="card-album-text">2006<span> &middot; </span> Album</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-play-circle-fill playButton" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                    </svg>
              </div>
            </a>
      `;
      })
      .join("");
  });
  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem")
  .then((res) => res.json())
  .then((body) => {
    document.getElementById("albumsid").innerHTML = body.data
      .map((song) => {
        return `
        
  <a class="seemore-link-text mt-4 mr-5 d-flex" href="">SEE DISCOGRAPHY</a>
        </div>
        <div class="d-flex justify-content-around flex-wrap px-2 mt-5">
          <a class="card card-popular-release flex-column align-items-center" 
          style="text-decoration: none;" 
          href="../album-page/album.html">
            <img class="album-img pt-3" src="${song.album.cover_medium}" class="card-img-top rounded" alt="...">
            <div class="card-body  d-flex align-items-start justify justify-content-between" style="width: 212px;">
                <div class="card-text">
                    <h6 class="text-white"> <strong> ${song.title}</strong></h6>
                    <p class="card-album-text">2006 <span> &middot; </span> Album</p>

                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-play-circle-fill playButton" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                  </svg>
            </div>

          </a>
      `;
      })
      .join("");
  });
