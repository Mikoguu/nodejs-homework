import express from 'express';

const app = express();

let timestamp = Date.now();

const limit = timestamp + parseInt(process.env.LIMIT); 
const delay = parseInt(process.env.DELAY);
const port = parseInt(process.env.PORT);


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
        if (timestamp > limit) {
            res.write("END\n");
            res.end();
        } else if (timestamp == limit) {
            res.write(`Server disconnection date is: ${date}\n`);
        } else {
            res.write(`Current time is: ${date}\n`);
        }
    });
 
  setTimeout(run, delay);
}, delay);

app.listen(port, () => {
    console.log("Server is running on port 3000");
})

export default app;