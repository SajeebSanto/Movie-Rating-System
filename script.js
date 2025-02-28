let movieData = [
    ["The Shawshank Redemption", "Drama", "1994-09-22", 5],
    ["The Godfather", "Crime", "1972-03-24", 5],
    ["The Dark Knight", "Action", "2008-07-18", 4],
    ["Pulp Fiction", "Crime", "1994-10-14", 4],
    ["The Lord of the Rings: The Return of the King", "Fantasy", "2003-12-17", 5]
];// Initial movie data

let gridInstance = null; // Grid.js instance
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
                            <button class = "btn btn-edit" onclick="editMovie('${row.cells[0].data}', '${row.cells[1].data}', '${row.cells[2].data}', ${row.cells[3].data});">Edit</button>
                            <button class = "btn btn-delete" onclick="deleteMovie('${row.cells[0].data}', '${row.cells[1].data}', '${row.cells[2].data}', ${row.cells[3].data});">Delete</button>
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

//Function to edit a movie
let editIndex = -1;
function editMovie(name, genre, releaseDate, rating) {
    document.getElementById("title").value = name;
    document.getElementById("genre").value = genre;
    document.getElementById("releaseDate").value = releaseDate;
    document.getElementById("rating").value = rating;
    editIndex = movieData.findIndex((movie) => {
        return (
            movie[0] === name &&
            movie[1] === genre &&
            movie[2] === releaseDate &&
            movie[3] === rating
        )
    });
    toggleForm();
}

// Function to add a new movie
function submitMovie() {
    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const releaseDate = document.getElementById("releaseDate").value;
    const rating = document.getElementById("rating").value;

    //Field Validations
    if (!title || !genre || !releaseDate || !rating) {
        alert("Please fill in all the fields.");
        return;
    }
    if(isNaN(rating) || rating < 1 || rating > 5) {
        alert("Rating should be a number between 1 and 5.");
        return;
    }

    if(editIndex !== -1) {
        movieData[editIndex] = [title, genre, releaseDate, rating];
        editIndex = -1;
    }
    else movieData.push([title, genre, releaseDate, rating]);
    renderGrid();
    toggleForm();
    // Reset the form values
    document.getElementById("movieForm").reset();
}

// Function to delete a movie
function deleteMovie(movieName, movieGenre, movieReleaseDate, movieRating) {
    let index = movieData.findIndex((movie) => {
        return (
            movie[0] === movieName &&
            movie[1] === movieGenre &&
            movie[2] === movieReleaseDate &&
            movie[3] === movieRating
        )
    });
    movieData.splice(index, 1);
    renderGrid();
}


