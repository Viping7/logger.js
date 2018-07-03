const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
var rootDir = '';
var configData = {
    'log-level':5,
    'log-type':'console',
    'time-stamp':true,
    'file-path':'/logs/'
};
var Logs;
module.exports.config = function(root,file){
    var filePath = path.join(root,file);
    rootDir = root;
    let data = fs.readFileSync(filePath)
    let parsedData = JSON.parse(data)
    configData = Object.assign(configData,parsedData);
    if(configData["log-type"]=='file'){
        if(!fs.existsSync(path.join(root,configData['file-path'])))
            fs.mkdirSync(path.join(root,configData['file-path']));
    }
    if(configData["log-type"]=='db'){
        mongoose.connect(configData["connection-string"]);
        var Schema = mongoose.Schema;
        const logsSchema = new Schema({
            "message": String,
            "log-type": String,
            "log-level": Number,
            "connection-object": Object,
            "time-stamp": Date
        })
        Logs = mongoose.model('logs', logsSchema);
    }
}

module.exports.info = function(message, object){
    if(configData['log-level'] >= 4)
        initalizeLoggerProcess('info', "\x1b[34m", message, object);
}

module.exports.debug = function(message, object){
    if(configData['log-level'] >= 3)
        initalizeLoggerProcess('debug', "\x1b[32m", message, object);
}

module.exports.warning = function(message, object){
    if(configData['log-level'] >= 2)
        initalizeLoggerProcess('warning', "\x1b[33m", message, object);
}

module.exports.error = function(message, object){
    if(configData['log-level'] >= 1)
        initalizeLoggerProcess('error', "\x1b[31m", message,object);
}

module.exports.critical = function(message, object){
    initalizeLoggerProcess('critical', "\x1b[41m", message,object);
}

function initalizeLoggerProcess(type, color, message, object){
    let date = new Date();
    let timeStamp = '';
    if(configData["time-stamp"]){
        timeStamp = date.toDateString() +' '+ date.toTimeString();
    }
    if(configData["log-type"] === 'console'){
        console.log(color ,type, timeStamp, "\x1b[0m", message, object || '');
    }
    if(configData["log-type"] === 'file'){
        let folderDate = date.toLocaleDateString().replace(/\//g, '-');
        let filename = path.join(rootDir,configData['file-path']+folderDate+ '_' +type+ '.log');
        let data = {
            "time-stamp" : timeStamp,
            "message": message,
        }
        if(object){
            data.object = object;
        }
        fs.writeFile(filename, JSON.stringify(data, null ,2),  {'flag':'a'},  function(err) {
            if (err) {
                
            }
        });
    }
    if(configData["log-type"] === 'db'){
        let dbtimeStamp = date.toDateString() +' '+ date.toTimeString();
        let data = {
                "message": message,
                "log-type": type,
                "log-level": configData["log-level"],
                "connection-object": object,
                "time-stamp": dbtimeStamp
            }
        var log = new Logs(data)
        log.save();
    }
}

