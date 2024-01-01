import express from 'express';

const app = express();


//Mock database for testing 
let gamesInfo = [{
    name:"persona",
    sales:12312312321,
    reviews:[]
},{
    name:"godofwar",
    sales:100000,
    reviews:[],
}]





//middleware that when it receives a request that has a json body/
//json payload, it is going to parse that and automatically make that 
//available to us on request.body
app.use(express.json());


//Test post method for the mock database 
app.post('/games/:name/reviews',(req,res)=>{
    const {name}  = req.params;
    const {review} = req.body;
    const game = gamesInfo.find(a => a.name === name);
    if(game){
        game.reviews.push({review});
        // res.send(`Reviewed added to ${name}.`);
        res.send(game.reviews)
    }else{
        res.send(`${name} does not exsist in the database.`);
    }
})








//Testing post endpoint
app.post('/hello',(req,res)=>{
    res.send(`Hello ${req.body.name}!!`);
})

//Testing get endpoint and URL parameter
app.get('/hello/:name',(req,res)=>{
    const {name} = req.params;
    res.send(`Hello ${name} !!`);
})

app.listen(8000,()=>{
    console.log('Server is listening on port 8000.')
})