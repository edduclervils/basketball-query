import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllPlayersByLastName, PlayerLookupReturn } from "../api/player-requests";

type FoundPlayers = {
    playerId:    number
    fname:       string
    lname:       string
    heightInches: number
}

export function PlayerLookUp(){
    let lname:string = " ";
    let lnameHolder:string = "";
    

    const queryClient = useQueryClient();

    const {data = []} = useMutation(getAllPlayersByLastName, {
        onSuccess: ()=>queryClient.invalidateQueries("playercache")
    });



    // const {isLoading, isError, data = []} = useQuery("playercache",()=>getAllPlayersByLastName(lname));

    // if (isLoading){ return <p>LOADING</p>}

    // if (isError){return <p>There was an Error</p>}

    function setName(event:React.ChangeEvent<HTMLInputElement>){
        lnameHolder = event.target.value;
    }

    function lookupPlayers(){

        lname = lnameHolder;
        const results = getAllPlayersByLastName(lname)
        console.log(results);
        queryClient.invalidateQueries("playercache");
    };


    return <>
        <h2>Look Up a Player`</h2>
        <fieldset>
            <legend>Lookup Form</legend>

            <input type="text" placeholder="Last Name" onChange={setName}/>
            <br />
            <button onClick={lookupPlayers}>Lookup Players</button>
        </fieldset>
        <fieldset>
            <table>
                <thead>
                    <tr>
                        <th>Name</th><th>Height</th>
                    </tr>
                </thead>
                <tbody>
                {data.map(p => <tr key={p.playerId}><td>{p.fname} {p.lname}</td><td>{p.heightInches}</td></tr> )}
                </tbody>
            </table>
        </fieldset>
    </>
}
