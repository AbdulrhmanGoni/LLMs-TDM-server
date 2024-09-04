// This file supposed to be executed by `Mongosh`

const config = {
    _id: "llms-tdm-set",
    version: 1,
    members: [
        {
            _id: 1,
            host: "primary-mongodb:27017",
            priority: 3
        },
        {
            _id: 2,
            host: "secondary-mongodb-1:27017",
            priority: 2
        },
        {
            _id: 3,
            host: "secondary-mongodb-2:27017",
            priority: 1
        }
    ]
};

let rsAlreadyInitialized = false

try {
    rs.initiate(config, { force: true });
} catch (error) {
    if (error.message === "already initialized") {
        console.log("The replica set is already initialized")
        rsAlreadyInitialized = true
    } else {
        throw error
    }
}

if (rsAlreadyInitialized) {
    process.exit(0)
}

function isItReadyMember(member) {
    if (member.name === "primary-mongodb:27017") {
        return member.state === 1
    } else {
        return member.state === 2
    }
}

function checkMembersStatus(members) {
    return members.every(isItReadyMember)
}

async function checkReplicaSetReadiness() {
    return new Promise((resolve) => {
        console.log("Waiting the database to be ready...")
        setInterval(() => {
            if (checkMembersStatus(rs.status().members)) {
                resolve("The database is ready to recieve queries")
            }
        }, 1000)
    })
}

checkReplicaSetReadiness().then((result) => { console.log(result) });
