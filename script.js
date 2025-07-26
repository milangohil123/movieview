const movies = [
 { 
  title: "THE BATMAN", 
  poster: "batman.jpeg", 
  rating: "4.5 ⭐", 
  trailer: "https://www.youtube.com/watch?v=mqqft2x_Aa4", 
  review: "🦇 A dark, gritty, and thrilling take on Gotham’s caped crusader. 🌃🔥" 
},
{ 
  title: "Inception", 
  poster: "inseption.jpeg", 
  rating: "5 ⭐", 
  trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0", 
  review: "🌀 A visually stunning masterpiece with a mind-bending story. 🧠💥" 
},
{ 
  title: "Interstellar", 
  poster: "inter.jpeg", 
  rating: "4.8 ⭐", 
  trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E", 
  review: "🚀 Emotionally powerful, scientifically fascinating, and visually stunning. 🌌🪐" 
},
{ 
  title: "Joker", 
  poster: "joker.jpg", 
  rating: "4.7 ⭐", 
  trailer: "https://www.youtube.com/watch?v=zAGVQLHvwOY", 
  review: "🃏 A chilling origin story of the infamous villain. 😈🎭" 
},
{ 
  title: "Avengers: Endgame", 
  poster: "aven.jpeg", 
  rating: "4.9 ⭐", 
  trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c", 
  review: "⚔️ A powerful conclusion to the Marvel saga. 💥😭" 
},
{ 
  title: "Tenet", 
  poster: "tenet.jpeg", 
  rating: "4.3 ⭐", 
  trailer: "https://www.youtube.com/watch?v=L3pk_TBkihU", 
  review: "🕰️ A mind-bending time-travel thriller. 🔄🧩" 
},
{ 
  title: "Iron Man", 
  poster: "iron.jpeg", 
  rating: "4.6 ⭐", 
  trailer: "https://www.youtube.com/watch?v=8hYlB38asDY", 
  review: "🤖 The origin of the iconic Marvel superhero. 💥🛡️" 
},
{ 
  title: "Spider-Man: No Way Home", 
  poster: "spy.jpeg", 
  rating: "4.3 ⭐", 
  trailer: "https://www.youtube.com/watch?v=JfVOs4VSpmA", 
  review: "🕸️ Multiverse madness with all 3 Spider-Men. 🧍🧍🧍‍♂️" 
},
{ 
  title: "Doctor Strange", 
  poster: "strange.jpeg", 
  rating: "4.2 ⭐", 
  trailer: "https://www.youtube.com/watch?v=Lt-U_t2pUHI", 
  review: "🔮 Mystical and mind-bending magic from Marvel. ✨🌀" 
},
{ 
  title: "Black Panther", 
  poster: "black.jpeg", 
  rating: "4.2 ⭐", 
  trailer: "https://www.youtube.com/watch?v=xjDjIWPwcPU", 
  review: "🖤 A cultural milestone in superhero cinema. 🐾👑" 
}
];

function getStars(rating) {
  const fullStars = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = "";
  for (let i = 0; i < fullStars; i++) stars += `<i class="fas fa-star text-warning"></i>`;
  if (half) stars += `<i class="fas fa-star-half-alt text-warning"></i>`;
  return stars;
}

function createMovieCard(movie) {
  return `
    <div class="card">
      <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p>${movie.review}</p>
        <p>${getStars(movie.rating)}</p>
        <a href="${movie.trailer}" target="_blank" class="btn btn-outline-warning btn-sm">Watch Trailer</a>
      </div>
    </div>
  `;
}

function filterContent(category) {
  const categoryContent = document.getElementById("categoryContent");
  const categoryTitle = document.getElementById("categoryTitle");
  const categoryGrid = document.getElementById("categoryMoviesGrid");

  const categoryText = category.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
  categoryTitle.innerHTML = `Showing: <span class="text-warning">${categoryText}</span>`;

  const filtered = movies.filter(movie => movie.category === category);
  if (filtered.length === 0) {
    categoryGrid.innerHTML = `<p class="text-light">No items found in ${categoryText}</p>`;
  } else {
    categoryGrid.innerHTML = filtered.map(createMovieCard).join("");
  }

  categoryContent.classList.remove("d-none");
  window.scrollTo({ top: categoryContent.offsetTop - 50, behavior: "smooth" });
}
 function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm) {
      // Redirect to movies.html with query string
      window.location.href = `movies.html?search=${encodeURIComponent(searchTerm)}`;
    }
  }
  
function loadMovieRow() {
  const movieRow = document.getElementById("movieRow");
  movieRow.innerHTML = movies.map(createMovieCard).join("");
}
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from reloading the page

  const searchInput = document.querySelector("input[type='search']").value.toLowerCase();
  const movieRow = document.getElementById("movieRow");

  const results = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchInput)
  );

  if (results.length === 0) {
    movieRow.innerHTML = `<div class="text-light p-3">No results found for "<span class="text-warning">${searchInput}</span>"</div>`;
  } else {
    movieRow.innerHTML = results.map(createMovieCard).join("");
  }
});

window.onload = loadMovieRow;
