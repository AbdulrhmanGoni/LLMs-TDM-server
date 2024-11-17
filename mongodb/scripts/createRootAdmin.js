// This file is supposed to be executed by `Mongosh` inside mongodb container

db = db.getSiblingDB('admin')

db.createUser({
    user: process.env.DB_ADMIN_USERNAME,
    pwd: process.env.DB_ADMIN_PASSWORD,
    roles: [{ role: "root", db: "admin" }]
});
