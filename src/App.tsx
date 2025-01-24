import React from 'react';
import {Route, Routes} from "react-router-dom";
import {MasterPage} from "./pages/MasterPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MasterPage/>}/>
        </Routes>)
}
