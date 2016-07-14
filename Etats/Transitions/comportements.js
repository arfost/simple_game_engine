var console = process.console('TransitionComportement');

module.exports = {
    decount : function(etat, perso, params){
        if(etat.properties[params.property] <= 0){
            return params.next;
        }else{
            etat.properties[params.property] --;
            return undefined;
        }
    },
    checkEtatPresent : function(etat, perso, params){
        var result = true;
        //console.log('On passe dans la fonction standard');
        for(var etatTest of params.etats){
            console.log('test pour '+etatTest,perso.getEtat(etatTest));
            result = result ? !((perso.getEtat(etatTest)) === undefined) : false;
            //console.log('test pour '+etat, result);
        }
        if(result){
            return params.next;
        }else{
            return undefined;
        }
    }
}