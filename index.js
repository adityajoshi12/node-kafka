let app=require('express')();
let http=require('http').Server(app);
let io=require('socket.io')(http);
var kafka=require('no-kafka');
io.on('connection',(socket)=>{
console.log("user connected");
socket.on('disconnect',()=>{
    console.log('user disconnected');
});
});
http.listen(4000,()=>{
    console.log('server started on port 4000')
    var consumer=new kafka.SimpleConsumer({
        connectionString:"127.0.0.1:9093"
    });
    var dataHandler=function(messageSet,topic,partition){
        messageSet.forEach(element => {
            console.log(topic,partition,element.offset,element.message.value.toString('utf8'))

        });
    };
    return consumer.init().then(()=>{
        var v=consumer.subscribe('myTopic1',dataHandler)
        return v
    })
})