const uiMessageBox = OwzatUI_CreateMessageBox();

const cmdBowlBall = OwzatUI_CreateButton({ caption: "Bowl Ball", func: bowlBall });
const cmdBowlOver = OwzatUI_CreateButton({ caption: "Bowl Over", func: bowlOver });
const cmdViewScorecard = OwzatUI_CreateButton({ caption: "View Scorcard", func: viewScorecard });
const cmdBar = document.createElement("div");

const ozInnings = new OwzatInningsRecord(teams[0], teams[1]);

function initialise() { //=====================================================
    // set document styles
    document.body.style.fontFamily = "Calibri";
    document.body.style.fontSize = "10pt";

    // create command bar
    cmdBar.appendChild(cmdBowlBall);
    cmdBar.appendChild(cmdBowlOver);
    cmdBar.appendChild(cmdViewScorecard);
    document.body.appendChild(cmdBar);

    // create ui message box
    document.body.appendChild(uiMessageBox);

    let msg = document.createElement("div");
    msg.style.padding = "1px 5px";
    msg.style.borderBottomWidth = "1px";
    msg.style.borderBottomStyle = "solid";
    msg.style.borderBottomColor = "rgba(0,0,0,1)";
    msg.style.backgroundColor = "rgba(0,0,0,0.2)";
    msg.innerHTML = "<b>" + ozInnings.teamNameAtBat + "</b> bat first.";
    uiMessageBox.insertAdjacentElement("afterbegin", msg);
}

function bowlBall() { //=======================================================
    // create message
    let htmMessage = "<i>" + ozInnings.overCount + "." + ozInnings.overBall + "</i> : ";
    htmMessage += "<b>" + ozInnings.playerNameAtBowl + "</b> bowls to ";
    htmMessage += "<b>" + ozInnings.playerNameAtBat + "</b>... ";

    // create message container
    let msg = document.createElement("div");
    msg.style.padding = "1px 5px";
    msg.style.borderBottomWidth = "1px";
    msg.style.borderBottomStyle = (ozInnings.overBall == 1) ? "solid" : "dotted";
    msg.style.borderBottomColor = (ozInnings.overBall == 1) ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.2)";

    let result = ozInnings.ProcessBowl() // BOWL THE BALL

    htmMessage += (result.runs == 0) ? "no runs were scored." : "and scores <b>" + result.runs + "</b>.";

    // set message in container
    msg.innerHTML = htmMessage;
    // add message to message box
    uiMessageBox.insertAdjacentElement("afterbegin", msg);

    if (ozInnings.overBall == 1) {
        let msgNewOver = document.createElement("div");
        msgNewOver.style.padding = "1px 5px";
        msgNewOver.style.borderBottomWidth = "1px";
        msgNewOver.style.borderBottomStyle = "solid";
        msgNewOver.style.borderBottomColor = "rgba(0,0,0,1)";
        msgNewOver.style.backgroundColor = "rgba(0,0,0,0.2)";
        msgNewOver.innerHTML = "<i>End of over " + (ozInnings.overCount - 1) + "</i>. Score is <b>" + ozInnings.scoreRuns + "</b>." ;
        uiMessageBox.insertAdjacentElement("afterbegin", msgNewOver);
    }
}

function bowlOver() { //=======================================================
    // const ballsToCompleteOver = ozInnings.ballsLeftInOver;
    // for (let counter = 0; counter < ballsToCompleteOver; counter++) {
    //     console.log(counter, ozInnings.ballsLeftInOver);
    //     bowlBall()
    // }
    console.log("Bowl Over to be implemented.");
}

function viewScorecard() { //==================================================
    console.log("View Scorecard to be implemented.");
}

// HTML Element creation functions ////////////////////////////////////////////

function OwzatUI_CreateButton(params) { //=====================================
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

function OwzatUI_CreateMessageBox() { //=======================================
    // create div element
    let box = document.createElement("div");

    // set required div style
    box.style.margin = "5px 0";
    box.style.overflowY = 'auto';
    box.style.borderTop = "solid 1px black";
    box.style.height = '500px';

    return box;
}
