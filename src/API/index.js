const cohortCode = '2401-FTB-MT-WEB-PT'
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortCode}`

const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}/players`);
        const result = await response.json();
        if (result.error) throw result.error;
        return result.data.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/players/${playerId}`);
        const result = await response.json();
        if (result.error) throw result.error;
        return result.data.player;
    } catch (err) {
        console.error('Uh oh, trouble fetching player!', err);
    }
};



export { fetchAllPlayers, fetchSinglePlayer }