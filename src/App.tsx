import React from 'react';
import {Route, Routes} from "react-router-dom";
import {CampaignsPage} from "./pages/CampaignsPage";
import {CampaignFullPage} from "./pages/CampaignFullPage";
import {LocationFullPage} from "./pages/LocationFullPage";


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<CampaignsPage/>}/>
            <Route path="/campaign/:campaignId"  element={<CampaignFullPage/>}/>
            <Route path="/location/:locationId" element={<LocationFullPage/>}/>
        </Routes>)
}
