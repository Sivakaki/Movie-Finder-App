console.log("Favourites Loaded....");

//Elements from Dom
const favContainer = document.querySelector(".favourites-container");
const emptyState = document.getElementById("empty-state");

const API_KEY = "f642fb7"; //api key

//Loading spinner function
function showLoading(element, text = "Loading...") {
  element.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>${text}</p>
    </div>
  `;
}

async function fetchMovieDetails() {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  favContainer.innerHTML = "";

  if (favourites.length === 0) {
    emptyState.classList.remove("hidden");
    favContainer.classList.add("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  favContainer.classList.remove("hidden");

  showLoading(favContainer, "Loading favourites...");

  try {
    const movies = await Promise.all(
      favourites.map(async (id) => {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`,
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch movie : ${id}`);
        }
        return response.json();
      }),
    );

    const fragment = document.createDocumentFragment();

    for (const movie of movies) {
      if (movie.Response === "False") continue;

      const movieCard = document.createElement("div");
      movieCard.classList.add("fav-card");

      const posterSrc =
        movie.Poster && movie.Poster !== "N/A"
          ? movie.Poster
          : "./assets/no-image.png";

      movieCard.innerHTML = `
      <img src="${posterSrc}" alt="Movie Poster" />
          <div class="fav-info">
            <h3>${movie.Title}</h3>
            <p>⭐ ${movie.imdbRating}</p>
            <p>${movie.Year}</p>
            <div class="fav-buttons">
              <button class="details-btn">View Details</button>
              <button class="remove-btn">Remove</button>
            </div>
          </div>
      `;

      const detailsBtn = movieCard.querySelector(".details-btn");
      const removeBtn = movieCard.querySelector(".remove-btn");

      detailsBtn.addEventListener("click", () => {
        viewDetails(movie.imdbID);
      });

      removeBtn.addEventListener("click", () => {
        removeFavourite(movie.imdbID);
      });

      fragment.appendChild(movieCard);
    }

    favContainer.innerHTML = "";

    favContainer.appendChild(fragment);
  } catch (error) {
    console.error("Error loading favourites : ", error);

    favContainer.innerHTML = `
    <div class="empty-state">
        <h2>Failed to load favourites</h2>
        <p>Please check your internet connection and try again.</p>
      </div>
    `;
  }
}

function viewDetails(id) {
  localStorage.setItem("details", id);
  window.location.href = "movie.html";
}

function removeFavourite(id) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  favourites = favourites.filter((movieId) => movieId !== id);

  localStorage.setItem("favourites", JSON.stringify(favourites));

  fetchMovieDetails();
}

fetchMovieDetails();
