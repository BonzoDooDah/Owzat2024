// HTML Element creation functions

function ozuiCreate_Button(params) {
    // create button element
    let btn = document.createElement("button");

    // set default button style
    btn.type = "button";
    btn.textContent = params.caption;
    btn.style.font = "inherit";
    btn.style.margin = "2px";

    // set event listener for click event
    btn.addEventListener("click", (ev) => {
        params.func();
    })

    return btn;
}

function ozuiCreate_MessageBox() {
    // create div element
    let box = document.createElement("div");

    // set required div style
    box.style.margin = "5px 0";
    box.style.overflow = "auto";
    box.style.borderTop = "solid 1px black";
    box.style.borderBottom = "solid 1px black";

    return box;
}

function ozuiCreate_MessageBallBowled(balls, message){
    // create message
    let msg = ozuiCreate_Message("<i>" + ozuiFormat_Overs(balls) + "</i> : " + message);

    // set required div style
    msg.style.borderBottom = (ballCounter % 6) == 0 ? "solid 1px black" : "dotted 1px rgba(128,128,128,0.5)";

    return msg;
}

function ozuiCreate_Message(message, backcolor = 'transparent'){
    // create div element
    let msg = document.createElement("div");

    // set required div style
    msg.style.padding = "1px 5px";
    msg.style.borderBottom = "solid 1px black";
    msg.style.backgroundColor = backcolor;
    
    // set formatted text message
    msg.innerHTML = message;

    return msg;
}

// String formatting functions

function ozuiFormat_Overs(balls) {
    let ball = (balls % 6) + 1;
    let over = Math.trunc(balls / 6);

    return over.toString() + "." + ball.toString();
}

function ozuiFormat_BowlerBatsmanRuns(nameBowler, nameBatsman, runs) {
    return "<b>" + nameBowler + "</b> bowls ball, <b>" + nameBatsman + "</b> scores <b>" + runs.toString() + "</b> runs.";
}

function ozuiFormat_TeamWonToss(nameTeam, decision) {
    return "<b>" + nameTeam + "</b> won the toss and decided to <b>" + decision+ ".";
}
