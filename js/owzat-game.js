
const boxBatsman = document.createElement("div");
const boxBowler = document.createElement("div");
const uiGameBox = OwzatUI_CreateGameBox();
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
    document.body.appendChild(uiGameBox);

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

    updateBatsman();
    updateBowler();
}

function bowlBall() { //=======================================================
    let result = ozInnings.ProcessBowl();
    console.log(result);
}

function bowlOver() { //=======================================================
      for (let counter = ozInnings.overBall; counter <= 6; counter++) {
        bowlBall()
    }
    // console.log("Bowl Over to be implemented.");
}

function viewScorecard() { //==================================================
    console.log("View Scorecard to be implemented.");
}

function updateBatsman() {
    // create message
    let htmMessage = "<b>" + ozInnings.playerNameAtBat + "</b>... ";

    boxBatsman.innerHTML = htmMessage
}

function updateBowler() {
    // create message
    let htmMessage = "<b>" + ozInnings.playerNameAtBowl + "</b>... ";

    boxBowler.innerHTML = htmMessage
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

function OwzatUI_CreateGameBox() {
    // create div element
    let box = document.createElement("div");

    // set required div style
    box.style.margin = "5px 0";
    box.style.borderTop = "solid 1px black";

    boxBatsman.style.margin = "5px";
    boxBatsman.style.padding = "5px";
    boxBatsman.style.border = "solid 1px black";
    boxBatsman.innerHTML = "BATSMAN_1";
    box.appendChild(boxBatsman);

    boxBowler.style.margin = "5px";
    boxBowler.style.padding = "5px";
    boxBowler.style.border = "solid 1px black";
    boxBowler.innerHTML = "BOWLER";
    box.appendChild(boxBowler);

    return box;
}