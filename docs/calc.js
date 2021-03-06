$(document).ready(function(){
    $("#critRate").parent().css('color','lightgray');
    $("#rate20").css('color','lightgray');
});

$("#displayCalc").click(function(){
    var baseATK = parseFloat($("#baseATK").val());
    var ATKrate = parseFloat($("#ATKrate").val());
    var ATKvalue = parseFloat($("#ATKvalue").val());

    // console.log(baseATK);
    // console.log(ATKrate);
    // console.log(ATKvalue);

    var displayATK = baseATK * (1 + ATKrate/100) + ATKvalue;
    $("#displayATK").val(displayATK);
});


$("#crit").change(function(){
    if($(this).prop("checked")){
        $("#critDmgRate").parent().css('color','black');
        $("#critDmgRate").css('color','black');
        $("#critLabel").css('color','black');
        $("#critDmgRate").prop("disabled",false);
        // console.log("true");
        // console.log($(this).prop("checked"))
    } else {
        $("#critDmgRate").parent().css('color','lightgray');
        $("#critDmgRate").css('color','lightgray');
        $("#critLabel").css('color','lightgray');
        $("#critDmgRate").prop("disabled",true);
        // console.log("false");
        // console.log($(this).prop("checked"));
    }
});

$("#mean").change(function(){
    if($(this).prop("checked")){
        $("#critRate").parent().css('color','black');
        $("#critRate").css('color','black');
        $("#meanLabel").css('color','black');
        $("#critRate").prop("disabled",false);
        $("#critDmgRate").parent().css('color','black');
        $("#critLabel").css('color','black');
        $("#critDmgRate").prop("disabled",false);
        // console.log("true");
        // console.log($(this).prop("checked"))
    } else {
        $("#critRate").parent().css('color','lightgray');
        $("#critRate").css('color','lightgray');
        $("#meanLabel").css('color','lightgray');
        $("#critRate").prop("disabled",true);
        // console.log("false");
        // console.log($(this).prop("checked"));
    }
});

$('#EMCalc').click(function(){
    var elementalMastery = parseFloat($('#elementalMastery').val());
    var VMDisplay = 25 * elementalMastery /(9*(elementalMastery+1400)) *100;
    var EMDisplay = VMDisplay * 2.4;
    // console.log(elementalMastery)
    // console.log(VMDisplay)
    // console.log(EMDisplay)

    $("#VapoMeltRate").val(VMDisplay.toFixed(1));
    $("#VMDisplay").val(VMDisplay.toFixed(1));
    $("#EMDisplay").val(EMDisplay.toFixed(1));
});

$("#VapoMelt").change(function(){
    if($(this).prop("checked")){
        $("#VMLabel").css('color','black');
        $("#VapoMeltRate").css('color','black');
        $("#VapoMeltRate").parent().css('color','black');
        $("#VapoMeltRate").prop("disabled",false);
        $("input[name=VM]:checked").parent().css('color','black');
        $("#rate20").children("input").prop("disabled",false);
        $("#rate15").children("input").prop("disabled",false);

        // console.log("true");
        // console.log($(this).prop("checked"))
    } else {
        $("#VMLabel").css('color','lightgray');
        $("#VapoMeltRate").css('color','lightgray');
        $("#VapoMeltRate").parent().css('color','lightgray');
        $("#VapoMeltRate").prop("disabled",true);
        $("#rate20").css('color','lightgray');
        $("#rate15").css('color','lightgray');
        $("#rate20").children("input").prop("disabled",true);
        $("#rate15").children("input").prop("disabled",true);
        // console.log("false");
        // console.log($(this).prop("checked"));
    }
});

$("input[name='VM']").change(function(){
    // console.log($(this).val());
    if($(this).val()=="2.0"){
        $("#rate20").css('color','black');
        $("#rate15").css('color','lightgray');
    } else{
        $("#rate15").css('color','black');
        $("#rate20").css('color','lightgray');
    }
})

$("#dmgCalc").click(function(){
    var displayATK = parseFloat($("#displayATK").val());
    var skillRate = parseFloat($("#skillRate").val());
    var elementalRate = parseFloat($("#elementalRate").val());
    var critDmgRate;
    var VapoMeltRate;
    var resRate;
    var resistance = parseFloat($("#resistance").val());
    var resDebuff = parseFloat($("#resDebuff").val());
    var level = parseInt($("#level").val());
    var enemyLv = parseInt($("#enemyLv").val());
    var defDebuff = parseFloat($("#defDebuff").val());

    // console.log("calc!");

    if($("#crit").prop("checked")){
        critDmgRate = parseFloat($("#critDmgRate").val());
        
    }else{
        critDmgRate = 0.0;
    }

    if($("#mean").prop("checked")){
        critDmgRate *= parseFloat($("#critRate").val())/100.0;
    }

    if($("#VapoMelt").prop("checked")){
        VapoMeltRate = parseFloat($("input[name=VM]:checked").val()) * (1.0 + parseFloat($("#VapoMeltRate").val()/100.0));
    }else{
        VapoMeltRate = 1.0;
    }
    
    var ATK = displayATK * skillRate/100.0 * (1.0 + elementalRate/100.0) * (1.0 + critDmgRate/100.0) * VapoMeltRate;
    
    // console.log(ATK);

    var resdiff = resistance - resDebuff;

    // console.log(resdiff);

    if(resdiff < 0.0 && resistance < 0.0){
        resRate = 1 - (resistance - resDebuff/2)/100;
    } else if(resdiff < 0.0 && resistance >= 0.0){
        resRate = 1 - resdiff/200;
    } else if(resdiff >= 0.0 && resdiff <= 75.0){
        resRate = 1 - resdiff/100;
    } 
    else {
        resRate = 1/(4 * resdiff/100 + 1);
    }

    // console.log(resRate);

    var def = (level+100.0)/((1.0-(defDebuff/100.0))*(enemyLv+100.0)+(level+100.3));
    
    // console.log(def);

    var damage = ATK * resRate * def;

    // console.log(resRate);
    // console.log(def);
    // console.log(damage);

    $("#damage").val(damage.toFixed(1));

})