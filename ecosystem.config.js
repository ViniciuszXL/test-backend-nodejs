module.exports = {
    apps: [{
        name: "catalog-rest-api",
        script: "main.js",
        instances: 0,
        exec_mode: "cluster"
    }]
}