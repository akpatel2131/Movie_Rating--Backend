const mongoose = require("mongoose");

// Define the movie schema
const movieSchema = new mongoose.Schema({
    // Title field with type string and required
    title: {
        type: String,
        required: true,
    },
    // Director field with type string and required
    director: {
        type: String,
        required: true
    },
    // Genre field with type string, enum specifying allowed values, and default value
    genre: {
        type: String,
        enum: ["romance", "drama", "sci-fi", "adventure", "comedy"],
        default: "drama"
    },
    // ReleaseYear field with type string and required
    releaseYear: {
        type: String,
        required: true,
    },
    // Description field with type string
    description: {
        type: String,
    },
    // User ID field with type ObjectId referencing the User model and required
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" // Reference to the User model
    }
}, {
    // Automatically add createdAt and updatedAt fields
    timestamps: true
});

// Create Movies model based on the schema
const Movies = mongoose.model("Movies", movieSchema);

module.exports = Movies;