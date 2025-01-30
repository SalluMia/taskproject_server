const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const responseHandler = require("./middlewares/responseHandler");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',  // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));  // Apply CORS middleware

// Apply global response middleware
app.use(responseHandler);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cars", require("./routes/carRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));

// Error handling middleware (must be last)
app.use(errorHandler);

console.log(process.env.EMAIL_USER)
console.log(process.env.EMAIL_PASS)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
