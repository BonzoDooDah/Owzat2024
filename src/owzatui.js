// @ts-nocheck
export const UIID = {
    initUI: initUI,
    HEADER: 'header',
    MENU: 'menu',
    MATCH_SETUP: 'match-setup',
    TEAM_SELECTION: 'team-selection',
    MATCH_TYPE: 'match-type',
    BTN_START_MATCH: 'btn-start-match',
    BTN_MATCH_NEW: 'btn-match-new',
    BTN_MATCH_RESUME: 'btn-match-resume'
}

import { owzatData } from './owzatdata.js'; // Import players and teams data

function initUI(){
    console.log('Initialising UI...');
    document.body.innerHTML = ''; // Clear existing content
    const elemMain = document.createElement('main');
    elemMain.className = 'main';
    elemMain.id = 'main';
    initUI_Header(elemMain); // Initialize header
    initUI_Menu(elemMain); // Initialize menu
    initUI_MatchSetup(elemMain); // Initialize match setup
    document.body.appendChild(elemMain);
    console.log('UI initialised.');
}

function initUI_Header(elemParent) {
    console.log('Initializing header...');
    const elemHeader = document.createElement('header');
    elemHeader.className = 'header';
    elemHeader.id = UIID.HEADER;
    elemHeader.innerHTML = `
        <h1>Owzat!</h1>
        <span>Cricket Match Simulator (Version 0.0.1)</span>`;
    elemParent.appendChild(elemHeader);
}

function initUI_Menu(elemParent) {
    console.log('Initializing menu...');
    const elemMenu = document.createElement('nav');
    elemMenu.className = 'menu';
    elemMenu.id = UIID.MENU;
    elemMenu.innerHTML = `
        <button id="${UIID.BTN_START_NEW}">New Match</button>
        <button id="${UIID.BTN_MATCH_RESUME}" disabled>Resume Match</button>`;
    elemParent.appendChild(elemMenu);
    elemMenu.children[0].addEventListener('click', function (ev) { // new match button
        document.getElementById(UIID.MENU).style.display = 'none';
        document.getElementById(UIID.MATCH_SETUP).style.display = 'flex';
    });
    elemMenu.children[1].addEventListener('click', function (ev) { // resume match button
        doResumeMatch();
    });
}

function initUI_MatchSetup(elemParent) {
    console.log('Initializing match setup...');
    const elemMatchSetup = document.createElement('section');
    elemMatchSetup.className = 'match-setup';
    elemMatchSetup.id = UIID.MATCH_SETUP;
    elemMatchSetup.innerHTML = `
        <h2>Match Setup</h2>
        <div class="menu">
            <button id="${UIID.BTN_START_MATCH}" disabled>Start Match</button>
        </div>
        <div class="match-selection-type">
            <label for="${UIID.MATCH_TYPE}">Match Type:</label>
            <select id="${UIID.MATCH_TYPE}">
                <option value="TEST">Test</option>
                <option value="1DAY">One Day</option>
                <option value="T20">Twenty20</option>
            </select>
        </div>`;
    const elemTeamSelect = document.createElement('div');
    elemTeamSelect.className = UIID.TEAM_SELECTION;
    elemTeamSelect.id = UIID.TEAM_SELECTION;
    elemMatchSetup.appendChild(elemTeamSelect);
    elemMatchSetup.children[1].children[0].addEventListener('click', function(ev) {
        doStartMatch();
    });
    initUI_TeamSelect(elemTeamSelect, true); // Initialize home team selection
    initUI_TeamSelect(elemTeamSelect, false); // Initialize away team selection
    elemMatchSetup.style.display = 'none';
    elemParent.appendChild(elemMatchSetup);
}

function initUI_TeamSelect(elemParent, isHomeTeam) {
    var teamName = isHomeTeam ? 'Home' : 'Away';
    var teamId = isHomeTeam ? 'home-' : 'away-';
    console.log('Initializing ' + teamName + ' team selection...');
    const elemTeamSelect = document.createElement('div');
    elemTeamSelect.className = 'team-selection-container';
    elemTeamSelect.id = teamId + 'team-selection-container';
    elemTeamSelect.innerHTML = `
        <div class="team-selection-item">
            <label for="${teamId}select-team">${teamName} Team</label>
            <select id="${teamId}select-team"></select>
        </div>
        <table id="${teamId}team-players" class="team-players-table">
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`;
    const elemSelect = elemTeamSelect.querySelector('select');
    owzatData.teams.forEach(team => {
        const optionTeam = document.createElement('option');
        optionTeam.value = team.id;
        optionTeam.textContent = team.name;
        elemSelect.appendChild(optionTeam.cloneNode(true));
    });
    elemSelect.selectedIndex = -1;
    elemSelect.addEventListener('change', function (ev) {
        const selectedTeam = elemSelect.selectedIndex;
        const teamPlayers = owzatData.teams[selectedTeam].players;
        const teamPlayersTable = elemSelect.parentElement.parentElement.querySelector('table tbody');
        teamPlayersTable.innerHTML = ''; // Clear existing rows
        teamPlayers.forEach(element => {
            const player = owzatData.players[element];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${player.forename}&nbsp${player.surname}</td>
                <td>${player.role}</td>`;
            teamPlayersTable.appendChild(row);
        });
        validateStartMatch(); // Validate the match setup after team selection
    });
    elemParent.appendChild(elemTeamSelect);
}

function validateStartMatch() {
    if ((document.getElementById('home-select-team').selectedIndex > -1) && 
        (document.getElementById('away-select-team').selectedIndex > -1)) {
        document.getElementById(UIID.BTN_START_MATCH).disabled = false;
    }
}

function doStartMatch() {
    owzatData.match = {
        type: document.getElementById(UIID.MATCH_TYPE).value,
        home: owzatData.teams[document.getElementById('home-select-team').selectedIndex],
        away: owzatData.teams[document.getElementById('away-select-team').selectedIndex]
    };
    localStorage.setItem('matchData', JSON.stringify(owzatData.match));
    doResumeMatch();
}

function doResumeMatch() {
    console.clear();
    console.log(owzatData.match);
}