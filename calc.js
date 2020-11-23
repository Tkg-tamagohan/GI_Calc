$("#displayCalc").click(function(){
    var baseATK = parseFloat($("#baseATK").val());
    var ATKrate = parseFloat($("#ATKrate").val());
    var ATKvalue = parseFloat($("#ATKvalue").val());

    // console.log(baseATK);
    // console.log(ATKrate);
    // console.log(ATKvalue);

    var displayATK = baseATK * ATKrate + ATKvalue;
    $("#displayATK").val(displayATK);
});


$("#crit").change(function(){
    if($(this).prop("checked")){
        $("#critDmgRate").css('background-color','#fff');
        $("#critLabel").css('background-color','#fff');
        $("#critDmgRate").prop("disabled",false);
        // console.log("true");
        // console.log($(this).prop("checked"))
    } else {
        $("#critDmgRate").css('background-color','gray');
        $("#critLabel").css('background-color','gray');
        $("#critDmgRate").prop("disabled",true);
        // console.log("false");
        // console.log($(this).prop("checked"));
    }
});

$("#VapoMelt").change(function(){
    if($(this).prop("checked")){
        $("#VMLabel").css('background-color','#fff');
        $("#VapoMeltRate").css('background-color','#fff');
        $("#VapoMeltRate").prop("disabled",false);
        // console.log("true");
        // console.log($(this).prop("checked"))
    } else {
        $("#VMLabel").css('background-color','gray');
        $("#VapoMeltRate").css('background-color','gray');
        $("#VapoMeltRate").prop("disabled",true);
        // console.log("false");
        // console.log($(this).prop("checked"));
    }
});

$("#dmgCalc").click(function(){
    var displayATK = parseFloat($("#displayATK").val());
    var skillRate = parseFloat($("#skillRate").val());
    var elementalRate = parseFloat($("#elementalRate").val());
    var critDmgRate;
    var VapoMeltRate;
    var resRate;
    var resistance = parseFloat($("#resistance").val());
    var resDebuff = parseFloat($("#resDebuff").val());
    var level = parseFloat($("#level").val());
    var enemyLv = parseFloat($("#enemyLv").val());
    var defDebuff = parseFloat($("#defDebuff").val());

    // console.log("calc!");

    if($("#crit").prop("checked")){
        critDmgRate = parseFloat($("#critDmgRate").val());
    }else{
        critDmgRate = 0.0;
    }

    if($("#VapoMelt").prop("checked")){
        VapoMeltRate = parseFloat($("input[name=VM]:checked").val()) * (1 + parseFloat($("#VapoMeltRate").val()/100));
    }else{
        VapoMeltRate = 1.0;
    }
    
    var ATK = displayATK * skillRate/100 * (1 + elementalRate/100) * (1 + critDmgRate/100) * VapoMeltRate;
    
    // console.log(ATK);

    var resdiff = resistance - resDebuff;

    // console.log(resdiff);

    if(resdiff < 0){
        resRate = resdiff/2;
    } else if(resdiff >= 0 && resdiff < 75){
        resRate = resdiff;
    } else {
        resRate = 1/(4 * resdiff + 1);
    }

    var def = (level+100)/((1-defDebuff/100)*(enemyLv+100)+(level+100));

    var damage = ATK * (1 - resRate/100) * def;

    // console.log(resRate);
    // console.log(def);
    // console.log(damage);

    $("#damage").val(damage.toFixed(1));

})