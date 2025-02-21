class UIGame {
    #ozInnings = new Array();
    #indexInnings = 0;

    #uiGame = document.createElement('div');
    #uiGameInfo = document.createElement('div');
    #uiInfoBatsmen = document.createElement('div');
    #uiInfoBatsman1 = document.createElement('div');
    #uiInfoBatsman2 = document.createElement('div');
    #uiInfoBowlers = document.createElement('div');
    #uiInfoBowler1 = document.createElement('div');
    #uiInfoBowler2 = document.createElement('div');
    #uiGameMessages = document.createElement('div');
    #uiMessagesHeader = document.createElement('div');
    #uiMessages = document.createElement('div');

    constructor(teamHome, teamAway) {
        let inn = new OwzatInningsRecord(teamHome, teamAway);
        this.#ozInnings.push(inn);

        // this.#uiGame.style.backgroundColor = 'rgba(255,0,0,0.1)';
        // this.#uiGame.style.height = '500px';

        // this.#uiGameInfo.style.backgroundColor = 'rgba(0,255,0,0.1)';
        this.#uiGameInfo.style.float = 'inline-start';
        this.#uiGameInfo.style.height = '100%';
        this.#uiGameInfo.style.width = '40%';

        this.#uiInfoBatsmen.style.margin = '1px';
        this.#uiInfoBatsmen.style.padding = '2px 5px';
        this.#uiInfoBatsmen.style.border = '1px solid rgba(0,0,0,0.2)';
        this.#uiInfoBatsmen.style.borderRadius = '5px';
        this.#uiInfoBatsmen.textContent = 'Batsmen';

        this.#uiInfoBatsman1.id = inn.data.batsman1
        this.#uiInfoBatsmen.appendChild(this.#uiInfoBatsman1);
        this.#updateBatsmanInfo(this.#uiInfoBatsman1);

        this.#uiInfoBatsman2.id = inn.data.batsman2
        this.#uiInfoBatsmen.appendChild(this.#uiInfoBatsman2);
        this.#updateBatsmanInfo(this.#uiInfoBatsman2);

        this.#uiInfoBowlers.style.margin = '1px';
        this.#uiInfoBowlers.style.padding = '2px 5px';
        this.#uiInfoBowlers.style.border = '1px solid rgba(0,0,0,0.2)';
        this.#uiInfoBowlers.style.borderRadius = '5px';
        this.#uiInfoBowlers.textContent = 'Bowlers';

        // box = document.createElement('div');
        // box.id = inn.data.batsman1
        // this.#uiInfoBowlers.appendChild(box);

        // box = document.createElement('div');
        // box.id = inn.data.batsman1
        // this.#uiInfoBowlers.appendChild(box);

        this.#uiGameMessages.style.float = 'inline-end';
        this.#uiGameMessages.style.height = '500px';
        this.#uiGameMessages.style.width = '60%';

        this.#uiMessagesHeader.style.padding = '2px 5px';
        this.#uiMessagesHeader.style.margin = '2px 5px';
        this.#uiMessagesHeader.style.backgroundColor = 'rgba(0,0,0,0.2)';
        this.#uiMessagesHeader.style.fontWeight = 'bold';

        this.#uiMessages.style.margin = '0 5px';
        this.#uiMessages.style.height = '100%';
        this.#uiMessages.style.border = '1px solid rgba(0,0,0,0.2)';
        this.#uiMessages.style.borderRadius = '2px';
        this.#uiMessages.style.overflowY = 'scroll';

        this.#uiGame.appendChild(this.#uiGameInfo);
        this.#uiGameInfo.appendChild(this.#uiInfoBatsmen);
        this.#uiGameInfo.appendChild(this.#uiInfoBowlers);
        this.#uiGame.appendChild(this.#uiGameMessages);
        this.#uiGameMessages.appendChild(this.#uiMessagesHeader);
        this.#uiGameMessages.appendChild(this.#uiMessages);
        document.body.insertAdjacentElement("afterbegin", this.#uiGame);

        this.#messageHeader();
    }

    bowl(over = false) {
        let inn = this.#ozInnings[this.#indexInnings];

        let result = inn.processBowl(); // process actual bowling of ball
        // console.log(result);

        let bowler = inn.getPlayerBowlFromId(result.idBowler).name;
        let batsman = inn.getPlayerBatFromId(result.idBatsman).name;

        let text = result.over + '.' + result.ball + ' : ' + bowler + ' bowls to ' + batsman;
        if (result.score == 'W'){
            text += ', OWZAT! ' + batsman + ' is out.';
            inn.changeBatsman(result.idBatsman);
        } else {
            text += ', who scores ' + result.score + ' runs.';
        }
        let msg = this.#messageAdd(text);

        if (result.ball == 1) { msg.style.borderBottom = '1px solid black'; }

        this.#messageHeader();
        this.#update();

        if (!over) { return; }

        for (let index = result.ball; index < 6; index++) {
            this.bowl();
        }
    }

    #messageAdd(text) {
        let msg = this.#uiMessages.firstChild;
        if (msg != null) {
            msg.style.color = 'darkgrey';
            msg.style.fontWeight = 'normal';
        }

        msg = document.createElement('div');
        msg.style.padding = '2px 5px';
        msg.style.borderBottom = '1px solid rgba(0,0,0,0.2)';
        msg.style.fontWeight = 'bold';
        msg.textContent = text;
        this.#uiMessages.insertAdjacentElement("afterbegin", msg);
        return msg;
    }

    #messageHeader() {
        let inn = this.#ozInnings[this.#indexInnings];
        this.#uiMessagesHeader.textContent = inn.teamBatName + ' : ' + inn.scoreRuns + ' for ' + inn.scoreWickets;
    }

    #updateBatsmanInfo(box) {
        let batsman = this.#ozInnings[this.#indexInnings].getPlayerBatFromId(box.id);

        box.style.margin = '5px';
        box.innerHTML = '<div><b>' + batsman.name + '</b><\div>' + '<div style="text-align: right;">' + batsman.runs + ' off ' + batsman.balls + ' balls.<\div>'
    }

    #update() {
        this.#updateBatsmanInfo(this.#uiInfoBatsman1);
        this.#updateBatsmanInfo(this.#uiInfoBatsman2);
    }
}