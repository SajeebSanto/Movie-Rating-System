let movieData = [
    { title: "The Shawshank Redemption", genre: "Drama", releaseDate: "1994-09-22", rating: 5 },
    { title: "The Godfather", genre: "Crime", releaseDate: "1972-03-24", rating: 5 },
    { title: "The Dark Knight", genre: "Action", releaseDate: "2008-07-18", rating: 4 },
    { title: "Pulp Fiction", genre: "Crime", releaseDate: "1994-10-14", rating: 4 },
    { title: "The Lord of the Rings: The Return of the King", genre: "Fantasy", releaseDate: "2003-12-17", rating: 5 }
];  // Initial movie data


const renderGrid = () => {
   new gridjs.Grid({
    columns: [
        "Title", "Genre", "Release Date", "Rating"
    ],
    sort: true,
    pagination: {
      limit: 10
    },
    search: true,
    data: movieData
   }).render(document.getElementById("grid")); 
}

renderGrid();

function toggleForm() {
    document.getElementById("formContainer").classList.toggle("active");
    document.getElementById("listContainer").classList.toggle("active");
}