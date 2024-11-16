var shard1Config = {
    _id: "shard1-rs",
    version: 1,
    members: [
        {
            _id: 1,
            host: "shard1-a:27017",
            priority: 3
        },
        {
            _id: 2,
            host: "shard1-b:27017",
            priority: 2
        },
        {
            _id: 3,
            host: "shard1-c:27017",
            priority: 1
        }
    ]
}

module.exports = shard1Config;