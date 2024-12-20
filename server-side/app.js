const path = require("path"); 
const express = require("express"); 
const app = express(); 
const getMovie = require("./utils/movieApi")

//port 
const PORT = process.env.PORT || 4000; 

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../client/public')

// setup static directory to serve
app.use(express.static(publicDirectoryPath));
 
//main page 
app.get("/", (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'index.html'));
    
});

//routers 

app.get("/movie", (req, res) => {
    const searchTerm = req.query.search
    if(!searchTerm) {
        return res.send({ error: "You must provide a title name"})
    }

    getMovie(searchTerm, (error, data) => {
        if(error) {
            return res.send({error})
        }

        res.send(data)
    })
})


//start up my server 
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`); 
})