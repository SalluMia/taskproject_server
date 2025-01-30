const Car = require("../models/Car");
const Category = require("../models/Category");

exports.createCar = async (req, res) => {
  try {
    const { category, make, model, color, registrationNo } = req.body;

    // Check if the category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.BadRequest("Invalid category");
    }

    // Check for duplicate registration number
    const existingCar = await Car.findOne({ registrationNo });
    if (existingCar) {
      return res.BadRequest("A car with this registration number already exists.");
    }

    // Create the new car
    const car = new Car({ category, make, model, color, registrationNo });
    await car.save();

    return res.Created(car, "Car created successfully");
  } catch (error) {
    console.error("Error creating car:", error.message);
    return res.ServerError("An error occurred while creating the car. Please try again.");
  }
};

exports.getCars = async (req, res) => {
  try {
    const { page = 1, limit = 10 , search = "" } = req.query;
    const query = search
      ? {
          $or: [
            { "category.name": { $regex: search, $options: "i" } }, // Search in category name
            { make: { $regex: search, $options: "i" } }, // Search in make
            { model: { $regex: search, $options: "i" } }, // Search in model
          ],
        }
      : {};
    const cars = await Car.find(query)
      .populate("category", "name") // Populate category name
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ model: 1 });

    const totalCars = await Car.countDocuments(query);
    return res.Success(
      { cars, totalCars, totalPages: Math.ceil(totalCars / limit), currentPage: page },
      "Cars retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching cars:", error.message);
    return res.ServerError("An error occurred while fetching the cars. Please try again.");
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.NotFound("Car not found");

    await car.deleteOne();
    return res.Success(null, "Car deleted successfully");
  } catch (error) {
    console.error("Error deleting car:", error.message);
    return res.ServerError("An error occurred while deleting the car. Please try again.");
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.NotFound("Car not found");

    return res.Success(car, "Car updated successfully");
  } catch (error) {
    console.error("Error updating car:", error.message);
    return res.ServerError("An error occurred while updating the car. Please try again.");
  }
};
