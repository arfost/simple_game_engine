var scribe = require('scribe-js')({
      createDefaultConsole : false //Scribe won't attach a fresh console2 to process.console
    });

var getNewConsole = function(tags){
    return scribe.console({
      console : {
            alwaysTags : true,
            tagsColors : 'red',
            alwaysLocation : true,
            alwaysTime : true,
            alwaysDate : true,
            defaultTags : tags
      }
    });
}

var express = require('express');
      var app = express();


    app.set('port', (process.env.PORT || 5000));

    app.get('/', function(req, res) {
        res.send('Hello world, see you at /logs');
    });

    app.use('/logs', scribe.webPanel());

var port = app.get("port");

    app.listen(port, function() {
        //this.console.tag('start').log('Server listening at port ' + port);
    });

module.exports = getNewConsole;