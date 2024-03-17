const movieService = require("../services/movieService");

// Controller function to handle adding a new movie
const postMoviesController = async (req, res) => {
    try {
        // Get the user ID from the request
        const userId = req.user.id;

        // Extract movie data from the request body
        const movieData = req.body;

        // Add the user ID to the movie data
        movieData.userId = userId;

        // Call the movie service to add the movie to the database
        const data = await movieService.postMovies(movieData);

        // Send the response with the added movie data
        res.status(201).json(data);
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({
            message: error.message,
        });
    }
}

// Controller function to handle fetching all movies
const getAllMoviesController = async (req, res) => {
    try {
        // Get the user ID from the request
        const userId = req.user.id;

        // Extract query parameters from the request
        const query = req.query;

        // Call the movie service to fetch movies based on user ID and query parameters
        const fetchedData = await movieService.fetchAllMovies(userId, query);

        // Send the response with the fetched movie data
        res.status(200).json(fetchedData);
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({
            message: error.message,
        });
    }
}

// Controller function to handle fetching a movie by its ID
const getMoviesByIdController = async (req, res) => {
    try {
        // Get the movie ID from the request parameters
        const taskId = req.params.id;

        // Get the user ID from the request
        const userId = req.user.id;

        // Call the movie service to fetch the movie by its ID and user ID
        const fetchedData = await movieService.getMoviesById(userId, taskId);

        // If no movie is found, send a 404 response
        if (!fetchedData) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        // Send the response with the fetched movie data
        res.status(200).json(fetchedData);
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({
            message: error.message,
        });
    }
}

// Controller function to handle updating a movie by its ID
const updateMoviesController = async (req, res) => {
    try {
        // Get the movie ID from the request parameters
        const taskId = req.params.id;

        // Extract updated movie data from the request body
        const userData = req.body;

        // Get the user ID from the request
        const userId = req.user.id;

        // Call the movie service to update the movie by its ID and user ID with the provided data
        const updatedData = await movieService.updateMovieByID(userId, taskId, userData);

        if (!updatedData) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        // Send the response with the updated movie data
        res.status(200).json(updatedData);
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({
            message: error.message,
        });
    }
}

// Controller function to handle deleting a movie by its ID
const deleteMoviesController = async (req, res) => {
    try {
        // Get the movie ID from the request parameters
        const taskId = req.params.id;

        // Get the user ID from the request
        const userId = req.user.id;

        // Call the movie service to delete the movie by its ID and user ID
        const deletedData = await movieService.deleteMovieById(userId, taskId);

        if(!deletedData) {
            return res.status(404).json({message : "Movie not found"});
        }

        // Send a success response indicating the movie was deleted
        res.status(204).json({
            message: "Deleted successfully",
        });
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({
            message: error.message,
        });
    }
}



module.exports = {
    postMoviesController,
    getAllMoviesController,
    getMoviesByIdController,
    updateMoviesController,
    deleteMoviesController
}

