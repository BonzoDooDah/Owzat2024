// @ts-nocheck
console.clear();

var owzatPlayers = null;
var owzatTeams = null;

/**
 * Initializes the game data by loading players and teams from JSON files.
 */
async function initGame() {
    console.log('Initializing game data...');

    // Load players and teams data from JSON files
    fetch('./data/players.json')
        .then(response => response.json())
        .then(data => {
            owzatPlayers = data.players;
            console.log(owzatPlayers.length + ' players loaded.');
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
    fetch('./data/teams.json')
        .then(response => response.json())
        .then(data => {
            owzatTeams = data.teams;
            console.log(owzatTeams.length + ' teams loaded.');
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });

    await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 0.1 second to ensure data is loaded
    console.log('Game data initialized.');

    // Initialize the team selction UI
    initTeamSelection();
}

/**
 * Initializes the team selection UI by creating dropdowns for home and away teams.
 */
function initTeamSelection() {
    console.log('Initializing team selection...');

    // Create team selection elements
    const selectTeamHome = document.getElementById('select-team-home');
    const selectTeamAway = document.getElementById('select-team-away');
    owzatTeams.forEach(team => {
        const optionTeam = document.createElement('option');
        optionTeam.value = team.id;
        optionTeam.textContent = team.name;
        selectTeamHome.appendChild(optionTeam.cloneNode(true));
        selectTeamAway.appendChild(optionTeam.cloneNode(true));
    });

    // Set up default selection index and event listeners for team selection dropdowns
    selectTeamHome.selectedIndex = 0;
    selectTeamHome.onchange = (event) => {
        validateStartMatch();
        if (event.target.parentElement.querySelector('table')) { event.target.parentElement.querySelector('table').remove(); }
        event.target.parentElement.appendChild(createSelectTeamPlayerList(event.target.selectedIndex));
    };
    selectTeamAway.selectedIndex = 1;
    selectTeamAway.onchange = (event) => {
        validateStartMatch();
        if (event.target.parentElement.querySelector('table')) { event.target.parentElement.querySelector('table').remove(); }
        event.target.parentElement.appendChild(createSelectTeamPlayerList(event.target.selectedIndex));
    };

    console.log('Team selection initialized.');
    validateStartMatch();
}

/**
 * Validates the selected teams and enables/disables the start match button accordingly.
 */
function validateStartMatch() {
    if ((document.getElementById('select-team-home').selectedIndex === -1) || (document.getElementById('select-team-away').selectedIndex === -1)) {
        document.getElementById('btnStartMatch').disabled = true;
    } else {
        document.getElementById('btnStartMatch').disabled = false;
    }
}

/**
 * Creates a table of players for the selected team for appending after the team selection dropdown.
 * 
 * @param {number} index - The index of the team in the owzatTeams array.
 * @returns HTMLTableElement - A table element containing the players of the selected team.
 */
function createSelectTeamPlayerList(index = -1) {
    if (index === -1) { return; }

    const team = owzatTeams[index];
    const elemTeam = document.createElement('table');

    team.players.forEach(element => {
        const player = owzatPlayers[element];
        const row = elemTeam.insertRow(-1);
        const cellName = row.insertCell(0);
        cellName.textContent = player.forename + ' ' + player.surname;
    });

    return elemTeam;
}