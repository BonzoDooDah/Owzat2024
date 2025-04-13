// @ts-nocheck

export const owzatData = {
    players: null,
    teams: null,
    match: null,
    initData: initData
};

async function initData() {
    console.log('Initializing game data...');
    // Load players and teams data from JSON files
    await fetch('./data/players.json')
        .then(response => response.json())
        .then(data => {
            owzatData.players = data.players;
            console.log(owzatData.players.length + ' players loaded.'); //, owzatPlayers);
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
    await fetch('./data/teams.json')
        .then(response => response.json())
        .then(data => {
            owzatData.teams = data.teams;
            console.log(owzatData.teams.length + ' teams loaded.'); //, owzatTeams);
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });

    if (owzatData.players === null || owzatData.teams === null) {
        console.error('Failed to load game data!');
        return false;
    }
    console.log('Game data initialized.');
    return true;
}