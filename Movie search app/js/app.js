console.log("Movie Finder Started...");

//elements from the doc
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const moviesContainer = document.getElementById("movies-container");

const emptyState = document.querySelector(".empty-state");
const moviesSection = document.querySelector(".movies-section");
const loading = document.querySelector(".loading");

const hero = document.getElementById("hero");
const bd = document.body;
const ttoggle = document.getElementById("theme-toggle");

const API_KEY = "f642fb7"; //api key

//function to update the image
function updateHeroImage() {
  if (bd.classList.contains("dark")) {
    hero.src = "./assets/film-light.png";
  } else {
    hero.src = "./assets/film-dark.png";
  }
}

document.addEventListener("DOMContentLoaded", updateHeroImage);

ttoggle.addEventListener("click", () => {
  setTimeout(updateHeroImage, 0);
});

//function for searching movies by name
async function searchMovies(movieName) {
  try {
    loading.classList.remove("hidden");
    moviesSection.classList.remove("hidden");
    emptyState.classList.add("hidden");

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`,
    );

    const data = await response.json();

    loading.classList.add("hidden");

    if (data.Response === "False") {
      moviesContainer.innerHTML = "<h3>No movies found.</h3>";
      return;
    }

    displayMovies(data.Search);
  } catch (error) {
    console.log(error);

    loading.classList.add("hidden");

    moviesContainer.innerHTML = "<h3>Something went wrong</h3>";
  }
}

//function to display the movies as movie cards
function displayMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
        <img 
        src="${
          movie.Poster && movie.Poster !== "N/A"
            ? movie.Poster
            : "./assets/no-image.png"
        }"
        alt="${movie.Title}"
      />

      <div class="movie-info">
        <h3>${movie.Title}</h3>

        <p>${movie.Year}</p>

        <div class="card-buttons">
          <button 
            class="details-btn"
            onclick="viewDetails('${movie.imdbID}')"
          >
            View Details
          </button>

          <button
            class="fav-btn"
          >
            Favourite
          </button>
        </div>
      </div>
    `;

    const favBtn = movieCard.querySelector(".fav-btn");

    updateFavouriteButton(movie.imdbID, favBtn);

    favBtn.addEventListener("click", () => {
      const added = addFavourite(movie.imdbID, movie.Title);

      if (added) {
        favBtn.textContent = "Added to Favourites";
        favBtn.disabled = true;
      }
    });
    moviesContainer.appendChild(movieCard);
  });
}

//search button event listner
searchBtn.addEventListener("click", () => {
  const movieName = searchInput.value.trim();

  if (!movieName) {
    searchInput.focus();
    return;
  }

  searchMovies(movieName);
});

//search input event listner
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

//function to store movie id in local storage
window.viewDetails = function (id) {
  localStorage.setItem("details", id);

  window.location.href = "movie.html";
};

//function to store all favourites in local storage.
window.addFavourite = function (id, title) {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  if (favourites.includes(id)) {
    alert(`${title} is already in your Favourites!`);
    return false;
  }

  favourites.push(id);

  localStorage.setItem("favourites", JSON.stringify(favourites));

  alert(`${title} added to Favourites!`);
  return true;
};

//update favourite button function
function updateFavouriteButton(movieId, favBtn) {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  if (favourites.includes(movieId)) {
    favBtn.textContent = "Added to Favourites";
    favBtn.disabled = true;
  } else {
    favBtn.textContent = "Favourite";
    favBtn.disabled = false;
  }
}
