class OwzatOverRecord { //===========================================================
    #bowler = null;
    #batsmen = null;
    #batsmanOnStrike = 0;
    #balls = null;

    constructor(bowler, batsmen, batsmanOnStrike) { // batsman1, batsman2, batsmanOnStrike) {
        // set bowler
        this.#bowler = bowler;
        // create batsman array and set batsmen
        // this.#batsmen = new Array();
        // this.#batsmen.push(batsman1);
        // this.#batsmen.push(batsman2);
        this.#batsmen = batsmen;
        this.#batsmanOnStrike = batsmanOnStrike;
        // create balls array
        this.#balls = new Array();
    }

    get ballCount() { // returns the current ball number of the over
        return this.#balls.length;
    }

    get runCount() { // returns the total number of runms in the over
        let runs = 0;
        for (let index = 0; index < this.#balls.length; index++) {
            let element = this.#balls[index];
            if (typeof element.score == 'number') { runs += element.score; }
        }
        return runs;
    }

    bowlBall() {
        function _rollAgainstStat(stat) {
            let roll = BfxRandomInt(100);
            if (roll > stat) { return false; }
            return true;
        }

        // check for end of over error
        if (this.#balls.length == 6) {
            throw new Error('OZERR106', { cause: { description: 'End of Over. Unable to bowl ball.', } });
        }

        // calculate runs scored
        let bowlGood = _rollAgainstStat(this.#bowler.bowl);
        let batGood = _rollAgainstStat(this.#batsmen[this.#batsmanOnStrike].bat);
        let batResult = BfxRandomInt(6);
        let runs = 0;

        if (bowlGood) {
            if (batGood) {
                switch (batResult) {
                    case 5: // owzat
                        // check for wicket
                        runs = 'W';
                        break;

                    case 4: // boundry hit
                        switch (BfxRandomInt(3)) {
                            case 2:
                                runs = 6;
                                break;

                            case 1:
                                runs = 4;
                                break;

                            default:
                                runs = 0;
                                break;
                        }
                        break;

                    default:
                        switch (BfxRandomInt(2)) {
                            case 1:
                                runs = batResult;
                                break;

                            default:
                                runs = 0;
                                break;
                        }
                        break;
                }
            } else {
                // check for wicket
                runs = 'W';
            }
        }

        // update player records
        this.#bowler.balls++;
        this.#bowler.runs = typeof runs == 'number' ? this.#bowler.runs + runs : this.#bowler.runs;
        this.#batsmen[this.#batsmanOnStrike].balls++;
        this.#batsmen[this.#batsmanOnStrike].runs = typeof runs == 'number' ? this.#batsmen[this.#batsmanOnStrike].runs + runs : this.#batsmen[this.#batsmanOnStrike].runs;

        // create the ball result
        let ball = {
            idBowler: this.#bowler.id,
            idBatsman: this.#batsmen[this.#batsmanOnStrike].id,
            score: runs
        }
        this.#balls.push(ball);
        //// START DEBUG BIT ////
        // console.log(ball, 'Ball Count: ' + this.ballCount + ', Runs: ' + this.runCount);
        ///// END DEBUG BIT /////

        // check if batsmen cross
        if (runs % 2 == 1) { this.#batsmanOnStrike = Math.abs(this.#batsmanOnStrike - 1); }
        ball.nextBatsman = this.#batsmanOnStrike;

        // return ball result
        return ball;
    }
}