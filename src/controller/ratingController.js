const ratingService = require("../services/ratingService");

// Controller function to create a new review for a movie
const createReviewController = async (req, res) => {
    try {
        // Construct review data from request body, including movie ID and user ID
        const reviewData = {
            ...req.body,
            movieId: req.params.movieId,
            userId:  req.user.id,
        }

        // Call the rating service to create the review
        const responseData = await ratingService.createReview(reviewData);

        // Send a success response with the ID of the created review
        res.status(201).json({
            message: "Rating submitted successfully",
            reviewId: responseData._id
        });
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({
            message: error.message
        });
    }
}

// Controller function to fetch all reviews for a movie
const getAllReviewController = async (req, res) => {
    try {
        // Call the rating service to fetch all reviews for the specified movie
        const responseData = await ratingService.fetchAllReview(req.params.movieId);

        // Send a success response with the fetched review data
        res.status(200).json(responseData);
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({
            message: error.message
        });
    }
}

// Controller function to get the average rating for a movie
const getAverageRatingController = async (req, res) => {
    try {
        // Call the rating service to calculate the average rating for the specified movie
        const responseData = await ratingService.getAverageRating(req.params.movieId);

        // Send a success response with the calculated average rating
        res.status(200).json({
            averageMovieRating: responseData
        });
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({
            message: error.message
        });
    }
}

// Controller function to update a review for a movie
const updateReviewController = async (req, res) => {
    try {
        // Extract movie ID, review ID, and user ID from request parameters
        const { movieId, reviewId } = req.params;
        const userId = req.user.id;
        const reviewData = req.body;

        // Call the rating service to update the review
        const responseData = await ratingService.updateReview(userId, movieId, reviewId, reviewData);

        // If no review is found, send a 404 response
        if (!responseData) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        // Send a success response with the updated review data
        res.status(200).json({
            message: "Data updated successfully",
            responseData,
        });
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({
            message: error.message
        });
    }
}

// Controller function to delete a review for a movie
const deleteReviewController = async (req, res) => {
    try {
        // Extract movie ID, review ID, and user ID from request parameters
        const { movieId, reviewId } = req.params;
        const userId = req.user.id;

        // Call the rating service to delete the review
        const responseData = await ratingService.deleteReview(userId, movieId, reviewId);

        // If no review is found, send a 404 response
        if (!responseData) {
            return res.status(404).json({
                message: "Data not found"
            });
        }

        // Send a success response indicating the review was deleted
        res.status(204).json({
            message: "Data deleted successfully",
        });
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({
            message: error.message
        });
    }
}



module.exports = {
    createReviewController,
    getAllReviewController,
    getAverageRatingController,
    updateReviewController,
    deleteReviewController
}
