import { useState, useEffect } from 'react'
import PlayerCard from './PlayerCard'
import { fetchAllPlayers } from '../API'

function AllPlayers() {
    const [players, setPlayers] = useState([])
    const [filteredPlayers, setFilteredPlayers] = useState([])

    useEffect(() => {
        const getPlayers = async () => {
            const players = await fetchAllPlayers()
            setPlayers(players)
            setFilteredPlayers(players)
        }
        getPlayers()
    }, [])

    const onInputChange = (event) => {
        const searchTerm = event.target.value.toLowerCase()
        const filteredPlayers = players.filter(player => player.name.toLowerCase().includes(searchTerm))

        setFilteredPlayers(filteredPlayers);
    }

    return (
        <>
            <input onChange={onInputChange} />
            {filteredPlayers.map(player => <PlayerCard key={player.id} player={player} />)}
        </>
    )
}

export default AllPlayers