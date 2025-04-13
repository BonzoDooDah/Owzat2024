// @ts-nocheck
console.clear();

import { owzatData } from './owzatdata.js'; // Import players and teams data
import { UIID } from './owzatui.js'; // Import UI functions

var matchData = null;

async function initGameData() {
    document.body.innerHTML = 'Initialising game data...';
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (await owzatData.initData() === false) {
        document.body.innerHTML = 'FAILED TO LOAD GAME DATA!';
        return;
    }
    document.body.innerHTML = 'Game data loaded.';
    console.log(owzatData.players, owzatData.teams);
    await new Promise(resolve => setTimeout(resolve, 1000));
}

async function initGameUI() {
    document.body.innerHTML = 'Initialising game UI...';
    await new Promise(resolve => setTimeout(resolve, 1000));
    UIID.initUI(); // Initialise the UI
}

async function initGame() {
    await initGameData(); // Load players and teams data
    await initGameUI(); // Initialise game UI
}

await initGame(); // Initialise the match

matchData = JSON.parse(localStorage.getItem('matchData'));
if (matchData) {
    owzatData.match = matchData;
    document.getElementById(UIID.BTN_MATCH_RESUME).disabled = false;
    console.log('existing match data has been loaded.');
}