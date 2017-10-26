
const express = require('express');


const morgan = require('morgan');
// morgan provides easy logging for express, and by default it logs to stdout
// which is a best practice in Docker. Friends don't let friends code their apps to
// do app logging to files in containers.

// Constants
const PORT = process.env.PORT || 8080;
// if you're not using docker-compose for local development, this will default to 8080
// to prevent non-root permission problems with 80. Dockerfile is set to make this 80
// because containers don't have that issue :)


let app = express();
let healthToogle = true;


app.use(morgan('common'));

app.get('/', function (req, res) {
    res.send('Hello Docker World\n');
});

app.get('/toggle', function (req, res) {
    healthToogle = ! healthToogle;
    res.status(200).send('Updated health state to beeing ', healthToogle ? 'healthy' : 'unhealthy');
});

app.get('/healthz', function (req, res) {
    // do app logic here to determine if app is truly healthy
    // you should return 200 if healthy, and anything else will fail
    // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
    res.status(healthToogle ? 200 : 500).send({ health: healthToogle, ts: Date.now() }).end();
});

const server = app.listen(PORT, function () {
    console.log('Webserver is ready and listening on', PORT);
});



// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint() {
    console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
    shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm() {
    console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
    shutdown();
});

// shut down server
function shutdown() {
    server.close(function onServerClosed(err) {
        if (err) {
            console.error(err);
            process.exitCode = 1;
        }
        process.exit();
    })
}