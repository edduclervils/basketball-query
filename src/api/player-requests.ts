export type BasketballPlayer = {
    playerId:    number
    fname:       string
    lname:       string
    bioMetrics:  BioMetrics
    careerStats: CareerStats
}

export type BioMetrics = {
    heightInches: number
    weightLbs:    number
}

export type CareerStats = {
    shotAttempts: number
    madeBaskets:  number
    rebounds:     number
    assists:      number
    blocks:       number
}

export type PlayerLookupReturn = {
    playerId:    number
    fname:       string
    lname:       string
    heightInches: number
}

export type BasketballPlayerCreation = {
    fname:       string
    lname:       string
    bioMetrics:  BioMetrics
    careerStats: CareerStats
}

export type BasketballPlayerUpdate = {
    playerId:    number
    shotAttempts: number
    madeBaskets:  number
    rebounds:     number
    assists:      number
    blocks:       number
}

type UpdateResults = {
    message: string
    playerId:    number
    shotAttempts: number
    madeBaskets:  number
    rebounds:     number
    assists:      number
    blocks:       number
}

export type PlayerInput = {
    fname: string
    lname: string 
    heightInches: number 
    weightLbs: number
}

// Fetch is the in built HTTP client in browsers
export async function getAllPlayers():Promise<BasketballPlayer[]>{

    const query = `query AllPlayersData{
        players{
          playerId
          fname
          lname
          bioMetrics{
            heightInches
            weightLbs
          }
          careerStats{
            shotAttempts
            madeBaskets
            rebounds
            assists
            blocks
          }
        }
      }`

    const body:string = JSON.stringify({query});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql",{method:"POST", body, headers:{"Content-Type":"application/json"}});// sometimes node is picky and requires the localhost IP as numbers rather than the name
    const responseBody = await httpResponse.json();
    const returnPlayers: BasketballPlayer[] = responseBody.data.players;
    return returnPlayers;
}

export async function additiveUpdatePlayers(updateForm: BasketballPlayerUpdate):Promise<UpdateResults[]> {

    const query = `mutation UpdateAPlayer($updateForPlayer:StatsInput!){
        mergeStats(input:$updateForPlayer){
              ...on BaksetballPlayer{
            playerId
            careerStats{
              madeBaskets
              shotAttempts
              rebounds
              assists
              blocks
            }
          }
          ...on PlayerDoesNotExist{
            playerId
            message
          }
        }
      }`
    const variables = {updateForPlayer:updateForm};
    const body:string = JSON.stringify({query, variables});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql",{method:"POST", body, headers:{"Content-Type":"application/json"}});// sometimes node is picky and requires the localhost IP as numbers rather than the name
    const responseBody = await httpResponse.json();
    const returnPlayers: UpdateResults[] = responseBody.data;
    if(responseBody.data.mergeStats.message){
        alert(responseBody.data.mergeStats.message);
    }
    return returnPlayers;
}

export async function getAllPlayersByLastName(lname:string):Promise<PlayerLookupReturn[]>{
    console.log(lname);

    const query = `query PlayersByLname($lnameToSearch:String){
        players(lname:$lnameToSearch){
          playerId
          fname
          lname
          bioMetrics{
            heightInches
            }
        }
      }`

    const variables = {lnameToSearch:lname}
    const body = JSON.stringify({query:query,variables:variables})

    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-Type":"application/json"}});
    const responseBody = await httpResponse.json();
    const players:PlayerLookupReturn[] = responseBody.data.players;
    console.log(players);
    return players
}

export async function createPlayer(basketballPlayer: PlayerInput):Promise<BasketballPlayer>{

    const query = `mutation AddPlayer($playerInput: NewPlayerInput!){
        addPlayer(input:$playerInput){
          playerId
        }
      }`

    const variables = {playerInput:basketballPlayer}
    const body:string = JSON.stringify({query:query,variables:variables});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-Type":"application/json"}});
    const responseBody = await httpResponse.json();
    const players:BasketballPlayer = responseBody.data.addPlayer;
    return players
}
