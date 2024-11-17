// This file is supposed to be executed by `Mongosh` inside mongodb container

sh.enableSharding("llms-tdm");
console.log("Sharding has been enabled successfuly ✅")

sh.shardCollection("llms-tdm.instructions", {
    datasetId: 1
});
console.log("\"instructions\" collection has been sharded successfuly ✅")

