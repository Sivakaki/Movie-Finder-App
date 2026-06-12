console.log("Details Loaded...");

const poster = document.querySelector(".poster");

const api_key = "f642fb7"; //api key

const id = localStorage.getItem("details");  //movie id for showing details


// if id does not exist show this or give details
if (!id) {
  poster.innerHTML = `
    <h2> No movie selcted.</h2>
    <p>Please go back and select a movie.</p>`;
} else {
  showLoading(poster,"Loading movie details...")
  fetchdata(id);
}

//Loading function 
function showLoading(element, text = "Loading...") {
  element.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>${text}</p>
    </div>
  `;
}


//fetch movie details
async function fetchdata(id) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${api_key}&i=${id}`,
    );
    const data = await response.json();

    if (data.Response === "False") {
      poster.innerHTML = `<h1> No details are found</h1>`;
      return;
    }

    displayDetails(data);
  } catch (error) {
    console.log(error);

    poster.innerHTML = "<h1>Something went wrong</h1>";
  }
}

//Display movie details
function displayDetails(movie) {
  const postersrc =
    movie.Poster !== "N/A" ? movie.Poster : "./assets/no-image.png";
  poster.innerHTML = `
    <div id="poster-img">
          <img src="${postersrc}" alt="${movie.Title}" />
        </div>

        <div class="movie-information">
          <h2>${movie.Title}</h2>

          <p>
            <strong>IMDb Rating:</strong>
            ⭐ ${movie.imdbRating}
          </p>

          <p>
            <strong>Year:</strong>
            ${movie.Year}
          </p>

          <p>
            <strong>Genre:</strong>
            ${movie.Genre}
          </p>

          <p>
            <strong>Runtime:</strong>
            ${movie.Runtime}
          </p>

          <p>
            <strong>Director:</strong>
            ${movie.Director}
          </p>

          <p>
            <strong>Writer:</strong>
           ${movie.Writer}
          </p>

          <p>
            <strong>Actors:</strong>
            ${movie.Actors}
          </p>

          <p>
            <strong>Language:</strong>
            ${movie.Language}
          </p>

          <p>
            <strong>Country:</strong>
            ${movie.Country}
          </p>
          <p>
            <strong>Awards:</strong>
            ${movie.Awards}
          </p>

          <p>
            <strong>Plot:</strong>
          </p>

          <p class="plot">
            ${movie.Plot}
          </p>

          <button class="fav-btn"
          >Add to Favourite</button>
          </div>
          `;

  updateFavouriteButton(movie.imdbID);
  document.querySelector(".fav-btn").addEventListener("click", () => {
    addFavourite(movie.imdbID, movie.Title);
  });
  fetchRecommendations(movie);
}

const TMDB_API_KEY = "ff0e93a754b8f65a61a76b3f9514d218"; //tmdb api key


//fetching recommendations 
async function fetchRecommendations(movie) {
  const recContainer = document.querySelector(".recommended-movies");

  showLoading(
    recContainer,
    'Loading recommendations'
  )

  try {
    // Convert IMDb ID -> TMDb ID
    const findResponse = await fetch(
      `https://api.themoviedb.org/3/find/${movie.imdbID}?api_key=${TMDB_API_KEY}&external_source=imdb_id`,
    );

    const findData = await findResponse.json();

    if (!findData.movie_results || findData.movie_results.length === 0) {
      recContainer.innerHTML = "<h3>No recommendations available.</h3>";
      return;
    }

    const tmdbId = findData.movie_results[0].id;

    // Fetch recommendations
    const recResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}/recommendations?api_key=${TMDB_API_KEY}`,
    );

    const recData = await recResponse.json();

    if (!recData.results || recData.results.length === 0) {
      recContainer.innerHTML = "<h3>No recommendations available.</h3>";
      return;
    }

    // Convert TMDb recommendations to your existing format
    const recommendations = await Promise.all(
      recData.results.slice(0, 6).map(async (recMovie) => {
        try {
          const detailsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${recMovie.id}?api_key=${TMDB_API_KEY}`,
          );

          const detailsData = await detailsResponse.json();

          return {
            Title: recMovie.title,
            Poster: recMovie.poster_path
              ? `https://image.tmdb.org/t/p/w500${recMovie.poster_path}`
              : "N/A",
            imdbID: detailsData.imdb_id,
          };
        } catch {
          return null;
        }
      }),
    );

    displayRecommendations(
      recommendations.filter((movie) => movie && movie.imdbID),
    );
  } catch (error) {
    console.error("Recommendation Error:", error);
    recContainer.innerHTML = "<h3>Failed to load recommendations.</h3>";
  }
}

//function to display recommendation cards.
function displayRecommendations(movies) {
  const recContainer = document.querySelector(".recommended-movies");

  recContainer.innerHTML = "";

  movies.forEach((movie) => {
    const moviecard = document.createElement("div");
    moviecard.classList.add("movie-card");

    moviecard.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "./assets/no-image.png"}" alt="${movie.Title}" />
            <h4>${movie.Title}</h4>
        `;

    moviecard.onclick = () => viewDetails(movie.imdbID);

    recContainer.appendChild(moviecard);
  });
}

window.viewDetails = function (id) {
  localStorage.setItem("details", id);

  window.location.href = "movie.html";
};

//Add movie to Favourites

function addFavourite(id, title) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  if (favourites.includes(id)) {
    alert(`${title} already exists in favourites!`);
    return;
  }

  favourites.push(id);

  localStorage.setItem("favourites", JSON.stringify(favourites));

  alert(`${title} added to Favourites!`);
}


//update favourite button function 
function updateFavouriteButton(movieId) {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const favBtn = document.querySelector(".fav-btn");

  if (favourites.includes(movieId)) {
    favBtn.textContent = "Added to Favourites";
    favBtn.disabled = true;
  }
}
