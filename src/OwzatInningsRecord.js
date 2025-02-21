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

    get teamBatName() { return this.#teamBatName; }
    get teamBowlName() { return this.#teamBowlName; }

    get data() { return { 
        batsman1: this.#teamBat[this.#currentBattingPair[0]].id, 
        batsman2: this.#teamBat[this.#currentBattingPair[1]].id, 
        bowler1: this.#teamBowl[this.#currentBowlingPair[0]].id, 
        bowler2: this.#teamBowl[this.#currentBowlingPair[1]].id 
    }; }

    get scoreRuns() {
        let runs = 0;
        for (let index = 0; index < this.#overs.length; index++) {
            const element = this.#overs[index];
            runs += element.runCount;
        }
        return runs;
    }

    get scoreWickets() {
        let wickets = 0;
        for (let index = 0; index < this.#overs.length; index++) {
            const element = this.#overs[index];
            wickets += element.wicketCount;
        }
        return wickets;
    }

    getPlayerBatFromId(id) {
        for (let index = 0; index < this.#teamBat.length; index++) {
            const element = this.#teamBat[index];
            if (element.id == id) return element;
        }
        return null;
    }

    getPlayerBowlFromId(id) {
        for (let index = 0; index < this.#teamBowl.length; index++) {
            const element = this.#teamBowl[index];
            if (element.id == id) return element;
        }
        return null;
    }

    #newOver(firstOver = false) {
        if (!firstOver) {
            this.#currentBowler = Math.abs(this.#currentBowler - 1);
            this.#currentBatter = Math.abs(this.#currentBatter - 1);
        }
        this.#currentOver = new OwzatOverRecord(
            this.#teamBowl[this.#teamBowlOrder[this.#currentBowlingPair[this.#currentBowler]]],
            [this.#teamBat[this.#teamBatOrder[this.#currentBattingPair[0]]], this.#teamBat[this.#teamBatOrder[this.#currentBattingPair[1]]]],
            this.#currentBatter)
        this.#overs.push(this.#currentOver);
    }

    processBowl() {
        let result = null;

        try {
            result = this.#currentOver.bowlBall();
        } catch (error) {
            switch (error.message) {
                case 'OZERR106':
                    this.#newOver();
                    result = this.#currentOver.bowlBall();
                    break;

                default:
                    break;
            }
        } finally {
            this.#currentBatter = result.nextBatsman;
            result.over = this.#overs.length;

            if (this.#currentOver.ballCount == 6) { this.#newOver(); }
        }

        return result;
    }

    changeBatsman(batsmanId) {
        let indexNextBatsman = this.#currentBattingPair[0] < this.#currentBattingPair[1] ? this.#currentBattingPair[1] : this.#currentBattingPair[0];
        indexNextBatsman++;

        let batsmanRecord = this.getPlayerBatFromId(batsmanId);
        let batsmanNext = this.#teamBat[indexNextBatsman];

        console.log(batsmanRecord, batsmanNext)
        this.#currentOver.changeBatsman(batsmanRecord, batsmanNext);
        this.#currentBattingPair[this.#currentBatter] = indexNextBatsman;
    }
}
