class UICommandBar {
    #cmdBar = document.createElement('div');
    #cmdBowlBall = document.createElement('button'); // BfxCreateButton({ caption: 'Bowl Ball', func: this.#bowlBall })
    #cmdBowlOver = document.createElement('button');
    #cmdViewScorecard = document.createElement('button');

    constructor() {
        // format command bar
        // this.#cmdBar.style.backgroundColor = 'rgba(255,0,0,0.1)';
        this.#cmdBar.classList = 'cmdBar';
        this.#cmdBar.style.padding = '0 5px 5px 5px';
        this.#cmdBar.style.borderBottomLeftRadius = '10px';
        this.#cmdBar.style.borderBottomRightRadius = '10px';

        // format 'Bowl Ball' button
        this.#cmdBowlBall.type = 'button';
        this.#cmdBowlBall.style.font = 'inherit';
        this.#cmdBowlBall.style.margin = '2px';
        this.#cmdBowlBall.textContent = 'Bowl Ball';
        // this.#cmdBowlBall.addEventListener('click', this.#bowlBall);
        this.#cmdBowlBall.addEventListener('click', this.#bowlBall);

        // format 'Bowl Over' button
        this.#cmdBowlOver.type = 'button';
        this.#cmdBowlOver.style.font = 'inherit';
        this.#cmdBowlOver.style.margin = '2px';
        this.#cmdBowlOver.textContent = 'Bowl Over';
        this.#cmdBowlOver.addEventListener('click', this.#bowlOver);
        // this.#cmdBowlOver.disabled = true;

        // format 'View Scorecard' button
        this.#cmdViewScorecard.style.float = 'inline-end';
        this.#cmdViewScorecard.type = 'button';
        this.#cmdViewScorecard.style.font = 'inherit';
        this.#cmdViewScorecard.style.margin = '2px';
        this.#cmdViewScorecard.textContent = 'View Scorecard';
        this.#cmdViewScorecard.addEventListener('click', this.#viewScorecard);
        this.#cmdViewScorecard.disabled = true;

        // add html elements to document
        this.#cmdBar.appendChild(this.#cmdBowlBall);
        this.#cmdBar.appendChild(this.#cmdBowlOver);
        this.#cmdBar.appendChild(this.#cmdViewScorecard);
        document.body.insertAdjacentElement('afterbegin', this.#cmdBar);
    }

    #bowlBall() {
        game.bowl();
    }

    #bowlOver() {
        game.bowl(true);
    }

    #viewScorecard() {
        alert('View Scorecard.');
    }
}


// create game
let game = new UIGame(teams[0], teams[1]);
// create command bar
let bar = new UICommandBar();

function initialise() {
    // set document styles
    document.body.style.fontFamily = 'Calibri';
    // document.body.style.fontFamily = 'monospace';
    document.body.style.fontSize = '10pt';
}