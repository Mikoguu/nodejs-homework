import express from 'express';

const app = express();

let timestamp = Date.now();
const DELAY = 1000;
const LIMIT = timestamp + 20000;

const PORT = 3000;

let connections = [];

app.get("/date", (req, res, next) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked"); 
  connections.push(res);
});


setTimeout(function run() {
    let date = new Date(timestamp);
    timestamp += 1000;
    console.log(date);

    connections.map(res => {
        if (timestamp > LIMIT) {
            res.write("END\n");
            res.end();
        } else if (timestamp == LIMIT) {
            res.write(`Server disconnection time is: ${date}\n`);
        } else {
            res.write(`Current time is: ${date}\n`);
        }
    });
 
  setTimeout(run, DELAY);
}, DELAY);

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
})

export default app;