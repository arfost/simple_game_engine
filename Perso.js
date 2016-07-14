"use strict";

var ActionsFactory = require('./Actions/ActionsFactory.js');
var EtatFactory = require('./Etats/EtatsFactory.js');

var console = process.console('perso');

class Perso {
    constructor(name) {
        console.log("I'm in the constructor!");
        this.name = name;
        this.etats = new Map();
        //this.etats.set('localisation',{statut:'immobile',pos:{x:0,y:0}});
    }

    getName(){
      //console.log("get mon nom est : "+this.name);
      return this.name;
    }

    setName(name){
      this.name = name;
    }

    getActionsForCase(tile){
        var listeActions = ActionsFactory.getListAction();
        //console.log("Liste actions recupérée, taille :"+listeActions.length);
        var listeRealAction = [];
        for(var action of listeActions){
            //console.log(action.filtres);
            var result = action.applyFilters(tile, this);
            //console.log("Test de filtre d'action :"+result);
            if(result){
                listeRealAction.push(action);
            }
        }
        return listeRealAction;
    }
    
    executeAction(action, tile){
        action.execute(tile, this);
    }

    advanceEtats(){
        var newEtatNames = [];
        for (var [name, etat] of this.etats) {
        //console.log(name, etat);
            var newEtatName = etat.applyTransition(etat, this);
            console.log("On reçoit : "+newEtatName);
            if(newEtatName != undefined){
                this.etats.delete(name);
                if(newEtatName != "" ){
                    newEtatNames.push(newEtatName);
                }
            }
        }
        for(var newEtatName of newEtatNames){
            console.log("transition amene nouvel etat : "+newEtatName);
            this.etats.set(newEtatName,EtatFactory.getEtat(newEtatName));
        }
    }

    getEtat(etat){
      return this.etats.get(etat);
    }

    addEtat(etat){
        var newEtat = EtatFactory.getEtat(etat);
        console.info('On ajoute un nouvel etat',newEtat);
        this.etats.set(etat,newEtat);
        return newEtat;
    }

}

module.exports = Perso;
