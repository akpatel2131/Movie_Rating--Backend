const Movie = require("../model/movie");

// Function to add a new movie to the database
const postMovies = async (data) => {
    try {
        // Create a new movie document in the database with the provided data
        const responseData = await Movie.create(data);
        return responseData;
    } catch (error) {
        // If an error occurs during the creation process, throw the error
        throw error;
    }
}

// Function to fetch movies from the database based on specified criteria
const fetchAllMovies = async (userId, query) => {
    try {
        // Extract query parameters
        const { genre, releaseYear, director } = query;

        // Construct a filter object based on provided query parameters
        const filter = { userId };
        if (genre) filter.genre = genre;
        if (releaseYear) filter.releaseYear = releaseYear;
        if (director) filter.director = director;

        // Use the constructed filter to find movies in the database
        const fetchAllData = await Movie.find(filter);
        return fetchAllData;
    } catch (error) {
        // If an error occurs during the fetch process, throw the error
        throw error;
    }
}

// Function to get a single movie by its ID
const getMoviesById = async (userId, taskId) => {
    try {
        // Find and return the movie with the specified ID and associated with the given user
        const responseData = await Movie.findOne({ userId, _id: taskId });
        return responseData;
    } catch (error) {
        // If an error occurs during the retrieval process, throw the error
        throw error;
    }
}

// Function to update a movie's information by its ID
const updateMovieByID = async (userId, taskId, movieData) => {
    try {
        // Update the movie with the specified ID and associated with the given user, with the provided data
        const responseData = await Movie.findOneAndUpdate({ userId, _id: taskId}, { $set: movieData }, { new: true });

        // If no movie is found for the provided ID and user, throw an error
        if (!responseData) {
            throw new Error("Movie does not exist");
        }
        return responseData;
    } catch (error) {
        // If an error occurs during the update process, throw the error
        throw error;
    }
}

// Function to delete a movie by its ID
const deleteMovieById = async (userId, taskId) => {
    try {
        // Find and delete the movie with the specified ID and associated with the given user
        const responseData = await Movie.findOneAndDelete({ userId, _id: taskId });
        return responseData;
    } catch (error) {
        // If an error occurs during the deletion process, throw the error
        throw error;
    }
}


module.exports = {
    postMovies,
    fetchAllMovies,
    getMoviesById,
    updateMovieByID,
    deleteMovieById
}