// This file is supposed to be executed by `Mongosh` inside mongodb container

sh.addShard("shard1-rs/shard1-a:27017")
sh.addShard("shard1-rs/shard1-b:27017")
sh.addShard("shard1-rs/shard1-c:27017")
console.log("Shard 1 added to te router successfully ✅")

sh.addShard("shard2-rs/shard2-a:27017")
sh.addShard("shard2-rs/shard2-b:27017")
sh.addShard("shard2-rs/shard2-c:27017")
console.log("Shard 2 added to te router successfully ✅")

sh.addShard("shard3-rs/shard3-a:27017")
sh.addShard("shard3-rs/shard3-b:27017")
sh.addShard("shard3-rs/shard3-c:27017")
console.log("Shard 3 added to te router successfully ✅")
