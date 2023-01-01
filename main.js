function generatePassword() {
  // Get the length of the password
  var length = document.getElementById("length").value;
  
  // Set up the character sets for the password
  var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowercase = "abcdefghijklmnopqrstuvwxyz";
  var numbers = "0123456789";
  var symbols = "!@#$%^&*()_+-=[]{}|;':,.<>?";
