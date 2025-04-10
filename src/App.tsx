import React from 'react';
import {Route, Routes} from "react-router-dom";
import {CampaignsPage} from "./pages/CampaignsPage";
import {CampaignFullPage} from "./pages/CampaignFullPage";
import {LocationFullPage} from "./pages/LocationFullPage";
import {ModalState} from "./context/ModalContext";
import {MapPage} from "./pages/MapPage";

export default function App() {
    return (
        <ModalState>
            <Routes>
                <Route path="/" element={<CampaignsPage/>}/>
                <Route path="/campaign/:campaignId" element={<CampaignFullPage/>}/>
                <Route path="/campaign/:campaignId/location/:locationId" element={<LocationFullPage/>}/>
                <Route path="/campaign/:campaignId/open-location/:locationId" element={<MapPage/>}/>
            </Routes>
        </ModalState>)
}
