
const Rating = require("../model/Rating");



// Function to create a new review
const createReview = async (reviewData) => {
    try {
        // Create a new rating document with the provided review data
        const data = await Rating.create(reviewData);
        return data;
    } catch (error) {
        // If an error occurs during the creation process, throw the error
        throw error;
    }
}

// Function to fetch all reviews for a movie
const fetchAllReview = async (movieId) => {
    try {
        // Find and return all rating documents associated with the specified movie ID
        const data = await Rating.find({ movieId });
        return data;
    } catch (error) {
        // If an error occurs during the fetch process, throw the error
        throw error;
    }
}

// Function to calculate the average rating for a movie
const getAverageRating = async (movieId) => {
    try {
        // Find all rating documents associated with the specified movie ID
        const data = await Rating.find({ movieId });

        // Calculate the total rating by summing up all ratings
        const totalRating = data.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0);

        // Calculate the average rating by dividing the total rating by the number of ratings and rounding up
        return Math.ceil(totalRating / data.length);
    } catch (error) {
        // If an error occurs during the calculation process, throw the error
        throw error;
    }
}

// Function to update a review
const updateReview = async (userId, movieId, reviewId, reviewData) => {
    try {
        // Find and update the rating document with the specified user ID, movie ID, and review ID with the provided review data
        const updateData = await Rating.findOneAndUpdate({ userId, movieId, _id: reviewId }, { $set: reviewData }, { new: true });
        return updateData;
    } catch (error) {
        // If an error occurs during the update process, throw the error
        throw error;
    }
}

// Function to delete a review
const deleteReview = async (userId, movieId, reviewId) => {
    try {
        // Find and delete the rating document with the specified user ID, movie ID, and review ID
        const updateData = await Rating.findOneAndDelete({ userId, movieId, _id: reviewId });
        return updateData;
    } catch (error) {
        // If an error occurs during the deletion process, throw the error
        throw error;
    }
}



module.exports = {
    createReview,
    fetchAllReview,
    getAverageRating,
    updateReview,
    deleteReview
}