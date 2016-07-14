var TransitionsFactory = require('./Transitions/TransitionsFactory.js');

var listeJsonEtat;

var console = process.console('etatFactory');

var loadEtat = function(){

  var jsonEtat = require('./etatDefinitions.json');
  listeJsonEtat = new Map();
  for(var etat of jsonEtat){
    listeJsonEtat.set(etat.name, etat);
  }
}

var getEtat = function(etat){
    console.info('On recupere un nouvel etat '+etat);
  if(listeJsonEtat === undefined){
    loadEtat();
  } 
    var jsonEtat = JSON.parse(JSON.stringify(listeJsonEtat.get(etat)));
    console.info('On recupere un nouvel etat',listeJsonEtat,jsonEtat);
  return new Etat(jsonEtat);
}

class Etat{
  constructor(jsonChunk) {
      this.name = jsonChunk.name;
      this.desc = jsonChunk.desc;
      this.properties = jsonChunk.properties;
      this.transitions = [];
      for(var transition of jsonChunk.transitions){
        this.transitions.push(TransitionsFactory.getTransition(transition.type, transition.params));
      }
  }

  applyTransition(etat, perso){

    var newEtat = undefined;
    for(var i = 0; i<this.transitions.length && newEtat === undefined; i++){
      newEtat = this.transitions[i].execute(etat, perso);
    }
    return newEtat;

  }

}

module.exports.getEtat = getEtat;
