const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("base de datos online");
  } catch (error) {
    console.log(error);
    throw new error("Error en la base de datos");
  }
};

module.exports = {
  dbConnection,
};
