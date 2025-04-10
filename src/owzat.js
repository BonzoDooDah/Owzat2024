// @ts-nocheck
console.clear();

var owzatPlayers = null;
var owzatTeams = null;

function validateStartMatch() {
    if ((document.querySelector('#select-team-home').selectedIndex > -1) &&
        (document.querySelector('#select-team-away').selectedIndex > -1)) {
        document.querySelector('#btn-start-match').disabled = false; // Enable the 'Start Match' button.
    }
}

function uiCreateTeamSelection() {

    function uiPopulateTeamSelect(elemSelect) {
        owzatTeams.forEach(team => {
            const optionTeam = document.createElement('option');
            optionTeam.value = team.id;
            optionTeam.textContent = team.name;
            elemSelect.appendChild(optionTeam.cloneNode(true));
        });
        elemSelect.selectedIndex = -1;
        elemSelect.addEventListener('change', function (ev) {
            const selectedTeam = elemSelect.selectedIndex;
            const teamPlayers = owzatTeams[selectedTeam].players;
            const teamPlayersTable = elemSelect.parentElement.querySelector('table tbody');
            teamPlayersTable.innerHTML = ''; // Clear existing rows
            teamPlayers.forEach(element => {
                const player = owzatPlayers[element];
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${player.forename}&nbsp${player.surname}</td>
                    <td>${player.batSkill}</td>
                    <td>${player.bowlSkill}</td>
                    <td>${player.fieldSkill}</td>
                `;
                teamPlayersTable.appendChild(row);
            });
            validateStartMatch(); // Validate the match setup after team selection
        });
    }

    const elemSection = document.createElement('section');
    elemSection.className = 'match-setup';

    elemSection.id = 'match-setup';
    elemSection.innerHTML = `
        <h2>Match Setup</h2>
        <div class="match-selection-type">
            <label for="match-type">Match Type:</label>
            <select id="match-type">
                <option value="TEST">Test</option>
                <option value="1DAY">One Day</option>
                <option value="T20">Twenty20</option>
            </select>
            <button id="btn-start-match" disabled>Start Match</button>
        </div>
        <div class="team-selection-container">
            <div class="team-selection-item">
                <label for="select-team-home">Home Team</label>
                <select id="select-team-home"></select>
                <table id="team-home-players" class="team-players-table">
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Bat</th>
                            <th>Bowl</th>
                            <th>Field</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="team-selection-item">
                <label for="select-team-away">Away Team</label>
                <select id="select-team-away"></select>
                <table id="team-away-players" class="team-players-table">
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Bat</th>
                            <th>Bowl</th>
                            <th>Field</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>`;

    uiPopulateTeamSelect(elemSection.querySelector('#select-team-home'));
    uiPopulateTeamSelect(elemSection.querySelector('#select-team-away'));

    elemSection.querySelector('#btn-start-match').addEventListener('click', function (ev) {
        alert('Match started! ' + elemSection.querySelector('#match-type').value);
    });

    document.body.appendChild(elemSection);
}

async function initMatch() {
    console.log('Initializing game data...');

    console.log('Clearing local storage...');
    localStorage.clear(); // Clear local storage to reset the game state

    // Load players and teams data from JSON files
    fetch('./data/players.json')
        .then(response => response.json())
        .then(data => {
            owzatPlayers = data.players;
            console.log(owzatPlayers.length + ' players loaded.'); //, owzatPlayers);
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
    fetch('./data/teams.json')
        .then(response => response.json())
        .then(data => {
            owzatTeams = data.teams;
            console.log(owzatTeams.length + ' teams loaded.'); //, owzatTeams);
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });

    await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 0.1 second to ensure data is loaded
    console.log('Game data initialized.');

    uiCreateTeamSelection(); // Initialize the team selection UI
}