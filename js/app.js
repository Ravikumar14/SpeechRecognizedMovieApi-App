let search = document.querySelector("#search");
search.addEventListener("keyup", (e) => {
  // console.log(e.target.value);
  let searchText = e.target.value;
  searchMovies(searchText);
  // when key press
  let formText = document.getElementById("divBlock");
  formText.style.display = "none";
  search.classList.add("afterkeyPress");
  document.querySelector("#formblock").classList.add("afterkey_formBlock");
});
//speach recognition
let speechSearch = document.getElementById("speechIcon");
speechSearch.addEventListener("click", () => {
  let formText = document.getElementById("divBlock");
  formText.style.display = "none";
  search.classList.add("afterkeyPress");
  document.querySelector("#formblock").classList.add("afterkey_formBlock");

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  let p = document.createElement("p");
  recognition.interimResults = true;
  recognition.addEventListener("result", (e) => {
    let transcript = [...e.results]
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    // console.log(transcript);
    search.value = transcript;
    if(e.results[0].isFinal){
      p=document.createElement("p");
      p.innerHTML=transcript;
      let searchText=transcript;
      searchMovies(searchText);
    }
  });
  recognition.start();
  recognition("end",recognition.start);
});
function searchMovies(searchText) {
  // console.log(searchText);
  const imdbApi = `http://www.omdbapi.com/?s=${searchText}&apikey=f056e2f7`;
  window
    .fetch(imdbApi)
    .then((data) => {
      data
        .json()
        .then((movieData) => {
          let movies = movieData.Search;
          let output = [];
          for (let movie of movies) {
            let defaultimg =
              movie.Poster === "N/A"
                ? "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg"
                : movie.Poster;
            output += `
            <div>
            <img src="${defaultimg}"/>
            <h1>Title:${movie.Title}</h1>
            <h1>Year:${movie.Year}</h1>
            <a href="http://www.omdbapi.com/?i=${movie.imdbID}&apikey=f056e2f7" target="_blank">Movie Details</a>
            </div>`;
          }
          document.getElementById("template").innerHTML = output;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
