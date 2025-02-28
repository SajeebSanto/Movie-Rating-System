let movieData = [
    { title: "The Shawshank Redemption", genre: "Drama", releaseDate: "1994-09-22", rating: 5 },
    { title: "The Godfather", genre: "Crime", releaseDate: "1972-03-24", rating: 5 },
    { title: "The Dark Knight", genre: "Action", releaseDate: "2008-07-18", rating: 4 },
    { title: "Pulp Fiction", genre: "Crime", releaseDate: "1994-10-14", rating: 4 },
    { title: "The Lord of the Rings: The Return of the King", genre: "Fantasy", releaseDate: "2003-12-17", rating: 5 }
];  // Initial movie data

// Render the movie list
const renderMovies = () => {
    const moviesList = document.getElementById("moviesList");
    moviesList.innerHTML = ""; // Clear existing list

    movieData.forEach((movieItem, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${movieItem.title}</td>
            <td>${movieItem.genre}</td>
            <td>${movieItem.releaseDate}</td>
            <td>${movieItem.rating}</td>
            <td>
                <button onclick="editMovie(${index})">Edit</button>
                <button onclick="deleteMovie(${index})">Delete</button>
            </td>
        `;
        moviesList.appendChild(row);
    });
};

// Toggle between form and movie list
function toggleForm() {
    document.getElementById("formContainer").classList.toggle("active");
    document.getElementById("listContainer").classList.toggle("active");
}

// Submit a new movie
function submitMovie() {
    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const releaseDate = document.getElementById("releaseDate").value;
    const rating = document.getElementById("rating").value;

    if (title && genre && releaseDate && rating) {
        movieData.push({ title, genre, releaseDate, rating });  
        renderMovies();  
        toggleForm();  
        document.getElementById("movieForm").reset();  
    } else {
        alert("Please fill in all fields.");
    }
}

// Edit a movie
function editMovie(index) {
    const movieItem = movieData[index];
    document.getElementById("title").value = movieItem.title;
    document.getElementById("genre").value = movieItem.genre;
    document.getElementById("releaseDate").value = movieItem.releaseDate;
    document.getElementById("rating").value = movieItem.rating;
    toggleForm();  
}

// Delete a movie
function deleteMovie(index) {
    if (confirm("Are you sure you want to delete this movie?")) {
        movieData.splice(index, 1);  
        renderMovies();  
    }
}

// Search for movies
function searchMovies() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const filteredMovies = movieData.filter(movieItem =>
        movieItem.title.toLowerCase().includes(searchTerm)
    );
    
    const moviesList = document.getElementById("moviesList");
    moviesList.innerHTML = ""; 

    filteredMovies.forEach((movieItem, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${movieItem.title}</td>
            <td>${movieItem.genre}</td>
            <td>${movieItem.releaseDate}</td>
            <td>${movieItem.rating}</td>
            <td>
                <button onclick="editMovie(${index})">Edit</button>
                <button onclick="deleteMovie(${index})">Delete</button>
            </td>
        `;
        moviesList.appendChild(row);
    });
}

// Initial render of movies
renderMovies();
