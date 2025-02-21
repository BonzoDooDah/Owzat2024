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
    get fullname() { return this.#forename + " " + this.#surname; }
    get surname() { return this.#surname; }
    get forename() { return this.#forename; }
    get nation() { return this.#nation; }
    get bat() { return this.#bat; }
    get bowl() { return this.#bowl; }
    get field() { return this.#field; }
}

class OwzatPlayerRecordBatting extends OwzatPlayerRecord { //==================
    constructor(playerData = undefined) {
        super(playerData);
        this.balls = 0;
        this.runs = 0;
        this.status = 'not out';
    }
}

class OwzatPlayerRecordBowling extends OwzatPlayerRecord { //==================
    constructor(playerData = undefined) {
        super(playerData);
        this.balls = 0;
        this.runs = 0;
        this.wickets = 0;
        this.extras = 0;
    }
}