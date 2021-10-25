const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
  cloud_name: 'techloset-trainings', 
  api_key: '776812514164281', 
  api_secret: 'zYoMGDwHOxGfCfdCGbwfLtV_cvc' 
}); 
module.exports = cloudinary;