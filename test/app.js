var express = require('express');
var app = express();
var logger = require('../index');
logger.config(__dirname, 'test-config.json');
app.listen(3000,function(){
    logger.info("asdsada");
})