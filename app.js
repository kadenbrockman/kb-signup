//jshint esversion: 6

const bodyParser = require("body-parser")
const express = require("express")
const request = require("request")
const https = require("https");

const app = express()


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.post("/", function(req,res){ 
    const firstName =req.body.userFirstName;
    const lastName =req.body.userLastName;
    const email = req.body.userEmail;
    

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = 'https://us1.api.mailchimp.com/3.0/lists/3747934965';
    const options = {
        method: "POST",
        auth: "starbuckscoffee:cd761c8585c62903e1b64e5ec537d79f-us1"
    }

   const request = https.request(url, options, function(response){

    if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html")

    } else {
    res.sendFile(__dirname + "/failure.html")

    }

        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })
    
request.write(jsonData);
request.end();

})
app.post("/failure", function(req,res){
    res.redirect("/")
})

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})




app.listen(process.env.PORT || 3000, function(){
    console.log("Sever is running on port 3000.")
})


// cd761c8585c62903e1b64e5ec537d79f-us1
// 3747934965