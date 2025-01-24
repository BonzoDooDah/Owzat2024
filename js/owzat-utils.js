const teams = [
    {
        name: "England - Winter Tour 2024",
        teamname: "England",
        shortname: "ENG",
        players: ["P0000006", "P0000007", "P0000016", "P0000017", "P0000003", "P0000020", "P0000008", "P0000010", "P0000021", "P0000001", "P0000004"],
        battingOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        bowlingStarters: [9, 10],
        captain: 5,
        wicketKeeper: 6
    },
    {
        name: "India - Winter Tour 2024",
        teamname: "India",
        shortname: "IND",
        players: ["P0000018", "P0000012", "P0000009", "P0000015", "P0000011", "P0000014", "P0000013", "P0000002", "P0000022", "P0000019", "P0000005"],
        battingOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        bowlingStarters: [10, 9],
        captain: 0,
        wicketKeeper: 6
    }
];

const dBplayers = [
    { id: "P0000001", forename: "James", surname: "Anderson", nation: "ENG", bat: "45", bowl: "95", field: "84" },
    { id: "P0000002", forename: "Ravichandran", surname: "Ashwin", nation: "IND", bat: "56", bowl: "78", field: "79" },
    { id: "P0000003", forename: "Jonny", surname: "Bairstow", nation: "ENG", bat: "88", bowl: "45", field: "73" },
    { id: "P0000004", forename: "Shoaib", surname: "Bashir", nation: "ENG", bat: "35", bowl: "89", field: "79" },
    { id: "P0000005", forename: "Jasprit", surname: "Bumrah", nation: "IND", bat: "35", bowl: "89", field: "79" },
    { id: "P0000006", forename: "Zak", surname: "Crawley", nation: "ENG", bat: "90", bowl: "10", field: "87" },
    { id: "P0000007", forename: "Ben", surname: "Duckett", nation: "ENG", bat: "90", bowl: "21", field: "67" },
    { id: "P0000008", forename: "Ben", surname: "Foakes", nation: "ENG", bat: "78", bowl: "8", field: "90" },
    { id: "P0000009", forename: "Shubman", surname: "Gill", nation: "IND", bat: "91", bowl: "27", field: "76" },
    { id: "P0000010", forename: "Tom", surname: "Hartley", nation: "ENG", bat: "56", bowl: "78", field: "79" },
    { id: "P0000011", forename: "Ravi", surname: "Jadeja", nation: "IND", bat: "88", bowl: "45", field: "73" },
    { id: "P0000012", forename: "Yashasvi", surname: "Jaiswal", nation: "IND", bat: "90", bowl: "21", field: "67" },
    { id: "P0000013", forename: "Dhruv", surname: "Jurel", nation: "IND", bat: "78", bowl: "8", field: "90" },
    { id: "P0000014", forename: "Sarfaraz", surname: "Khan", nation: "IND", bat: "90", bowl: "68", field: "72" },
    { id: "P0000015", forename: "Devdutt", surname: "Padikkal", nation: "IND", bat: "95", bowl: "54", field: "88" },
    { id: "P0000016", forename: "Ollie", surname: "Pope", nation: "ENG", bat: "91", bowl: "27", field: "76" },
    { id: "P0000017", forename: "Joe", surname: "Root", nation: "ENG", bat: "95", bowl: "54", field: "88" },
    { id: "P0000018", forename: "Rokit", surname: "Sharma", nation: "IND", bat: "90", bowl: "10", field: "87" },
    { id: "P0000019", forename: "Mohammed", surname: "Siraj", nation: "IND", bat: "45", bowl: "95", field: "84" },
    { id: "P0000020", forename: "Ben", surname: "Stokes", nation: "ENG", bat: "90", bowl: "68", field: "72" },
    { id: "P0000021", forename: "Mark", surname: "Wood", nation: "ENG", bat: "45", bowl: "87", field: "80" },
    { id: "P0000022", forename: "Kuldeep", surname: "Yadav", nation: "IND", bat: "45", bowl: "87", field: "80" }
];

function BfxGetPlayerData(id) {
    for (let index = 0; index < dBplayers.length; index++) {
        const element = dBplayers[index];
        if (element.id == id) return element;
    }
    return null;
}

function BfxRandomInt(max) {
    return Math.floor(Math.random() * max);
}
