'use strict'

//var listeFiltre;

var rawFiltres;

var loadRawFiltres = function(){
  rawFiltres = new Map();
  rawFiltres.set('checkEtatPresent', checkEtatPresent);
    //var checkEtatPresent = rawFiltres.get('checkEtatPresent');
}

var getFiltre = function(filtre, params){
  if(rawFiltres === undefined){
    loadRawFiltres();
  }
  return new Filtre(filtre, params);
}

class Filtre{
  constructor(filtre, params) {
    //console.log("Creation de filtre avec le filtre : ", filtre);
    if (filtre instanceof Function){
      this.filtre = filtre;
    }else{
      //console.log("Creation de filtre avec la chaine "+filtre+" : ", rawFiltres.get(filtre));
      this.filtre = rawFiltres.get(filtre);
    }

      this.params = params;
  }

  execute(tile, perso){
    return this.filtre(tile, perso, this.params);
  }

}

module.exports.getFiltre = getFiltre;

//////definitions des filtres standards

var checkEtatPresent = function(tile, perso, params){
  var result = true;
  //console.log('On passe dans la fonction standard');
  //console.log("etat filtre test : ",perso.getEtat('faim'));
  for(var etat of params){
    //console.log('filtre test pour '+etat);
    result = result ? (perso.getEtat(etat)) !== undefined : false;
    //console.log('filtre test pour '+etat, result);
  }
  return result;
}
