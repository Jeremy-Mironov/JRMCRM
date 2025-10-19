import React from "react";
import Sidebar from "../components/Sidebar";
import FallingText from "../assets/FallingText.jsx";

export default function Dashboard() {
    return (

        <div className="css-r7f15b">     <FallingText
            text={`Clic on the text. Clic on the text. Clic on the text. Clic on the text. Clic on the text. Clic on the text. Clic on the text. Clic on the text. Clic on the text. Clic on the text. Clic on the text. Clic on the text. `}
            highlightWords={["React", "Bits", "animated", "components", "simplify"]}
            highlightClass="highlighted"
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="2rem"
            mouseConstraintStiffness={0.9}
        /></div>
    );

}
