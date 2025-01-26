
class OwzatInningsRecord { //==================================================
    #teamBat = null;
    #teamBatName = '';
    #teamBowl = null;
    #teamBowlName = '';

    #teamBatOrder = null;
    #currentBattingPair = [0, 1];
    #currentBatter = 0;
    #teamBowlOrder = null;
    #currentBowlingPair = [0, 1];
    #currentBowler = 0;

    #ballCounter = 0;

    constructor(battingTeam, bowlingTeam) {
        if ((battingTeam == undefined) || (bowlingTeam == undefined)) return;

        // set up batting team
        if (battingTeam.teamname != undefined) { this.#teamBatName = battingTeam.teamname; }
        // load batting team players
        if (battingTeam.players.length > 0) {
            this.#teamBat = new Array();
            for (let index = 0; index < battingTeam.players.length; index++) {
                const playerId = battingTeam.players[index];
                this.#teamBat.push(new OwzatPlayerBattingRecord(BfxGetPlayerData(playerId)));
            }
        }
        // load batting order
        this.#teamBatOrder = battingTeam.battingOrder;

        // set up bowling team
        if (bowlingTeam.teamname != undefined) { this.#teamBowlName = bowlingTeam.teamname; }
        // load bowling team players
        if (bowlingTeam.players.length > 0) {
            this.#teamBowl = new Array();
            for (let index = 0; index < bowlingTeam.players.length; index++) {
                const playerId = bowlingTeam.players[index];
                this.#teamBowl.push(new OwzatPlayerBowlingRecord(BfxGetPlayerData(playerId)));
            }
        }
        // load bowling order
        this.#teamBowlOrder = bowlingTeam.bowlingStarters;
    }

    get teamNameAtBat() { return this.#teamBatName; }
    get teamNameAtBowl() { return this.#teamBowlName; }
    get playerNameAtBat() { return this.#teamBat[this.#teamBatOrder[this.#currentBattingPair[this.#currentBatter]]].name; }
    get playerNameAtBowl() { return this.#teamBowl[this.#teamBowlOrder[this.#currentBowlingPair[this.#currentBowler]]].name; }
    get overCount() { return Math.trunc(this.#ballCounter / 6) + 1; }
    get overBall() { return (this.#ballCounter % 6) + 1; }

    ProcessBowl() {
        let runsScored = 0;
        let bowlerScore = this.#teamBowl[this.#teamBowlOrder[this.#currentBowlingPair[this.#currentBowler]]].bowl;
        let batterScore = this.#teamBat[this.#teamBatOrder[this.#currentBattingPair[this.#currentBatter]]].bat;

        if (BfxRandomInt(100) < bowlerScore) {
            // succesful bowl...
            if (BfxRandomInt(100) < batterScore) {
                // successful bat...
                // console.log(bowlerScore.toString() + " Successful bowl, " + batterScore.toString() + " Successful bat.");
                let batResult = BfxRandomInt(5) - 2;
                if (batResult < 0) batResult = 0; // makes batResult either 0, 1 or 2 with a higher chance of 0

                console.log(batResult);
                if (BfxRandomInt(bowlerScore) < BfxRandomInt(batterScore)) {
                    if (batResult == 2) {
                        batResult = (BfxRandomInt(2) == 1) ? 6 : 4;
                    } else {
                        batResult *= BfxRandomInt(4);
                    }
                }

                runsScored = batResult;

                if ((runsScored % 2) == 1) { this.#currentBatter = Math.abs(this.#currentBatter - 1); }
            } else {
                // unsuccessful bat...
                // console.log(bowlerScore.toString() + " Successful bowl, " + batterScore.toString() + " Unsuccessful bat.");
            }
        } else {
            // unsuccessful bowl...
            // console.log(bowlerScore.toString() + " Unsuccessful bowl.");
        }

        // after processing the bowl
        this.#ballCounter++;
        if (this.overBall == 1) { // start of new over
            this.#currentBowler = Math.abs(this.#currentBowler - 1);
            this.#currentBatter = Math.abs(this.#currentBatter - 1);
        }
        return { runs: runsScored, wicket: false };
    }
}

class OwzatPlayerRecord { //===================================================
    #id = '';
    #forename = '';
    #surname = '';
    #nation = '';
    #bat = 0;
    #bowl = 0;
    #field = 0;

    constructor(playerData = undefined) {
        if (playerData != undefined) {
            if (playerData.id != undefined) { this.#id = playerData.id; }
            if (playerData.forename != undefined) { this.#forename = playerData.forename; }
            if (playerData.surname != undefined) { this.#surname = playerData.surname; }
            if (playerData.nation != undefined) { this.#nation = playerData.nation; }
            if (playerData.bat != undefined) { this.#bat = playerData.bat; }
            if (playerData.bowl != undefined) { this.#bowl = playerData.bowl; }
            if (playerData.field != undefined) { this.#field = playerData.field; }
        }
    }

    get id() { return this.#id; }
    get name() { return this.#surname + " " + this.#forename[0] + "."; }
    get surname() { return this.#surname; }
    get forename() { return this.#forename; }
    get nation() { return this.#nation; }
    get bat() { return this.#bat; }
    get bowl() { return this.#bowl; }
    get field() { return this.#field; }
}

class OwzatPlayerBattingRecord extends OwzatPlayerRecord { //==================
    #balls = 0;
    #runs = 0;
    #status = '';

    constructor(playerData = undefined) {
        super(playerData);
    }

    get balls() { return this.#balls; }
    get runs() { return this.#runs; }
    get status() { return this.#status; }

    AddBall(runs, status = '') {
        this.#balls++;
        this.#runs += runs;
        if (status != '') this.#status = status;
    }
}

class OwzatPlayerBowlingRecord extends OwzatPlayerRecord { //==================
    #balls = 0;
    #runs = 0;
    #wickets = 0;
    #extras = 0;

    constructor(playerData = undefined) {
        super(playerData);
    }

    get balls() { return this.#balls; }
    get runs() { return this.#runs; }
    get wickets() { return this.#wickets; }
    get extras() { return this.#extras; }

    AddBall(runs, wicketBall = false) {
        this.#balls++;
        this.#runs += runs;
        if (wicketBall) this.#wickets++;
    }

    AddNoBall() { this.#extras++; }
}

const test1 = new OwzatInningsRecord(teams[0], teams[1]);
console.log(test1);
