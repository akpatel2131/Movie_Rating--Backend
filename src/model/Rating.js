const mongoose = require("mongoose");

// Define the rating schema
const ratingSchema = new mongoose.Schema({
    // Rating field with type number, minimum value of 0, maximum value of 5, and required
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    // Text field with type string
    text: {
        type: String,
    },
    // Movie ID field with type ObjectId referencing the Movie model, and required
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Movie", // Reference to the Movie model
    },
    // User ID field with type ObjectId referencing the User model, and required
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", // Reference to the User model
    }
}, {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
});

// Create Rating model based on the schema
const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;