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
                <a href={source} target="_blank" rel="noopener noreferrer" className="custom-button">
                    Προτεινόμενη Βιβλιογραφία
                </a>
                <a href={slides} target="_blank" rel="noopener noreferrer" className="custom-button">
                    Διαφάνειες
                </a>
            </div>
            <div className="lower-section">
                <a href={part1} target="_blank" rel="noopener noreferrer" className="custom-button custom-half-width-button">
                    Διάλεξη Μέρος 1
                </a>
                <a href={part2} target="_blank" rel="noopener noreferrer" className="custom-button custom-half-width-button">
                    Διάλεξη Μέρος 2
                </a>
            </div>
        </Card>
    );
};

export default CustomCard;
