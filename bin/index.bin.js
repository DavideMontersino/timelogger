#!/usr/bin/env node
'use strict';

var fs = require("fs")
var path = require("path")

// Configuration stuff
var file = getUserHome() + '/log.txt';

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

try {
	var fileExists = fs.lstatSync(file);	
} catch (error){
	console.log('log file not existing... creating!')
	fs.closeSync(fs.openSync(file, 'w'));
}

var logtext = "#notask";
if (process.argv.length > 2) {
    logtext = process.argv.splice(2).join(' ');
}


    
var data = 	fs.readFileSync(file); //read existing contents into data
var fd = fs.openSync(file, 'w+');
var date = Date.now();
var buffer = new Buffer(date + ' ' + logtext + '\n');
fs.writeSync(fd, buffer, 0, buffer.length); //write new data
fs.writeSync(fd, data, 0, data.length); //append old data
fs.close(fd);