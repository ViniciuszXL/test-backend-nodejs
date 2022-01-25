module.exports = {
    apps: [{
        name: "catalog-rest-api",
        script: "./dist/main.js",
        instances: 0,
        exec_mode: "cluster"
    }]
}