const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) return res.BadRequest("Category already exists");

    // Create the new category
    const category = new Category({ name });
    await category.save();

    return res.Created(category, "Category created successfully");
  } catch (error) {
    console.error("Error creating category:", error.message);
    return res.ServerError("An error occurred while creating the category. Please try again.");
  }
};

exports.getCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const categories = await Category.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ name: 1 });

    const totalCategories = await Category.countDocuments(query);
    return res.Success(
      { categories, totalCategories, totalPages: Math.ceil(totalCategories / limit), currentPage: page },
      "Categories retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return res.ServerError("An error occurred while fetching the categories. Please try again.");
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.NotFound("Category not found");

    await category.deleteOne();
    return res.Success(null, "Category deleted successfully");
  } catch (error) {
    console.error("Error deleting category:", error.message);
    return res.ServerError("An error occurred while deleting the category. Please try again.");
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.NotFound("Category not found");

    return res.Success(category, "Category updated successfully");
  } catch (error) {
    console.error("Error updating category:", error.message);
    return res.ServerError("An error occurred while updating the category. Please try again.");
  }
};
