var Kafka = require('no-kafka');
var producer = new Kafka.Producer();
 
setInterval(()=>{
    return producer.init().then(function(){

    
        return producer.send({
            topic: 'myTopic1',
            partition: 0,
            message: {
                key:"1",
                value: new Date()
            }
        });
    
  
})
.then(function (result) {
  console.log(result)
});
},3000)