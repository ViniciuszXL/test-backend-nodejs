import createCore from './core-app.js'

const server = createCore();

server.start().then(console.log).catch(console.log);
