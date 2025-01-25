const boxMessage = BfxCreateMessageBox();

var ballCounter = 0;
const inningsRecord = [new TeamInningsRecord(), new TeamInningsRecord()];
var idBattingTeam = BfxRandomInt(2);
var idBowlingTeam = Math.abs(idBattingTeam - 1);
const bowlingPair = [0, 0];
var idBowler = BfxRandomInt(2);
const battingPair = [0, 0];
var idBatsman = BfxRandomInt(2);

function initialise() {
    // to do
    document.body.appendChild(BfxCreateButton({
        caption: "Bowl Ball",
        func: BfxBowlBall
    }));
    document.body.appendChild(BfxCreateButton({
        caption: "Bowl Over",
        func: BfxBowlOver
    }));
    document.body.appendChild(BfxCreateButton({
        caption: "View Scorcard",
        func: () => { console.log("Scorecard to be implemented."); }
    }));

    document.body.style.fontFamily = "Calibri";
    document.body.style.fontSize = "10pt";

    document.body.appendChild(boxMessage);

    /////////////////////////////////////////////////////////////////////////////

    inningsRecord[0].initialise(teams[0]);
    inningsRecord[1].initialise(teams[1]);
    console.log(inningsRecord);

    bowlingPair[0] = inningsRecord[idBowlingTeam].team.bowlingStarters[0];
    bowlingPair[1] = inningsRecord[idBowlingTeam].team.bowlingStarters[1];

    battingPair[0] = inningsRecord[idBattingTeam].team.battingOrder[0];
    battingPair[1] = inningsRecord[idBattingTeam].team.battingOrder[1];

    BfxStartMatch();
}

function BfxCreateButton(params) {
    let btn = document.createElement("button");

    btn.type = "button";
    btn.textContent = params.caption;
    btn.style.font = "inherit";
    btn.style.margin = "2px";

    btn.addEventListener("click", (ev) => {
        params.func();
    })

    return btn;
}

function BfxCreateMessageBox() {
    let box = document.createElement("div");

    box.style.margin = "5px 0";
    box.style.overflow = "auto";
    box.style.borderTop = "solid 1px black";
    box.style.borderBottom = "solid 1px black";

    return box;
}

function BfxFormatBallCounter() {
    let ball = (ballCounter % 6) + 1;
    let over = Math.trunc(ballCounter / 6);

    return over.toString() + "." + ball.toString();
}

function BfxStartMatch() {
    let msg = document.createElement("div");
    msg.style.backgroundColor = "rgba(0,0,0, 0.1)";
    msg.innerHTML = "<b>" + inningsRecord[idBattingTeam].team.teamname + "</b> won the toss and decided to bat.";

    boxMessage.insertAdjacentElement("afterbegin", msg);
}

function BfxBowlBall() {
    let msg = document.createElement("div");
    msg.style.borderBottom = (ballCounter % 6) == 0 ? "solid 1px black" : "dotted 1px rgba(100,100,100,0.5)";
    msg.innerHTML = BfxFormatBallCounter() + " : ";

    let bowlRandom = BfxRandomInt(6);
    switch (bowlRandom) {
        case 5:
            msg.innerHTML += "<b style='color: red'>Owzat!</b>";
            break;

        default:
            msg.innerHTML += OwzatFormatStrBoxMsgRunsScored(inningsRecord[idBowlingTeam].players[idBowler].name, inningsRecord[idBattingTeam].players[idBatsman].name, bowlRandom);
            if ((bowlRandom % 2) == 1) idBatsman = Math.abs(idBatsman - 1);
            break;
    }
    ballCounter++;

    boxMessage.insertAdjacentElement("afterbegin", msg);

    BfxCheckOver();
}

function BfxBowlOver() {
    for (let i = (ballCounter % 6); i < 6; i++) {
        BfxBowlBall();
    }
}

function BfxCheckOver() {
    if ((ballCounter % 6) == 0) {
        idBowler = Math.abs(idBowler - 1);
        idBatsman = Math.abs(idBatsman - 1);
    }
}