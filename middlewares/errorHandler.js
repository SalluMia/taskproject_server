const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message);
  
    if (err.name === "ValidationError") {
      return res.BadRequest(err.message);
    }
  
    if (err.name === "CastError") {
      return res.NotFound("Invalid ID format");
    }
  
    res.ServerError();
  };
  
  module.exports = errorHandler;
  