// @ts-nocheck

var _matchData = null;
var _btnBowlBall = document.getElementById('btnBowlBall');
var _btnBowlOver = document.getElementById('btnBowlOver');
var _btnChangeBowler = document.getElementById('btnChangeBowler');

/**
 * Initialise match data and UI.
 * This function is called when the page is loaded.
 */
function initMatch() {
    console.log('Initialising match...');

    loadMatchData();
    uiUpdateInnings(true);

    if (_matchData) {
        _btnBowlBall.disabled = false;
        _btnBowlOver.disabled = false;
    }

    console.log('Match initialised.');
}

/**
 * Initialise match data from local storage.
 * If no match data is found, create new match data and save to local storage.
 */
function loadMatchData() {
    console.log('   Loading match data...');

    var matchType = localStorage.getItem('matchType');
    var teamHome = JSON.parse(localStorage.getItem('teamHome'));
    var teamAway = JSON.parse(localStorage.getItem('teamAway'));
    _matchData = JSON.parse(localStorage.getItem('matchData'));

    console.log('   Match type:', matchType);
    console.log('   Home team:', teamHome);
    console.log('   Away team:', teamAway);

    if (!_matchData) {
        _matchData = initMatchData(matchType, teamHome, teamAway);
        localStorage.setItem('matchData', JSON.stringify(_matchData));
    }

    console.log('   Match data:', _matchData);
    console.log('   Match data loaded.');
}

/**
 * Initialise match data object with teams and innings.
 * 
 * @param {string} matchType - type of match (TEST, ODI, T20)
 * @param {object} teamHome - home team object
 * @param {object} teamAway - away team object
 * @returns object - match data object
 */
function initMatchData(matchType, teamHome, teamAway) {
    console.log('       No match data found. Initialising new match data...');

    // perform 'coin toss' to determine batting and bowling teams
    var toss = Math.round(Math.random()); // 0 = teamHome, 1 = teamAway
    console.log('       Toss result:', toss);

    var md = {
        matchType: matchType,
        team1: toss === 0 ? teamHome : teamAway,
        team2: toss === 0 ? teamAway : teamHome,
        innings: [],
        currentInning: 0
    };

    switch (matchType) {
        case 'TEST':
            // test match = 2 innings each, 5 days
            md.innings.push(initMatchInning(md.team1, md.team2));
            md.innings.push(initMatchInning(md.team2, md.team1));
            md.innings.push(initMatchInning(md.team1, md.team2));
            md.innings.push(initMatchInning(md.team2, md.team1));
            break;

        case 'ODI':
            // ODI = 1 innings each, 50 overs
            md.innings.push(initMatchInning(md.team1, md.team2, 50));
            md.innings.push(initMatchInning(md.team2, md.team1, 50));
            break;

        case 'T20':
            // T20 = 1 innings each, 20 overs
            md.innings.push(initMatchInning(md.team1, md.team2, 20));
            md.innings.push(initMatchInning(md.team2, md.team1, 20));
            break;

        default:
            // default = 1 innings each, unlimited overs (should not be an option)
            md.innings.push(initMatchInning(md.team1, md.team2));
            md.innings.push(initMatchInning(md.team2, md.team1));
            break;
    }

    return md;
}

/**
 * Initialise an innings object for a match.
 * 
 * @param {object} battingTeam - batting team object
 * @param {object} bowlingTeam - bowling team object
 * @param {number} maxOvers - maximum overs for the inning (0 = unlimited)
 * @returns object - innings object
 */
function initMatchInning(battingTeam, bowlingTeam, maxOvers = 0) {
    // init inning for team
    var inningRecord = {
        limitOvers: maxOvers,
        ballsBowled: 0,
        ballsRemaining: () => { return (maxOvers * 6) - this.ballsBowled; },
        // batting team
        battingTeam: battingTeam.matchName,
        battingRecords: [],
        // bowling team
        bowlingTeam: bowlingTeam.matchName,
        bowlingRecords: [],
        // active players
        battingPair: [0, 1], // index of players in batting team
        battingStriker: 0, // index of player in batting pair
        bowlingPair: [0, 1], // index of players in bowling team
        bowlingStriker: 0, // index of player in bowling pair
    };

    // init batting records for each player in batting team
    battingTeam.batting.forEach(index => {
        inningRecord.battingRecords.push({
            playerName: battingTeam.players[index].forename + ' ' + battingTeam.players[index].surname,
            playerStatus: '-',
            runsScored: 0,
            ballsFaced: 0,
            out: false
        });
    });

    inningRecord.battingRecords[inningRecord.battingPair[0]].playerStatus = 'not out';
    inningRecord.battingRecords[inningRecord.battingPair[1]].playerStatus = 'not out';

    // init bowling records for each player in bowling team
    bowlingTeam.bowling.forEach(index => {
        inningRecord.bowlingRecords.push({
            playerName: bowlingTeam.players[index].forename + ' ' + bowlingTeam.players[index].surname,
            playerStatus: '-',
            oversBowled: 0,
            runsConceded: 0,
            wicketsTaken: 0,
            extrasConceded: 0
        });
    });

    inningRecord.bowlingRecords[inningRecord.bowlingPair[inningRecord.bowlingStriker]].playerStatus = 'current bowler'

    return inningRecord;
}

