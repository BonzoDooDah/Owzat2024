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
        this.#newOver();
    }

    get teamNameAtBat() { return this.#teamBatName; }
    get teamNameAtBowl() { return this.#teamBowlName; }
    get #currentBatterPlayerRecord() { return this.#teamBat[this.#teamBatOrder[this.#currentBattingPair[this.#currentBatter]]]; }
    get #currentBowlerPlayerRecord() { return this.#teamBowl[this.#teamBowlOrder[this.#currentBowlingPair[this.#currentBowler]]]; }

    get playerNameAtBat() { return this.#currentBatterPlayerRecord.name; }
    get playerNameAtBowl() { return this.#currentBowlerPlayerRecord.name; }

    #newOver() {
        this.#currentOver = new OwzatOverRecord(
            this.#currentBowlerPlayerRecord,
            this.#teamBat[this.#teamBatOrder[this.#currentBattingPair[0]]],
            this.#teamBat[this.#teamBatOrder[this.#currentBattingPair[1]]],
            this.#currentBatter)
        this.#overs.push(this.#currentOver);
    }

    ProcessBowl() {
        let result = null;

        try {
            result = this.#currentOver.bowlBall();
        } catch (error) {
            switch (error.message) {
                case 'OZERR-EOO':
                    this.#currentBowler = Math.abs(this.#currentBowler - 1);
                    this.#currentBatter = error.cause.batsmanOnStrike;
                    this.#newOver();
                    result = this.#currentOver.bowlBall();
                    break;

                default:
                    break;
            }
        }

        return result;
    }
}
