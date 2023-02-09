import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { BasketballPlayerCreation, createPlayer, PlayerInput } from "../api/player-requests"


type NewPlayers = {
    fname:       string
    lname:       string
    heightInches: number
    weightLbs:    number

}

export function RegisterPlayerForm(){

    const [form, setForm] = useState<NewPlayers>({
        fname:"",
        lname:"",
        heightInches:0,
        weightLbs: 0
    });
    
    const queryClient = useQueryClient();

    const creationMutation = useMutation(createPlayer, {
        onSuccess: ()=> queryClient.invalidateQueries("playercache")
    })

    function createAPlayer (){
        const playerForm: PlayerInput = {
            fname: form.fname,
            lname: form.lname,
            heightInches: form.heightInches,
            weightLbs: form.weightLbs}
            creationMutation.mutate(playerForm);
        }

        
    
  

    return <>
        <h2>Player Registration Form</h2>
        <fieldset>
            <legend>Register Form</legend>

            <input type="text" placeholder="First Name" onChange={e=>setForm({...form, fname:e.target.value})}/>
            <input type="text" placeholder="Last Name" onChange={e=>setForm({...form, lname:e.target.value})}/>
            <input type="number" placeholder="Height (inches)" onChange={e=>setForm({...form,heightInches:Number(e.target.value)})} />
            <input type="number" placeholder="Weight (pounds)" onChange={e=>setForm({...form,weightLbs:Number(e.target.value)})}/>
            <br />
            <button onClick={createAPlayer}>Add Player</button>
        </fieldset>
    </>
}