var shard2Config = {
    _id: "shard2-rs",
    version: 1,
    members: [
        {
            _id: 1,
            host: "shard2-a:27017",
            priority: 3
        },
        {
            _id: 2,
            host: "shard2-b:27017",
            priority: 2
        },
        {
            _id: 3,
            host: "shard2-c:27017",
            priority: 1
        }
    ]
}

module.exports = shard2Config;