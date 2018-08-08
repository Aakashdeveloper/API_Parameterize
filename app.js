/***************Fecth data using mongodb where its is realted to model***********/
var express = require('express');
var mongodb = require('mongodb').MongoClient;

var app = express();

var port = process.env.PORT||3000; 
var commanRouter = express.Router();

commanRouter.route('/getProducts')
    .get(function(req,res){
        var url ="mongodb://bbhumi:bhumika@ds145380.mlab.com:45380/evan";
        mongodb.connect(url, (err, db) => {  
              if (err) {
                return console.log(err);
              }
              db.collection('products').find({}).toArray(
                function(err,data){
                    if(err)
                       
                       res.status(500).send(err);
                    else
                        res.setHeader('Access-Control-Allow-Origin','*')
                        res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept')
                        res.json(data);
        })
        })
        
});
commanRouter.route('/getProductDetails')
    .get(function(req,res){
        var url ="mongodb://bbhumi:bhumika@ds145380.mlab.com:45380/evan";
            var query = {};
            if(req.query.productId){
                query.productId = req.query.productId
                query = {"productId":parseInt(query.productId)}
                console.log(JSON.stringify(query))
            }else{
                query = req.query
            }
            
            mongodb.connect(url,(err,db) =>{
                if(err){
                    return console.log(err);
                }
                db.collection('products').find(query).toArray(
                    function(err,data){
                        if(err)
                           
                           res.status(500).send(err);
                        else
                            res.setHeader('Access-Control-Allow-Origin','*')
                            res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept')
                            res.json(data);
            })
            })

            
});



app.use('/api', commanRouter);

app.get('/',function(req,res){
    res.send("Working")
});
app.use(express.static(__dirname + '/public'));

app.listen(port, function(){
    console.log("running");
});
