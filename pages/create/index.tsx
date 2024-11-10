import type { NextPage } from "next";
import { BrowserRouter as Router } from "react-router-dom";
import CreatePage from "@/templates/Create/CreatePage";

const Create: NextPage = () => {
    return (
        <Router>
            <CreatePage />
        </Router>
    );
};

export default Create;
