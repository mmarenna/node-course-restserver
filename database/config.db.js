const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database started up!');
        
        
    } catch (error) {
        console.log(error);
        throw new Error('Error starting the database connection')
    }

}

module.exports = { dbConnection };