
const boxBatsman1 = document.createElement('div');
const boxBatsman2 = document.createElement('div');
const boxBowler = document.createElement('div');
const uiGameBox = OwzatUI_CreateGameBox();
const uiMessageBox = OwzatUI_CreateMessageBox();

const cmdBowlBall = OwzatUI_CreateButton({ caption: 'Bowl Ball', func: bowlBall });
const cmdBowlOver = OwzatUI_CreateButton({ caption: 'Bowl Over', func: bowlOver });
const cmdViewScorecard = OwzatUI_CreateButton({ caption: 'View Scorcard', func: viewScorecard });
const cmdBar = document.createElement('div');

const ozInnings = new OwzatInningsRecord(teams[0], teams[1]);

function initialise() { //=====================================================
    // set document styles
    document.body.style.fontFamily = 'Calibri';
    document.body.style.fontSize = '10pt';

    // create command bar
    cmdBar.appendChild(cmdBowlBall);
    cmdBar.appendChild(cmdBowlOver);
    cmdBar.appendChild(cmdViewScorecard);
    document.body.appendChild(cmdBar);

    // create ui message box
    document.body.appendChild(uiGameBox);

    // create ui message box
    document.body.appendChild(uiMessageBox);

    let msg = OwzatUI_CreateMessage();
    msg.style.borderBottom = '1px solid black';
    msg.style.backgroundColor = 'darkgrey';
    msg.innerHTML = '<b>' + ozInnings.teamNameAtBat + '</b> bat first.';
    uiMessageBox.insertAdjacentElement('afterbegin', msg);

    updateUI();
}

function bowlBall(repeat = 1) { //=======================================================
    let strOvers = '' + ozInnings.Overs + ' : ';
    let result = ozInnings.ProcessBowl();

    let msg = OwzatUI_CreateMessage();
    if (ozInnings.OverBallsRemaining == 5) { msg.style.borderBottom = '1px solid black'; }
    msg.innerHTML = strOvers + ozInnings.getPlayerBowlFromId(result.idBowler).name + ' bowls to ' + ozInnings.getPlayerBatFromId(result.idBatsman).name + '... ';
    uiMessageBox.insertAdjacentElement('afterbegin', msg);

    cmdBowlBall.disabled = true;
    cmdBowlOver.disabled = true;

    setTimeout(
        function (msg, strResult, again) {
            msg.innerHTML += strResult;
            updateUI();

            if (again > 0) {
                setTimeout(
                    function (doAgain) {
                        bowlBall(doAgain)
                    }, 500, again)
            } else {
                cmdBowlBall.disabled = false;
                cmdBowlOver.disabled = false;

                if (ozInnings.OverBallsRemaining == 6) {
                    let eooMsg = OwzatUI_CreateMessage();
                    eooMsg.style.borderBottom = '1px solid black';
                    eooMsg.style.backgroundColor = 'lightgrey';
                    eooMsg.innerHTML = '<i>End of Over</i>';
                    uiMessageBox.insertAdjacentElement('afterbegin', eooMsg);
                }
            }
        }, 1000, msg, result.score + ' runs scored.', (repeat - 1))
}

function bowlOver() { //=======================================================
    bowlBall(ozInnings.OverBallsRemaining)
}

function viewScorecard() { //==================================================
    console.log('View Scorecard to be implemented.');
}

function updateUI() {
    let htmMessage = '<b>' + ozInnings.playerNameAtBat + '</b> ' + ozInnings.playerDetailsAtBat;
    boxBatsman1.innerHTML = htmMessage
    
    htmMessage = '<b>' + ozInnings.playerNameAtBat2 + '</b> ' + ozInnings.playerDetailsAtBat2;
    boxBatsman2.innerHTML = htmMessage
    
    htmMessage = '<b>' + ozInnings.playerNameAtBowl + '</b> ' + ozInnings.playerDetailsAtBowl;
    boxBowler.innerHTML = htmMessage
}

// HTML Element creation functions ////////////////////////////////////////////

function OwzatUI_CreateButton(params) { //=====================================
    // create button element
    let btn = document.createElement('button');

    // set default button style
    btn.type = 'button';
    btn.textContent = params.caption;
    btn.style.font = 'inherit';
    btn.style.margin = '2px';

    // set event listener for click event
    btn.addEventListener('click', (ev) => {
        params.func();
    })

    return btn;
}

function OwzatUI_CreateMessageBox() { //=======================================
    // create div element
    let box = document.createElement('div');

    // set required div style
    box.style.margin = '5px 0';
    box.style.overflowY = 'auto';
    box.style.borderTop = 'solid 1px black';
    box.style.height = '500px';

    return box;
}

function OwzatUI_CreateMessage() { //=======================================
    // create div element
    let box = document.createElement('div');

    // set required div style
    box.style.padding = '1px 5px';
    box.style.overflowY = 'auto';
    box.style.borderBottom = 'solid 1px lightgrey';

    return box;
}

function OwzatUI_CreateGameBox() {
    // create div element
    let box = document.createElement('div');

    // set required div style
    box.style.margin = '5px 0';
    box.style.borderTop = 'solid 1px black';
    box.style.height = '115px';

    boxBatsman1.style.margin = '5px';
    boxBatsman1.style.padding = '5px';
    boxBatsman1.style.border = 'solid 1px black';
    boxBatsman1.style.width = '75%';
    boxBatsman1.style.float = 'left';
    boxBatsman1.innerHTML = 'BATSMAN_1';
    box.appendChild(boxBatsman1);

    boxBatsman2.style.margin = '5px';
    boxBatsman2.style.padding = '5px';
    boxBatsman2.style.border = 'solid 1px black';
    boxBatsman2.style.width = '75%';
    boxBatsman2.style.float = 'left';
    boxBatsman2.style.color = 'lightgrey';
    boxBatsman2.innerHTML = 'BATSMAN_2';
    box.appendChild(boxBatsman2);

    boxBowler.style.margin = '5px';
    boxBowler.style.padding = '5px';
    boxBowler.style.border = 'solid 1px black';
    boxBowler.style.width = '75%';
    boxBowler.style.float = 'right';
    boxBowler.innerHTML = 'BOWLER';
    box.appendChild(boxBowler);

    return box;
}