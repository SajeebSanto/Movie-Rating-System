let movieData = [
    ["The Shawshank Redemption", "Drama", "1994-09-22", 5],
    ["The Godfather", "Crime", "1972-03-24", 5],
    ["The Dark Knight", "Action", "2008-07-18", 4],
    ["Pulp Fiction", "Crime", "1994-10-14", 4],
    ["The Lord of the Rings: The Return of the King", "Fantasy", "2003-12-17", 5]
];// Initial movie data

console.log(movieData);



let gridInstance = null;
let count = 0; // Grid.js instance
const renderGrid = () => {
    const gridContainer = document.getElementById("grid");
    gridContainer.innerHTML = ""; // Clear the container

    if (!gridInstance) {
        gridInstance = new gridjs.Grid(
            {
            columns: ["Title", 
                "Genre", 
                "Release Date", 
                "Rating",
                {
                    name: "Actions",
                    formatter: (_, row) => {
                        console.log(typeof(row.cells[0].data));
                        return gridjs.html(`
                            <button class = "btn btn-edit" onclick="editMovie('${row.cells[0].data}');">Edit</button>
                            <button class = "btn btn-delete" onclick="deleteMovie('${row.cells[0].data}');">Delete</button>
                        `);
                    }
                }
            ],
            sort: true,
            pagination: { limit: 10 },
            search: true,
            data: movieData,
        }).render(gridContainer);
    } else {
        // Update the data and reload
        gridInstance.updateConfig({
            data: movieData,
        }).forceRender();

    }
};


//Inital call to render the grid
renderGrid();

// Function to toggle the list and form
function toggleForm() {
    //console.log(movieData.length);
    document.getElementById("formContainer").classList.toggle("active");
    document.getElementById("listContainer").classList.toggle("active");
}

// Function to add a new movie
function submitMovie() {
    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const releaseDate = document.getElementById("releaseDate").value;
    const rating = document.getElementById("rating").value;
    movieData.push([title, genre, releaseDate, rating]);
    console.log("Moviedata length after submit: ", movieData.length);
    renderGrid();
    toggleForm();
    // Reset the form values
    document.getElementById("movieForm").reset();
}

// Function to delete a movie
function deleteMovie(movieName) {
    //console.log("Movie Name: ", movieName);
    let index = movieData.findIndex((movie) => movie[0] === movieName);
    console.log("Index: ", index);
    movieData.splice(index, 1);
    renderGrid();
}

//Function to edit a movie
function editMovie(movie) {
    
}
