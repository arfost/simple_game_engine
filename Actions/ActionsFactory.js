var FiltresFactory = require('./Filtres/FiltresFactory.js');
var ActionConditionFactory = require('./ActionConditions/ActionConditionsFactory.js');
var ActionResultFactory = require('./ActionResults/ActionResultsFactory.js');

var console = process.console('actionFactory');

var listeJsonActions;

var loadJsonActions = function(){

  var jsonAction = require('./actionsDefinitions.json');
  listeJsonActions = new Map();
  for(var action of jsonAction){
    listeJsonActions.set(action.name, action);
  }
}

var getAction = function(action){
  if(listeJsonActions === undefined){
    loadJsonActions();
  }
    
    var jsonAction = JSON.parse(JSON.stringify(listeJsonActions.get(action)));
  return new Action(jsonAction);
}

var listeActions;

var loadActions = function(){
    if(listeJsonActions === undefined){
        loadJsonActions();
    }
    listeActions = [];
    for(var action of listeJsonActions.values()){
        listeActions.push(new Action(action));
    }
}

var getListAction = function(){
  if(listeActions === undefined){
    loadActions();
  }
  return listeActions;
}

class Action{

    constructor(jsonChunk) {
        this.name = jsonChunk.name;
        this.desc = jsonChunk.desc;
        this.properties = jsonChunk.properties;

        this.filtres = [];
        for(var filtre of jsonChunk.filtres){
            this.filtres.push(FiltresFactory.getFiltre(filtre.type, filtre.params));
        }

        this.actionCondtions = [];
        for(var actionCondtion of jsonChunk.actionCondtions){
            this.actionCondtions.push(ActionConditionFactory.getActionCondition(actionCondtion.type, actionCondtion.params));
        }

        this.actionResultsSuccess = [];
        for(var actionResult of jsonChunk.actionResultsSuccess){
            this.actionResultsSuccess.push(ActionResultFactory.getActionResult(actionResult.type, actionResult.params));
        }

        this.actionResultsFail = [];
        for(var actionResult of jsonChunk.actionResultsFail){
            this.actionResultsFail.push(ActionResultFactory.getActionResult(actionResult.type, actionResult.params));
        }
    }

    applyFilters(tile, perso){
        var result = true;
        for(var filtre of this.filtres){
            //console.log('test pour '+etat);
            result = result ? (filtre.execute(tile, perso)) : false;
            //console.log('test pour '+etat, result);
        }
        return result;
    }

    execute(tile, perso){
        var result = true;
        for(var actionCondtion of this.actionCondtions){
            console.log('test pour '+actionCondtion,'inAction');
            result = result ? (actionCondtion.execute(tile, perso)) : false;
            console.log(['test pour '+actionCondtion, result],'inAction');
        }

        if(result){
            console.log('reussite','inAction');
            for(var actionResult of this.actionResultsSuccess){
                console.log(['test pour '+actionResult, actionResult],'inAction');
                actionResult.execute(tile, perso);
                
            }
        }else{
            console.log('echec','inAction');
            for(var actionResult of this.actionResultsFail){
                //console.log('test pour '+etat);
                actionResult.execute(tile, perso);
                //console.log('test pour '+etat, result);
            }
        }
    }

}

module.exports.getAction = getAction;
module.exports.getListAction = getListAction;