/**
 * Update the innings UI with current inning data.
 * 
 * @param {boolean} refresh - whether to re-initialise the UI (default: false)
 */
function uiUpdateInnings(refresh = false) {
    /**
     * @type {object}
     */
    var inning = _matchData.innings[_matchData.currentInning];
    /**
     * @type {HTMLTableElement}
     */
    var tableBatting = document.getElementById('scorecard-batting');
    /**
     * @type {HTMLTableElement}
     */
    var tableBowling = document.getElementById('scorecard-bowling');

    // check if it is the start of the inning or if refresh is true
    // if so, re-initialise the UI with inning data
    if ((inning.ballsBowled === 0) || (refresh)) { uiInitInnings(inning, tableBatting, tableBowling); }

    /**
     * @type {HTMLTableSectionElement}
     */
    var tableBattingBody = tableBatting.querySelector('tbody');
    /**
     * @type {HTMLTableSectionElement}
     */
    var tableBowlingBody = tableBowling.querySelector('tbody');

    for (var index = 0; index < inning.battingRecords.length; index++) {
        const player = inning.battingRecords[index];
        var row = tableBattingBody.rows[index];
        row.cells[0].children[1].textContent = player.playerStatus;
        row.cells[1].textContent = player.runsScored;
        row.cells[2].textContent = player.ballsFaced;
        row.cells[3].textContent = player.ballsFaced > 0 ? ((player.runsScored / player.ballsFaced) * 100).toFixed(2) : '0.00';
    }

    for (var index = 0; index < inning.bowlingRecords.length; index++) {
        const player = inning.bowlingRecords[index];
        var row = tableBowlingBody.rows[index];
        row.cells[0].children[1].textContent = player.playerStatus;
        row.cells[1].textContent = player.oversBowled > 0 ? player.oversBowled.toFixed(1) : '0.0';
        row.cells[2].textContent = player.runsConceded;
        row.cells[3].textContent = player.wicketsTaken;
        row.cells[4].textContent = player.extrasConceded;
        row.cells[5].textContent = player.oversBowled > 0 ? (player.runsConceded / player.oversBowled).toFixed(2) : '0.00';
    }
}

/**
 * Initialise the innings UI with inning data.
 * 
 * @param {object} inning - inning object
 * @param {HTMLTableElement} tBat - batting team table element
 * @param {HTMLTableElement} tBowl - bowling team table element
 */
function uiInitInnings(inning, tBat, tBowl) {
    /**
     * @type {HTMLTableCaptionElement}
     */
    var captionBatting = tBat.querySelector('caption');
    /**
     * @type {HTMLTableCaptionElement}
     */
    var captionBowling = tBowl.querySelector('caption');
    /**
     * @type {HTMLTableSectionElement}
     */
    var tableBattingBody = tBat.querySelector('tbody');
    /**
     * @type {HTMLTableSectionElement}
     */
    var tableBowlingBody = tBowl.querySelector('tbody');

    /**
     * @type {HTMLSpanElement}
     */
    var label = document.querySelector('span');
    label.textContent = inning.battingTeam + ((inning.currentInning > 1) ? ' 2nd Innings' : ' 1st Innings');

    captionBatting.textContent = inning.battingTeam + ' Batting';
    captionBowling.textContent = inning.bowlingTeam + ' Bowling';

    for (var index = 0; index < inning.battingRecords.length; index++) {
        const player = inning.battingRecords[index];
        var row = tableBattingBody.rows[index];
        row.cells[0].children[0].textContent = player.playerName;
    }

    for (var index = 0; index < inning.bowlingRecords.length; index++) {
        const player = inning.bowlingRecords[index];
        var row = tableBowlingBody.rows[index];
        row.cells[0].children[0].textContent = player.playerName;
    }
}

function actionBowlBall() {
    var inning = _matchData.innings[_matchData.currentInning];

    // runs or owzat roll
    var runsRoll = Math.round(Math.random() * 6); // 0-4 & 6 = runs, 5 = owzatRoll

    if (runsRoll !== 5) {
        // runs roll = runs scored
        inning.ballsBowled++;
        inning.battingRecords[inning.battingPair[inning.battingStriker]].runsScored += runsRoll;
        inning.battingRecords[inning.battingPair[inning.battingStriker]].ballsFaced++;
        inning.bowlingRecords[inning.bowlingPair[inning.bowlingStriker]].runsConceded += runsRoll;
        inning.bowlingRecords[inning.bowlingPair[inning.bowlingStriker]].oversBowled += 0.1;
    } else {
        // owzat roll = out or no ball
        var owzatRoll = Math.round(Math.random() * 6); // 0 = not out, 6 = out, 1-5 = no ball
    }

    uiUpdateInnings();
    localStorage.setItem('matchData', JSON.stringify(_matchData));
}