class OwzatInningsRecord { //==================================================
    #teamBat = null; // array of OwzatPlayerRecordBatting
    #teamBatName = '';
    #teamBowl = null; // array of OwzatPlayerRecordBowling
    #teamBowlName = '';

    #teamBatOrder = null; // array of #teamBat index numbers
    #currentBattingPair = [0, 1];
    #currentBatter = 0;
    #teamBowlOrder = null; // array of #teamBowl index numbers
    #currentBowlingPair = [0, 1];
    #currentBowler = 0;

    #overs = null // array of overs
    #currentOver = null;

    constructor(battingTeam, bowlingTeam) {
        if ((battingTeam == undefined) || (bowlingTeam == undefined)) return;

        // set up batting team
        if (battingTeam.teamname != undefined) { this.#teamBatName = battingTeam.teamname; }
        // load batting team players
        if (battingTeam.players.length > 0) {
            this.#teamBat = new Array();
            for (let index = 0; index < battingTeam.players.length; index++) {
                const playerId = battingTeam.players[index];
                this.#teamBat.push(new OwzatPlayerRecordBatting(BfxGetPlayerData(playerId)));
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
                this.#teamBowl.push(new OwzatPlayerRecordBowling(BfxGetPlayerData(playerId)));
            }
        }
        // load bowling order
        this.#teamBowlOrder = bowlingTeam.bowlingStarters;
        // initialise overs
        this.#overs = new Array();
        this.#newOver(true);
    }

    get teamNameAtBat() { return this.#teamBatName; }
    get teamNameAtBowl() { return this.#teamBowlName; }
    get #currentBatterPlayerRecord() { return this.#teamBat[this.#teamBatOrder[this.#currentBattingPair[this.#currentBatter]]]; }
    get #currentBowlerPlayerRecord() { return this.#teamBowl[this.#teamBowlOrder[this.#currentBowlingPair[this.#currentBowler]]]; }

    get playerNameAtBat() { return this.#currentBatterPlayerRecord.name; }
    get playerNameAtBowl() { return this.#currentBowlerPlayerRecord.name; }
    get playerDetailsAtBat() { return ' : ' + this.#currentBatterPlayerRecord.runs + ' runs, ' + this.#currentBatterPlayerRecord.balls + ' balls.'; }
    get playerDetailsAtBowl() { return ' : ' + this.#currentBowlerPlayerRecord.runs + ' runs, ' + this.#currentBowlerPlayerRecord.balls + ' balls, for ' + this.#currentBowlerPlayerRecord.wickets + ' wickets.'; }

    get OverBallsRemaining() { return (6 - this.#currentOver.ballCount); }

    #newOver(firstOver = false) {
        if (!firstOver) {
            this.#currentBowler = Math.abs(this.#currentBowler - 1);
            this.#currentBatter = Math.abs(this.#currentBatter - 1);
        }
        this.#currentOver = new OwzatOverRecord(
            this.#currentBowlerPlayerRecord,
            this.#teamBat[this.#teamBatOrder[this.#currentBattingPair[0]]],
            this.#teamBat[this.#teamBatOrder[this.#currentBattingPair[1]]],
            this.#currentBatter)
        this.#overs.push(this.#currentOver);
    }

    ProcessBowl() {
        let result = null;
        let strBowl = '';
        let strResult = '';

        try {
            result = this.#currentOver.bowlBall();
        } catch (error) {
            switch (error.message) {
                case 'OZERR-EOO':
                    this.#newOver();
                    result = this.#currentOver.bowlBall();
                    break;

                default:
                    break;
            }
        } finally {
            strBowl = '<b>' + BfxGetPlayerData(result.idBowler).surname + '</b> bowls to <b>' + BfxGetPlayerData(result.idBatsman).surname + '</b>... ';
            strResult = ' ' + result.score + ' runs scored.';

            if (result.score % 2 == 1) { this.#currentBatter = Math.abs(this.#currentBatter - 1); }

            if (this.#currentOver.ballCount == 6) { this.#newOver(); }
        }
        //// START DEBUG BIT ////
        console.log(result);
        ///// END DEBUG BIT /////
        return { msgBowl: strBowl, msgResult: strResult };
    }
}
