var express = require('express');
var app = express();
var AWS = require("aws-sdk");
var s3bucket = new AWS.S3();
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
var text;
var a,b;


app.get('/abc', function (req, res) {



  function write(){
    var params = {Bucket: 'sasmithaa', Key:type + '.txt' , Body: text};  
    s3bucket.putObject(params, function(err, data) {
    if (err) {
          console.log("Error uploading data: ", err);
    } else {
          console.log("Successfully uploaded data to bucket");
    }
      });
  }


  async function sentiment() {
        
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;
    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    res.send(`Sentiment score: ${sentiment.score} \n  Sentiment magnitude: ${sentiment.magnitude}`);
    b=`Sentiment score: ${sentiment.score} \n  Sentiment magnitude: ${sentiment.magnitude}`;
    write();
    
  }


async function entity(){
      
        const document = {
          content: text,
          type: 'PLAIN_TEXT',
        };
        const [result] = await client.analyzeEntities({document});
        const entities = result.entities;
        console.log('Entities:');
        entities.forEach(entity => {
          console.log(entity.name);
          console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
          res.send(entity.name + '\n' + ` - Type: ${entity.type}, Salience: ${entity.salience}`);
          
         
          
        });
        write();
        
    }
    

    
async function syntax(){
        
        const document = {
          content: text,
          type: 'PLAIN_TEXT',
        };
        const encodingType = 'UTF8';
        const [syntax] = await client.analyzeSyntax({document, encodingType});
        console.log('Tokens:');
      
        
        syntax.tokens.forEach(part => {
          console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
          res.json( part.partOfSpeech );
          
           
          
        });
        
        
    }




let type = req.query.nlp;
text = req.query.input;

if (type=="syntax"){
  write();
        
        syntax();
    }
    else if (type=="sentiment"){
        
        sentiment();
        

    }
    else if (type=="entity"){
        
        entity();
        
    }
    //res.send(typeof text);

});
app.listen(5200);
console.log("server listening in http://127.0.0.1:5200/abc")