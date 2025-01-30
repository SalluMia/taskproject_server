const welcomeEmailTemplate = (name, password) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .header {
      background: #007bff;
      color: white;
      padding: 15px;
      border-radius: 8px 8px 0 0;
      font-size: 20px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
      font-size: 16px;
      color: #333;
    }
    .footer {
      font-size: 14px;
      color: gray;
      margin-top: 20px;
    }
    .password-box {
      background: #007bff;
      color: white;
      padding: 10px;
      font-size: 18px;
      font-weight: bold;
      border-radius: 5px;
      display: inline-block;
      margin-top: 15px;
    }
    .btn {
      background: #28a745;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      font-weight: bold;
      border-radius: 5px;
      display: inline-block;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Welcome to Car Management</div>
    <div class="content">
      <p>Hello <strong>${name}</strong>,</p>
      <p>Thank you for signing up for Car Management! Your account has been created successfully.</p>
      <p>Your temporary password is:</p>
      <div class="password-box">${password}</div>
      <p>Please log in and change your password for security reasons.</p>
      <a href="https://your-website.com/login" class="btn">Login Now</a>
    </div>
    <div class="footer">
      If you did not sign up for this account, please ignore this email or contact support.
    </div>
  </div>
</body>
</html>
`;

module.exports = { welcomeEmailTemplate };
