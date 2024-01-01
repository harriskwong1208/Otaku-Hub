import express from 'express';

const app = express();

//middleware that when it receives a request that has a json body/
//json payload, it is going to parse that and automatically make that 
//available to us on request.body
app.use(express.json());

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