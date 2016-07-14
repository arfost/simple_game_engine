
process.console = require('./ConsoleWrapper.js');
var console = process.console('appPrincipale');



var Perso = require('./Perso.js');

var clement = new Perso('clement');
console.log('Perso s\'apelle : '+clement.getName(),'gen');
clement.addEtat("satiete");
//console.log('Perso s\'apelle : '+clement.getName(),'gen');
//clement.addEtat("localisation");
for(var i = 0; i < 8;i++){
    console.info("§§§§§§ nouveau tour :: "+i,'boucle');
    for (var [name, etat] of clement.etats) {
        console.log("Nouvel etat :: "+name,etat);
    }
    var actionsPossible = clement.getActionsForCase({});
    for (var action of actionsPossible) {
        console.error(["Nouvelle action disponible :: "+action.name]);
    }
    if(i == 6){
        console.warn(["Execution de l'action : "],'boucle');
        clement.executeAction(actionsPossible[0]);
    }

    clement.advanceEtats();
    
}
