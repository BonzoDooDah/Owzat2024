class OwzatOverRecord { //===========================================================
    #bowler = null;
    #batsmen = null;
    #batsmanOnStrike = 0;
    #balls = null;

    constructor(bowler, batsman1, batsman2, batsmanOnStrike) {
        // set bowler
        this.#bowler = bowler;
        // create batsman array and set batsmen
        this.#batsmen = new Array();
        this.#batsmen.push(batsman1);
        this.#batsmen.push(batsman2);
        this.#batsmanOnStrike = batsmanOnStrike;
        // create balls array
        this.#balls = new Array();
        //// START DEBUG BIT ////
        // console.log(this, 'Ball Count: ' + this.ballCount + ', Runs: ' + this.runCount);
        ///// END DEBUG BIT /////
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
        // check for end of over error
        if (this.#balls.length == 6) {
            throw new Error(
                'OZERR-EOO',
                {
                    cause: {
                        description: 'End of Over.',
                        batsmanOnStrike: Math.abs(this.#batsmanOnStrike - 1)
                    }
                });
        }

        // calculate runs scored
        let runs = BfxRandomInt(5);

        // update player records
        this.#bowler.balls++;
        this.#bowler.runs += runs;
        this.#batsmen[this.#batsmanOnStrike].balls++;
        this.#batsmen[this.#batsmanOnStrike].runs += runs;

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

        // return ball result
        return ball;
    }
}

// let over = new OwzatOverRecord(
//     new OwzatPlayerRecordBowling(BfxGetPlayerData('P0000001')),
//     new OwzatPlayerRecordBatting(BfxGetPlayerData('P0000017')),
//     new OwzatPlayerRecordBatting(BfxGetPlayerData('P0000020')),
//     0
// );

// for (let index = 0; index < 18; index++) {
//     try {
//         over.bowlBall();
//     } catch (error) {
//         switch (error.message) {
//             case 'OZERR-EOO':
//                 over = new OwzatOverRecord(
//                     new OwzatPlayerRecordBowling(BfxGetPlayerData('P0000002')),
//                     new OwzatPlayerRecordBatting(BfxGetPlayerData('P0000017')),
//                     new OwzatPlayerRecordBatting(BfxGetPlayerData('P0000020')),
//                     error.cause.batsmanOnStrike
//                 );
//                 over.bowlBall();
//                 break;

//             default:
//                 break;
//         }
//     }
// }
