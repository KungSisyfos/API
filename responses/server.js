/**
 * Express Server
 */

// Require express
const express = require("express");
const oneliners = require("./data/oneliners.json");
const fs = require("node:fs/promises");
const PORT = 3000;

// Create a new Express app
const app = express();

/**
 * middleware
*/

app.use((req, res, next) => {
    const now = new Date();
    console.log(`${now.toLocaleString} ${req.method} ${req.path}`);

    next();

});


// Listen for incoming GET requests to "/"
app.get("/", (req, res) => {
    console.log("Someone requested my (g)root 🌲");
    console.log("Requested method:", req.method);
    console.log("Requested path:", req.path);
    res.send({ message: "Oh, hi there 😊" });
});

// Listen for incoming POST requests to "/"
app.post("/", (req, res) => {
    console.log("Someone tried to mail me something 💌");
    res.send({ message: "I'm not a mailbox 😡" });
});

// Listen for incoming GET requests to "/coffee"
app.get("/coffee", (req, res) => {
    console.log("☕️ yum");
    res.send({
        can_you_have_too_much: false,
        coffee: "is good for you",
        do_i_need_moar_coffee: true,
        message: "Lolcats are funny",
        nicknames: [
            "coffee",
            "life-giving liquid",
            "black gold",
        ],
    });
});

// Listen for incoming GET requests to "/joke"
app.get("/joke", (req, res) => {

    
    const i = Math.floor(Math.random()*oneliners.length);
    // Respond with an object with the oneliner as the `joke` attribute
    const joke = oneliners[i];

    res.send({
        joke,
    });

    console.log("error error error: ", err);

    // Somehow get all oneliners from `data/oneliners.json`
    // Get a random oneliner from the array of oneliners
    
});

app.get("/textjoke", async (req, res) => {
	try {
		// read file `./data/oneliners.txt`
		const rawFile = await fs.readFile("./data/oneliners.txt", { encoding: "utf-8" });

		// split the file on newline
		const oneliners = rawFile.split("\n");

		// sample the array ☕️
		const joke = _.sample(oneliners);

		res.send({
			joke,  // joke: joke
		});
	} catch (err) {
		console.error("ERROR! ERROR! Could not find ./data/oneliners.txt!");

		// Let the requester know something has gone wrong
		res.status(500).send({
			message: "Could not read file with oneliners 😢",
		});
	}
});

// Listen for incoming GET requests to "/lol"
app.get("/lol", (req, res) => {
    res.send({ message: "I was wondering why the frisbee kept getting bigger and bigger, but then it hit me." });
});

// Listen for incoming GET requests to "/users"
app.get("/users", (req, res) => {
    res.send([
        {
            username: "johan",
            profile_picture: "https://thumb.ac-illust.com/3c/3cea0e36d984553348ca536f07ca7617_t.jpeg",
        },
        {
            username: "pelle",
            profile_picture: null,
        },
        {
            username: "kajsa",
            profile_picture: null,
        },
        {
            username: "mimmi",
            profile_picture: null,
        },
    ]);
});

// Catch-all route
app.use((req, res) => {
    res.status(404).send({ message: `Cannot ${req.method} ${req.path}`});
});

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
    // Will be invoked once the server has started listening
    console.log(`🥳 Yay, server started on localhost:${PORT}`);
});
