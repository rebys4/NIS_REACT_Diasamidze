import { createRoot } from "react-dom/client";
import "./styles/global.scss";
import App from "./App.tsx";
import { EventLogProdiver } from "./context/EventContext.tsx";

createRoot(document.getElementById("root")!).render(
    <EventLogProdiver>
        <App />
    </EventLogProdiver>
);
