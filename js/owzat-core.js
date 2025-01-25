// main match class ///////////////////////////////////////////////////////////////////////////////
class OZ_Match {
    #innings = undefined;

    // match constructor needs to know number of innings
    constructor(numInnings = 1) {
        this.#innings = new Array(numInnings);
    }

    // function to initialise the match
    init(teamHome, teamAway) {
        // create innings records for both teams for each innings
        this.#innings.forEach(element => {
            element = [new OZ_InningsRecordTeam(teamHome), new OZ_InningsRecordTeam(teamAway)]
        });
    }
}

// team innings record ////////////////////////////////////////////////////////////////////////////
class OZ_InningsRecordTeam {
    #teamData = undefined;
    #playerRecords = undefined;
    #nextBatsmanIndex = -1;

    // innings record constructor needs to know the team data
    constructor(teamData) {
        this.#teamData = teamData;
        this.#playerRecords = new Array();

        for (let index = 0; index < this.#teamData.players.length; index++) {
            const playerId = this.#teamData.players[index];
            this.#playerRecords.push(new OZ_InningsRecordPlayer(BfxGetPlayerData(playerId)));
        }
    }

    // get player innings record
    getPlayerRecord(index) { return this.#playerRecords[index]; }
    getPlayerRecordCaptain() { return this.#playerRecords[this.#teamData.captain]; }
    getPlayerRecordWicketKeeper() { return this.#playerRecords[this.#teamData.wicketKeeper]; }
    getPlayerRecordNextBatsman() {
        this.#nextBatsmanIndex++;
        if (this.#nextBatsmanIndex < this.#teamData.battingOrder.length) {
            return this.#playerRecords[this.#teamData.battingOrder[this.#nextBatsmanIndex]];
        } else {
            return null;
        }
    }

    // get opening pairs
    getOpeningBatsmen() {
        return [this.getPlayerRecordNextBatsman(),
                this.getPlayerRecordNextBatsman()]
    }
    getOpeningBowlers() {
        return [this.#playerRecords[this.#teamData.bowlingStarters[0]],
                this.#playerRecords[this.#teamData.bowlingStarters[1]]]
    }

    // get team name
    get nameTeam() { return this.#teamData.teamname; }
}

// player innings record //////////////////////////////////////////////////////////////////////////
class OZ_InningsRecordPlayer {
    #playerData = undefined;

    // player record constructor needs to know the player data
    constructor(playerData) {
        this.#playerData = playerData;
        this.batStatus = "";
        this.batBalls = 0;
        this.batBallsActual = 0;
        this.batRuns = 0;
        this.bowlBalls = 0;
        this.bowlBallsActual = 0;
        this.bowlExtras = 0;
        this.bowlMaidens = 0;
        this.bowlRuns = 0;
        this.bowlWickets = 0;
    }

    // get a formatted player name
    get name() { return this.#playerData.surname + ", " + this.#playerData.forename[0] + "."; }

    // get player full name
    get nameFull() { return this.#playerData.forename + " " + this.#playerData.surname; }

    // get player first name
    get nameFirst() { return this.#playerData.forename; }

    // get player last name
    get nameLast() { return this.#playerData.surname; }

    // get player id
    get playerId() { return this.#playerData.id; }

    // get player stats
    get statBat() { return this.#playerData.bat; }
    get statBowl() { return this.#playerData.bowl; }
    get statField() { return this.#playerData.field; }
}
