import React from 'react';
import './Screen.css';

const GameOverScreen = (props) => {
  const winnerClass = props.winner === 'TEAM1' ? 'team1-background' : 'team2-background';
  const team1Score = props.score?.TEAM1;
  const team2Score = props.score?.TEAM2;
  const backgroundClass = winnerClass; // replace this with your logic

  // Apply the class to the body element
  document.body.className = backgroundClass;

  return (
    <div className='result-card'>
      <h2>{props.winner === 'TEAM1' ? 'Team Medieval Age' : 'Team Modern Age'} Wins!</h2>
      <div className='finalscores'>
        <h2>Team Medieval Age Score: {team1Score}</h2>
        <h2>Team Modern Age Score: {team2Score}</h2>
      </div>
    </div>
  );
};

export default GameOverScreen;
