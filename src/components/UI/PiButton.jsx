import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { AppContext } from '../../context/AppContext';

// Keyframe animation for hover effect
const hoverAnimation = keyframes`
  from {
    background-position: left center;
  }
  to {
    background-position: right center;
  }
`;

const GradientButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    background: 'linear-gradient(90deg, #9747FF, #9747FF)',
    color: '#fff',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '25px',
    overflow: 'hidden',
    boxShadow: '0px 4px 8px rgba(138, 43, 226, 0.3)',
    backgroundSize: '200% auto',
    transition: 'transform 0.3s ease',
    width: '230px',
    height: '60px',
    '&:hover': {
        animation: `${hoverAnimation} 0.4s ease-in-out forwards`,
        transform: 'scale(1.05)',
        boxShadow: '0px 6px 12px rgba(138, 43, 226, 0.5)',
    },
    // First line
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '-8px',
        width: '150%',
        height: '12px',
        background: 'rgba(255, 255, 255, 0.5)',
        transform: 'rotate(116deg)',
        zIndex: '1',
        pointerEvents: 'none',
        opacity: 0.6
    },
    // Second line
    '&::after': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '-30px',
        width: '150%',
        height: '25px',
        background: 'rgba(255, 255, 255, 0.5)',
        transform: 'rotate(116deg) translateY(10px)', // Second line offset
        zIndex: '1',
        pointerEvents: 'none',
        opacity: 0.8
    },
    '& span': {
        position: 'relative',
        zIndex: '2', // Keeps the text above the lines
    },
}));

function PiButton({ text }) {
    const { setShowChatbot, showChatbot } = useContext(AppContext)
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <GradientButton onClick={() => setShowChatbot(!showChatbot)} >
                <span>{text}</span>
            </GradientButton>
        </div>
    );
}

export default PiButton;
