import React from 'react';
import {useCampaigns} from "./hooks/campaigns";
import { Campaign } from "./components/campaign";
import { ICampaign } from './models';

function App() {
  const page: number = 0;
  const size: number = 5;
  const {campaigns, error, loading} = useCampaigns({page: page, size: size})
  return (<div>
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    {campaigns.map((campaign: ICampaign) => <Campaign campaign={campaign} />)}
  </div>);
}

export default App;
