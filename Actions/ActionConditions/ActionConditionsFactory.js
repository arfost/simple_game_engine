'use strict'

//var listeActionCondition;

var rawActionCondition;

var loadRawActionConditions = function(){
rawActionCondition = new Map();
rawActionCondition.set('random', random);
}

var getActionCondition = function(actionCondition, params){
if(rawActionCondition === undefined){
  loadRawActionConditions();
}
return new ActionCondition(actionCondition, params);
}

class ActionCondition{
constructor(ActionCondition, params) {
  if (ActionCondition instanceof Function){
    this.ActionCondition = ActionCondition;
  }else{
    this.ActionCondition = rawActionCondition.get(ActionCondition);
  }

    this.params = params;
}

execute(tile, perso){
  return this.ActionCondition(tile, perso, this.params);
}

}

module.exports.getActionCondition = getActionCondition;

//////definitions des ActionCondition standards

//@author: Ofeldawn
var random = function(tile, perso, params){

   var result = Math.floor((Math.random() * 100) + 1);
   if (result <= params.probability){
       return true;
   } else {
       return false;
   }
}
