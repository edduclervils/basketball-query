import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { PlayerInfo } from './components/player-info';
import { PlayerLookUp } from './components/player-lookup';
import { PlayerUpdateForm } from './components/player-update-form';
import { RegisterPlayerForm } from './components/register-player-form';

const queryClient = new QueryClient();


function App() {
  return <>
    <h1>Basketball with GQL</h1>
    <br /><br />
    <QueryClientProvider client={queryClient}>
      <PlayerInfo></PlayerInfo>
      <PlayerUpdateForm></PlayerUpdateForm>
      <PlayerLookUp />
      <RegisterPlayerForm />
    </QueryClientProvider>
    

    
  </>
}

export default App;
       