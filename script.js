let movieData = [
    ["The Shawshank Redemption", "Drama", "1994-09-22", 5],
    ["The Godfather", "Crime", "1972-03-24", 5],
    ["The Dark Knight", "Action", "2008-07-18", 4],
    ["Pulp Fiction", "Crime", "1994-10-14", 4],
    ["The Lord of the Rings: The Return of the King", "Fantasy", "2003-12-17", 5]
];
  // Initial movie data


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