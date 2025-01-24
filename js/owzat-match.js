class PlayerInningsRecord {
    #player = undefined;

    constructor(player) {
        this.#player = player;
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

    get name() { return this.#player.surname + ", " + this.#player.forename[0] + "."; }
}

class TeamInningsRecord {
    #team = undefined;
    #players = undefined;

    constructor() {
        this.#players = new Array();
    }

    initialise(team) {
        this.#team = team;

        for (let index = 0; index < this.#team.players.length; index++) {
            const player = BfxGetPlayerData(this.#team.players[index]);
            if (player != null) {
                const playerRec = new PlayerInningsRecord(player);
                this.#players.push(playerRec);
            }
        }
    }

    get team() { return this.#team; }
    get players() { return this.#players; }
}

function OwzatFormatStrBoxMsgRunsScored(nameBowler, nameBatsman, runs) {
    return "<b>" + nameBowler + "</b> bowls ball, <b>" + nameBatsman + "</b> scores <b>" + runs.toString() + "</b> runs.";
}