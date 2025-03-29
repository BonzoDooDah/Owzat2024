// @ts-nocheck

var matchType = null;
var teamHome = null;
var teamAway = null;

function initMatch() {
    console.log('Initializing match...');

    loadMatchData();

    console.log('Match initialized.');
}

function loadMatchData() {
    console.log('Loading match data...');

    matchType = localStorage.getItem('matchType');
    teamHome = JSON.parse(localStorage.getItem('teamHome'));
    teamAway = JSON.parse(localStorage.getItem('teamAway'));

    console.log('Match type:', matchType);
    console.log('Home team:', teamHome);
    console.log('Away team:', teamAway);

    console.log('Match data loaded.');
}