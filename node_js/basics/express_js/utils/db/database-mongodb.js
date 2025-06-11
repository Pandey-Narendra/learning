const mongodb = require('mongodb');
const MongodbClient = mongodb.MongoClient;

// expecting a function which is coming as a formal parameters to get execute inside our this mongoConnect function
const mongoConnect = (callback) => {
    
    const username = encodeURIComponent("NodeLearningUser");
    const password = encodeURIComponent("devnaren");
    const uri = `mongodb+srv://${username}:${password}@nodelearning.nvpzxls.mongodb.net/?retryWrites=true&w=majority&appName=NodeLearning`;

    MongodbClient.connect(uri)
        .then((client) => {
            // console.log("connected");

            // Execute callback after successful connection
            callback(client);
        })
        .catch((err) => {
            console.log(err);
        });
};


module.exports = mongoConnect;
