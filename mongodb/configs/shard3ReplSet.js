var shard3Config = {
    _id: "shard3-rs",
    version: 1,
    members: [
        {
            _id: 1,
            host: "shard3-a:27017",
            priority: 3
        },
        {
            _id: 2,
            host: "shard3-b:27017",
            priority: 2
        },
        {
            _id: 3,
            host: "shard3-c:27017",
            priority: 1
        }
    ]
}

module.exports = shard3Config;