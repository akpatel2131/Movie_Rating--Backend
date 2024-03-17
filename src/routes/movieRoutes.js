const express = require("express");
const route = express.Router();
const movieController = require("../controller/movieController");
const ratingController = require("../controller/ratingController");

const authenticateToken = require("../middleware/authenticateToken");


// Routes for movie-related operations
route.post("/", authenticateToken, movieController.postMoviesController); // Route to add a new movie
route.get("/", authenticateToken, movieController.getAllMoviesController); // Route to fetch all movies
route.get("/:id", authenticateToken, movieController.getMoviesByIdController); // Route to fetch a movie by ID
route.put("/:id", authenticateToken, movieController.updateMoviesController); // Route to update a movie by ID
route.delete("/:id", authenticateToken, movieController.deleteMoviesController); // Route to delete a movie by ID

// Routes for review-related operations
route.post("/:movieId/reviews", authenticateToken, ratingController.createReviewController); // Route to add a new review for a movie
route.get("/:movieId/reviews", authenticateToken, ratingController.getAllReviewController); // Route to fetch all reviews for a movie
route.get("/:movieId/averageRating", authenticateToken, ratingController.getAverageRatingController); // Route to fetch the average rating for a movie
route.put("/:movieId/reviews/:reviewId", authenticateToken, ratingController.updateReviewController); // Route to update a review for a movie by ID
route.delete("/:movieId/reviews/:reviewId", authenticateToken, ratingController.deleteReviewController); // Route to delete a review for a movie by ID



module.exports = route;