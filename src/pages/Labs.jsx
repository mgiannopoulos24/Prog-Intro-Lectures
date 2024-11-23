import React from "react";
import 'react-app-polyfill/ie11';
import CustomCardLab from "../components/other/CustomCardLab";
import labcardData from "../utils/labcardData";

const Labs = () => {
    
    return (
        <>  
            <div className="container mt-5">
                <div className="text-center">
                    <h1>Εργαστήρια</h1>
                    <h4>Εδώ θα βρεις όλα τα εργαστήρια με τις εκφωνήσεις και τις λύσεις τους!</h4>
                    <hr className="my-4" />
                </div>      
            </div>
            <div className="cards d-flex justify-content-center flex-wrap gap-3">
                {labcardData.map((card) => (
                    <CustomCardLab
                        key={card.id}
                        icon={card.icon}
                        title={card.title}
                        desc={card.desc}
                        solution={card.solution}                  
                    />
                ))}
            </div>
        </>
    );
}

export default Labs;