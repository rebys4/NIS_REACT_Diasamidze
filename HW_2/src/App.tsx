import type React from "react";
import { EventLog } from "./components/EventLog/EventLog";
import { Dashboard } from "./pages/Dashboard";

export const App: React.FC = () => {
    return (
        <>
            <Dashboard />
            <EventLog />
        </>
    );
};

export default App;
