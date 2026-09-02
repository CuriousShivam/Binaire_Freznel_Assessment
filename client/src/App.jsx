import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import './index.css'
import Index from "./components/Index.jsx";
import UsableApp from "./components/UsableApp.jsx";

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route index element={<Index/>}/>
                    <Route path={'/app'} element={<UsableApp/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
