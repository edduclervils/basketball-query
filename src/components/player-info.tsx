import { useQuery } from "react-query"
import { getAllPlayers } from "../api/player-requests"


export function PlayerInfo(){

    const {isLoading, isError, data = []} = useQuery("playercache",getAllPlayers);

    if (isLoading){ return <p>LOADING</p>}

    if (isError){return <p>There was an Error</p>}

    return <>
        <h2>Player Info</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th><th>Player ID</th><th>Shots Made</th><th>Shots Attempted</th>
                    <th>Rebounds</th><th>Assists</th><th>Blocks</th>
                </tr>
            </thead>
            <tbody>
                {data.map(pl => <tr key={pl.playerId}><td>{pl.fname} {pl.lname}</td><td>{pl.playerId}</td>
                <td>{pl.careerStats.madeBaskets}</td><td>{pl.careerStats.shotAttempts}</td>
                <td>{pl.careerStats.rebounds}</td><td>{pl.careerStats.assists}</td><td>{pl.careerStats.blocks}</td>
                </tr>)}
            </tbody>
        </table>
    </>
}