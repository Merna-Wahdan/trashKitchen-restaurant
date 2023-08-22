const express = require("express")
const app = express()

// Make everything inside of public/ available
app.use(express.static('public'));

app.listen(3000, () => {
    console.log("My first app listening on port 3000")
})

//app.get 

//Contact
app.get("/contact", (request, response, next) => {
    // console.log(request.protocol)
    // console.log(request.query)
    // console.log("we recieved a request page 5");
    response.sendFile(__dirname + '/views/contact.html');
})

//Home page
app.get('/', (request, response, next) => {
        // console.log(request.protocol)

    response.sendFile(__dirname + '/views/homepage.html');
})