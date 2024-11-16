var configsvrConfig = {
    _id: "config-servers-rs",
    configsvr: true,
    version: 1,
    members: [
        {
            _id: 1,
            host: "configsvr1:27017",
            priority: 1
        },
        {
            _id: 2,
            host: "configsvr2:27017",
            priority: 0.5
        },
        {
            _id: 3,
            host: "configsvr3:27017",
            priority: 0.5
        }
    ]
};

module.exports = configsvrConfig;