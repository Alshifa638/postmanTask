
let express=require("express");
let app=express();

app.use(express.json());
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
       res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Orihgin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Expose-Headers","Authorization" );
    next();
});
//const port=2410;
var port=process.env.PORT || 2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));
let axios=require("axios");


  app.post("/getData", function(req,res){
   console.log(req.body)
   let token =req.body.authorization?req.body.authorization:"";
    console.log("token",token)
if(req.body.method=="GET"){
   
    axios.get(req.body.url,{headers:{authorization:token}})
    .then( function (response){
     if(typeof(response.data)=="number"){
        res.setHeader("Authoriation",token)
        res.send(response.data.toString());
     }
     else{
        res.send(response.data);
     }
    })
    .catch(function(error){
    if(error.response){
            let {status,statusText}=error.response;
            res.status(401).send(statusText);
        } 
        else res.status(404).send(error);
    });
}
else if(req.body.method=="POST"){
    let body=req.body.body;
    axios.post(req.body.url,body,{headers:{authorization:token}})
    .then( function (response){
        console.log(response.data)
    res.setHeader("Authoriation",token)
    res.send(response.data);
    })
    .catch(function(error){
    if(error.response){
            let {status,statusText}=error.response;
            console.log(status,statusText);
            res.status(401).send(statusText);
        } 
        else res.status(404).send(error);
    });
}
else if (req.body.method=="PUT"){
   
        let body =req.body.body;
       let id=req.params.id;
            axios.put(req.body.url,body, {headers:{authorization:token} })
            .then(function (response){
                console.log(response.data);
                res.send(response.data)
             })
             .catch(function (error){
                if(error.response){
                    console.log(error);
                    let {status,statusText}=error.response;
                    console.log(status,statusText);
                    res.status(status,statusText);
                }
                else res.status(404).send(error) 
                    });
                }
else if (req.body.method=="DELETE"){   
    axios.delete(req.body.url, {headers:{authorization:token} })
    .then(function (response){
        console.log(response.data);
        res.send("deleted successfully")
     })
     .catch(function (error){
        if(error.response){
            console.log(error);
            let {status,statusText}=error.response;
            console.log(status,statusText);
            res.status(status,statusText);
        }
        else res.status(404).send(error) 
            }); 
}     
});
