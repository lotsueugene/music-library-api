const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();

const db = new Sequelize({
    dialect: 'sqlite',
    storage: `database/${process.env.DB_NAME}` || 'database/music_library.db',
    logging: console.log //shows SQL queries in the console
});

// Create database and models
async function setupDatabase() {
    try {
        await db.authenticate();
        console.log('Connection to database established successfully.');

        await db.sync({ force: true })
        console.log("Database and tables created successfully")

        await db.close();

    } catch(error) {
        console.error('Unable to connect to the database', error);
    }
};


const Track = db.define('Track', {
    trackId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    songTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artistName: {
        type: DataTypes.STRING,
        allowNull: false
    },
     albumName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
    type: DataTypes.INTEGER,
    validate: {
        min: 1
    }
    },
    releaseYear: {
        type: DataTypes.INTEGER
    }
});

// Export the model and the connection to use in other files 
module.exports = { db, Track };

// Run setup if this file is executed directly
if (require.main === module) {
    setupDatabase();
}