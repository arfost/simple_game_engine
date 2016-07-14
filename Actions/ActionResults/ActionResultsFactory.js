'use strict'

//var listeFiltre;

var console = process.console('actionResult');

var rawActionResults;

var loadRawActionResults = function(){
  rawActionResults = new Map();
  rawActionResults.set('addEtat', addEtat);
}

var getActionResult = function(actionResult, params){
  if(rawActionResults === undefined){
    loadRawActionResults();
  }
  return new ActionResult(actionResult, params);
}

class ActionResult{
  constructor(actionResult, params) {
    if (actionResult instanceof Function){
      this.actionResult = actionResult;
    }else{
      this.actionResult = rawActionResults.get(actionResult);
    }

      this.params = params;
  }

  execute(tile, perso){
    return this.actionResult(tile, perso, this.params);
  }

}

module.exports.getActionResult = getActionResult;

//////definitions des filtres standards

var addEtat = function(tile, perso, params){
    console.info("pret a l'ajout d'un etat",params.etat);
    var etat = perso.addEtat(params.etat);
    console.log("etat ajouté normalement", etat);
    if(params.cible != undefined){
        etat.properties[params.cible] = params.value;
    }
}
