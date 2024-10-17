
var config = {
    _id: "dev-llms-tdm-set",
    version: 1,
    members: [
        {
            _id: 1,
            host: "primary-dev-mongodb:27017",
            priority: 3
        },
        {
            _id: 2,
            host: "secondary-dev-mongodb-1:27017",
            priority: 2
        },
        {
            _id: 3,
            host: "secondary-dev-mongodb-2:27017",
            priority: 1
        }
    ]
};

module.exports = config