var scribe = require('scribe-js')({
      createDefaultConsole : false //Scribe won't attach a fresh console2 to process.console
    });
var console = scribe.console({
      console : {
        alwaysTags : true,
        tagsColors : 'red',
          alwaysLocation : true,
        alwaysTime : true,
        alwaysDate : true
      }
    });
      var express = require('express');
      var app = express();


    app.set('port', (process.env.PORT || 5000));

    app.get('/', function(req, res) {
        res.send('Hello world, see you at /logs');
    });

    app.use('/logs', scribe.webPanel());

var port = app.get("port");

    app.listen(port, function() {
        console.tag('start').log('Server listening at port ' + port);
    });

class ConsoleWrapper{
  constructor(tag){
    this.tag = tag;

  }

    /*log(mess, tags){
      //console.log("je passe dans le xrapper");
        if(tags === undefined){
            this.console.tag('default').log(mess);
        }else{
            this.console.tag(tags).log(mess);
        }
    }
    warn(mess, tags){
      if(tags === undefined){
        this.console.tag('default').warning(mess);
      }else{
        this.console.tag(tags).warning(mess);
      }
    }
    info(mess, tags){
      if(tags === undefined){
        this.console.tag('default').info(mess);
      }else{
        this.console.tag(tags).info(mess);
      }
    }
    error(mess, tags){
      if(tags === undefined){
        this.console.tag('default').error(mess);
      }else{
        this.console.tag(tags).error(mess);
      }
    }*/
    
    log(){
      console.tag(this.tag).log(Array.prototype.slice.call(arguments, 0));
    }
    warn(){
      console.tag(this.tag).warning(Array.prototype.slice.call(arguments, 0));
    }
    info(){
      console.tag(this.tag).info(Array.prototype.slice.call(arguments, 0));
    }
    error(){
      console.tag(this.tag).error(Array.prototype.slice.call(arguments, 0));
    }
}

var newConsole = function(tag){
    return new ConsoleWrapper(tag);
}

module.exports = newConsole;
