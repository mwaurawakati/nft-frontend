import type { NextPage } from "next";
import { BrowserRouter as Router } from "react-router-dom";
import CreateCollection from "@/templates/Create";

const Create: NextPage = () => {
    return (
        <Router>
            <CreateCollection />
        </Router>
    );
};

export default Create;
