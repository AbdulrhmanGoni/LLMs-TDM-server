// This file supposed to be executed by `Mongosh`

const configFileName = process.argv[process.argv.length - 1]

var config = require(`/configs/${configFileName}.js`);

let rsAlreadyInitialized = false

try {
    rs.initiate(config, { force: true });
} catch (error) {
    if (error.message === "already initialized") {
        rsAlreadyInitialized = true
        console.log(`The "${config._id}" replica set has been already initialized 🚀`)
    } else {
        throw error
    }
}

if (rsAlreadyInitialized) {
    process.exit(0)
}

function isItReadyMember(member) {
    if (member._id === 1) {
        return member.stateStr === "PRIMARY"
    } else {
        return member.stateStr === "SECONDARY"
    }
}

function checkMembersStatus(members) {
    return members.every(isItReadyMember)
}

async function checkReplicaSetReadiness() {
    return new Promise((resolve) => {
        console.log(`Initializing "${config._id}" replica set...`)
        setInterval(() => {
            if (checkMembersStatus(rs.status().members)) {
                resolve(`"${config._id}" replica set was initialized successfully ✅ 🚀`)
            }
        }, 1000)
    })
}

checkReplicaSetReadiness().then((result) => { console.log('\x1b[32m%s\x1b[0m', result) });
