const sequelize= require('sequelize');
const Op = sequelize.Op;

const db= new sequelize(
    'covid19',
    'root',
    'admin',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)

//table to store user details
const users= db.define('users',{
    username: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    first_name: sequelize.STRING,
    last_name: sequelize.STRING,
    email_id: sequelize.STRING,
    mobile_number: sequelize.STRING,
    address: sequelize.STRING,
    profile_picture: sequelize.STRING
});

//table to store donations
const donations= db.define('donations',{
    username: sequelize.STRING,
    subject: sequelize.STRING,
    name: sequelize.STRING,
    email_id: sequelize.STRING,
    mobile_number: sequelize.STRING,
    address: sequelize.STRING,
    Medicalquantityapprox: sequelize.STRING,
    Clothesquantityapprox: sequelize.STRING,
    Booksquantityapprox: sequelize.STRING,
    FoodPacketsquantityapprox: sequelize.STRING,
    Groceriesquantityapprox: sequelize.STRING,
    quantityapprox: sequelize.STRING,
    status: sequelize.STRING
});

function admin_callback(){
    db.query(`INSERT IGNORE INTO users (username,password,first_name,last_name,email_id,mobile_number,profile_picture)` +
            `VALUES ('admin','9073326812','Aanshuman','Sharma','shareforindiahelpinghands@yahoo.com','9426375332','000.png')`);
}

db.sync().then(function(){
    console.log('Database is syncronized');
    admin_callback();
});

module.exports = {
    Op,
    db,
    users,
    donations
};