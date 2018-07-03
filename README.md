# advanced-node-logger

A Nodejs Logger plugin, with 3 options to write logs to
* Console
* File
* Database

## Version 1.0.0

## Getting started

### Simple Usage

 ```
 var logger = require('advanced-node-logger')
 logger.info("This is an info log")
```
This by defaults logs all types, info, debug, warning, error and critical and writes it in to console.


### Advanced Usage

#### Setting config file

create a json file with all options you want to set and pass the path of file to config function

log-config.json
```
{
    "log-level":4,
    "log-type":"console",
    "time-stamp":true,
}
```

app.js

```
  logger.config(__dirname, 'log-config.json');

```
PS: __dirname should be given as such for correct creation of logs

#### Log Types

##### Console Logs

By default all logs will be written on to console diffrentiated with color codes

log-config.json

```
{
    
    "log-type":"console",
    
}
```

##### File Logs

For file logs in the log-config.json set "log-type" to file and "file-path" to the folder you want to save logs to. By default logs will be stored in **/logs** directory
  
log-config.json

```
{
    "log-level":4,
    "log-type":"file",
    "file-path":"/logs/"
}
```
 
##### DB Logs

For storing logs in database connection string to the database has to be passed, and time stamp will be automatically stored in DB irrespective of "time-stamp" flag  

log-config.json

```
{
    "log-level":4,
    "log-type":"db",
    "connection-string":"mongodb://<dbusername>:<dbpassword>@ds121099.mlab.com:21029/<dbname>"
}
```

### Options

Options       | Values
------------- | -------------
log-level     | Takes numbers from 1-4 where, 1 - critical and error, 2 - critical, error and warning, 3- critical, error, warning and debug, 4- all 
log-type      | console, file and db. By default **console**
time-stamp    | true or false. By default **true**
file-path     | Takes the path where logs should be stored. By Default null
connection-string | Takes db connection string. By Default null

