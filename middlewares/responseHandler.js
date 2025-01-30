const responseHandler = (req, res, next) => {
    res.Success = (data, message = "Success") => {
      res.status(200).json({ success: true, message, data });
    };
  
    res.Created = (data, message = "Resource created successfully") => {
      res.status(201).json({ success: true, message, data });
    };
  
    res.BadRequest = (message = "Bad Request") => {
      res.status(400).json({ success: false, message });
    };
  
    res.Unauthorized = (message = "Unauthorized access") => {
      res.status(401).json({ success: false, message });
    };
  
    res.Forbidden = (message = "Access forbidden") => {
      res.status(403).json({ success: false, message });
    };
  
    res.NotFound = (message = "Resource not found") => {
      res.status(404).json({ success: false, message });
    };
  
    res.ServerError = (message = "Internal server error") => {
      res.status(500).json({ success: false, message });
    };
  
    next();
  };
  
  module.exports = responseHandler;
  