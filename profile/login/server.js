const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for the form data
const FormDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const FormDataModel = mongoose.model('FormData', FormDataSchema);

// Parse incoming request bodies
app.use(bodyParser.json());

// Handle form submissions
app.post('/submit-form', async (req, res) => {
    // Extract form data from request body
    const { name, email, message } = req.body;

    // Create a new FormData document
    const formData = new FormDataModel({ name, email, message });

    try {
        // Save the form data to the database
        await formData.save();
        res.status(200).json({ message: 'Form data saved successfully!' });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ message: 'An error occurred while saving form data.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
