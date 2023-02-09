import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { additiveUpdatePlayers, BasketballPlayerUpdate } from "../api/player-requests"

type UpdateForm = {
    playerId:    string
    madeBaskets:  number
    shotAttempts: number
    rebounds:     number
    assists:      number
    blocks:       number
}

export function PlayerUpdateForm(){
    const [form,setForm] = useState<UpdateForm>({playerId:"",madeBaskets:0,shotAttempts:0,rebounds:0,assists:0,blocks:0});
    
    const queryClient = useQueryClient();

    const updatePlayerMutation = useMutation(additiveUpdatePlayers,{
        onSuccess: ()=> queryClient.invalidateQueries("playercache")
    });
    function updatePlayer(){
        if (form.playerId === ""){
            alert("Please Enter a Player ID");
        }
        else{
            let numberPlayerId = Number(form.playerId); 
            const additiveUpdates: BasketballPlayerUpdate = {
                playerId: numberPlayerId,
                shotAttempts: form.shotAttempts,
                madeBaskets: form.madeBaskets,
                rebounds: form.rebounds,
                assists: form.assists,
                blocks: form.blocks
            }
            updatePlayerMutation.mutate(additiveUpdates);
        }
    }

    return <>
        <h2>Player Update Form</h2>
        <fieldset>
            <legend>Update Form</legend>
            <p>This is an additive form. Input the ID of the player you wish to select and the values you wish to add.</p>

            <input type="number" placeholder="Player ID" onChange={e=>setForm({...form, playerId:e.target.value})}/>
            <input type="number" placeholder="Shots Made" onChange={e=>setForm({...form,madeBaskets:Number(e.target.value)})}/>
            <input type="number" placeholder="Shots Attempted" onChange={e=>setForm({...form,shotAttempts:Number(e.target.value)})} />
            <input type="number" placeholder="Rebounds" onChange={e=>setForm({...form,rebounds:Number(e.target.value)})} />
            <input type="number" placeholder="Assists" onChange={e=>setForm({...form,assists:Number(e.target.value)})} />
            <input type="number" placeholder="Blocks" onChange={e=>setForm({...form,blocks:Number(e.target.value)})} />
            <br />
            <button onClick={updatePlayer}>Update</button>
        </fieldset>
    </>
}