import express from 'express';

const app = express();

//middleware that when it receives a request that has a json body/
//json payload, it is going to parse that and automatically make that 
//available to us on request.body
app.use(express.json());
app.post('/hello',(req,res)=>{
    console.log(req.body);
    res.send('Hello!');
})

app.listen(8000,()=>{
    console.log('Server is listening on port 8000.')
})