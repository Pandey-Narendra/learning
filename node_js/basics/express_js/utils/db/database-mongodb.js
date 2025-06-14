const mongodb = require('mongodb');
const MongodbClient = mongodb.MongoClient;
let _db;

// expecting a function which is coming as a formal parameters to get execute inside our this mongoConnect function
const mongoConnect = (callback) => {
    
    const username = encodeURIComponent("NodeLearningUser");
    const password = encodeURIComponent("devnaren");
    const uri = `mongodb+srv://${username}:${password}@nodelearning.nvpzxls.mongodb.net/shop?retryWrites=true&w=majority&appName=NodeLearning`;

    MongodbClient.connect(uri)
        .then((client) => {
            _db = client.db();
            // Execute callback after successful connection
            callback();
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};



const getDB = () => {
    if(_db){
        return _db;
    }

    throw "No DB Found";
}


exports.mongoConnect = mongoConnect;
exports.getDB = getDB;