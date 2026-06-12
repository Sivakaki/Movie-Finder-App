#  Movie Finder

A sleek, premium, and highly responsive web application to search for movies, view detailed descriptions, get intelligent recommendations, and manage your personal favorite watchlists. Built using modern semantic HTML, custom CSS variables/gradients, and vanilla JavaScript.

---

##  Features

- ** Dynamic Movie Search**: Search millions of movies instantly with real-time fetching from the **OMDb API**.
- ** Detailed Movie Profiles**: Deep dive into any movie's information—including IMDb rating, runtime, director, writers, cast, plot synopsis, language, country, and awards.
- ** Smart Recommendations**: Get context-based movie suggestions on the details page, fetched and linked dynamically using **TMDb API**.
- ** Favorites Management**: Save movies to a persistent, personalized playlist stored directly in your browser's `localStorage` for offline persistence.
- ** Dark / Light Mode Switcher**: Seamless glassmorphism-designed navbar theme toggle that remembers your preference across pages and reloads.
- ** Responsive Layouts**: Built from scratch using modern CSS Grid and Flexbox layouts, ensuring visual excellence across mobile, tablet, and desktop viewports.

---

## 🛠️ Technology Stack

- **Core**: Semantic HTML5, Vanilla CSS3 (Custom Variables, Transitions, Glassmorphism, and Animations)
- **Logic**: Vanilla ES6 JavaScript (Async/Await API Requests, Document Fragments, LocalStorage State)
- **External APIs**: 
  - [OMDb API](https://www.omdbapi.com/) (Movie search and item details)
  - [TMDb API](https://www.themoviedb.org/) (Movie recommendations mapping)

---

## Project Structure

```text
Movie search app/
├── index.html            # Home search page
├── movie.html            # Detailed movie insights and recommendations
├── favourite.html        # Saved favorites playlist page
├── assets/               # Image/icon assets (logos, theme toggles, fallbacks)
├── css/
│   ├── main.css          # Core CSS: theme rules, shared animations, navbar, and footer
│   ├── index.css         # Custom styling for the landing search area and movie grids
│   ├── movie.css         # Styling for movie specifications and TMDB recommendations
│   └── favourite.css     # Styling for saved favorite cards and listing layout
└── js/
    ├── navbar.js         # Theme switching mechanism (dark/light mode persistence)
    ├── app.js            # Home page logic: handles OMDb search queries and DOM rendering
    ├── movie.js          # Detailed display builder & recommendations via TMDB
    └── favourite.js      # Favorites retriever and UI listing manager
```

---

## Getting Started

### Prerequisites
You need a web browser (e.g., Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari).

### Quick Run
1. **Clone or Download** this repository.
2. Open `index.html` directly in any web browser, OR serve it locally using a server extension like **Live Server** in VS Code for the best experience.

### API Keys
The project is configured with test API keys out-of-the-box:
- **OMDb API Key**: Hardcoded in `js/app.js`, `js/movie.js`, and `js/favourite.js`.
- **TMDb API Key**: Hardcoded in `js/movie.js`.

> [!NOTE]
> If you wish to use your own API keys, simply replace the `API_KEY` (OMDb) and `TMDB_API_KEY` constants at the top of the respective files in the `js/` folder.

---

## Screen Layouts & Logic

### 1. Home / Search Page (`index.html`)
- Displays an interactive hero section with a clean input box.
- Fires search query to OMDb API.
- Generates responsive movie cards with a loading skeleton spinner during fetches.
- Includes quick-access buttons to view full details or bookmark as a favorite.

### 2. Detailed Insights (`movie.html`)
- Shows a high-quality poster side-by-side with full ratings, genre metadata, runtime, and director/writer/actor credits.
- Fetches and maps the movie's IMDb ID to a TMDb ID to fetch secondary recommended films dynamically.
- Automatically handles fallback placeholder posters (`no-image.png`) if media assets are missing.

### 3. Favourites Playlist (`favourite.html`)
- Reads the favorites list array from LocalStorage.
- Performs parallel fetching (`Promise.all`) to load live details for all saved titles.
- Allows immediate card removals, updating the DOM and storage reactively.

---

## Design System

- **Dark Mode CSS Theme**:
  - Background: Linear gradient from solid black to deep blue (`#152331`).
  - Text: High-contrast white.
  - Navbar: Transparent glassmorphism header with a fine white border and `backdrop-filter: blur(10px)`.
- **Light Mode CSS Theme**:
  - Background: Soft modern gray-to-white gradient (`#ece9e6`).
  - Text: Clean charcoal-black.
  - Navbar: Bright semi-opaque blur backdrop.
- **Interactions**:
  - Smooth 0.3s transition on theme toggling.
  - Rotate & scale micro-animations for interactive navbar icons.
  - Spin animations for the async loading indicators.

