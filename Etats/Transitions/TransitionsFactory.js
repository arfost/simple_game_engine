'use strict'

//var listeTransition;

var rawTransitions;

var console = process.console('TransistionFactory');

var loadRawTransitions = function(){
  rawTransitions = new Map();
    var comportements = require('./comportements.js');
    for(var comportement in comportements){
        rawTransitions.set(comportement, comportements[comportement]);
        console.log("parcours des comportements", comportement, comportements[comportement]);
    }
    
}

var getTransition = function(transition, params){
  if(rawTransitions === undefined){
    loadRawTransitions();
  }
  return new Transition(transition, params);
}

class Transition{
  constructor(transition, params) {
    if (transition instanceof Function){
      this.transition = transition;
    }else{
      this.transition = rawTransitions.get(transition);
    }
      this.params = params;
  }

  execute(etat, perso){
    return this.transition(etat, perso, this.params);
  }

}

module.exports.getTransition = getTransition;

//////definitions des Transitions standards


