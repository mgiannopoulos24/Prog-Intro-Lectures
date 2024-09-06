import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import './CustomCard.css'; 

const CustomCard = ({icon, title, source, slides, part1, part2 }) => {
    return (
        <Card className="custom-card">
            <div className="custom-card-header">
                <div className="icon-above-title">
                    {icon}
                </div>
                <Typography variant="h4" component="div" className="custom-card-title">
                    {title}
                </Typography>
            </div>
            <div className="upper-section">
                <button href={source} className="custom-button">
                    Προτεινόμενη Βιβλιογραφία
                </button>
                <button variant="contained" href={slides} className="custom-button">
                    Διαφάνειες
                </button>
            </div>
            <div className="lower-section">
                    <button variant="contained" href={part1} className="custom-button custom-half-width-button">
                        Διάλεξη Μέρος 1
                    </button>
                    <button variant="contained" href={part2} className="custom-button custom-half-width-button">
                        Διάλεξη Μέρος 2
                    </button>
            </div>
        </Card>
    );
};

export default CustomCard;