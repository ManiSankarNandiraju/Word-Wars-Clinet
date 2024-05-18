import { React } from 'react';
import Describer from './Describer';
import Viewer from './Viewer';
import Guesser from './Guesser';
import GameOverScreen from './GameOverScreen';
import '../App.css'
import './Screen.css'


export default function Screen(props) {
    const users = props.users;
    const team1 = props.team1;
    const team2 = props.team2;
    const usersString = getUsersString(users);
    const team1String = getTeamString(team1);
    const team2String = getTeamString(team2);
    const team1Valid = validateTeam(team1); 
    const team2Valid = validateTeam(team2); 
    const firstUser = props.firstUser
    const roleGiven = props.isDescriber || props.isGuesser || props.isViewer
    const isValidated = team1Valid && team2Valid && firstUser && !roleGiven && !props.showScoreScreen;
    // const guessTeamString = buildGuessingTeamString(props.guesserNames);
    console.log(isValidated);
    const backgroundClass = 'background'; // replace this with your logic

    // Apply the class to the body element
    document.body.className = backgroundClass;
    const beforeRound =    
<>

  {!props.showScoreScreen ? (
    <>

      <div className='joinscreen-medivalblock'>
        <h3>Team Medieval Age</h3>
        <div className='teammedival'>{team1String.split(',').map((user, index) => (
            <p key={index}>{user.trim()}</p>
        ))}</div>
        <button className={`medivalage ${props.hasJoinedTeamOne ? 'joined' : ''}`} onClick={props.joinTeamOne}>
          <span>Join</span>
        </button>
      </div>
      <div className='joinscreen-modrenblock'>
        <h3>Team Modern Age</h3>
        <div className='teammodren'>{team2String.split(',').map((user, index) => (
            <p key={index}>{user.trim()}</p>
        ))}</div>
        <button className={`modrenage ${props.hasJoinedTeamTwo ? 'joined' : ''}`} onClick={props.joinTeamTwo}>
          <span>Join</span>
        </button>
      </div>   

      <div className='users-list'>
    <label> Members Joined :</label>
    <div className='user-content'>
        {usersString.split(',').map((user, index) => (
            <p key={index}>{user.trim()}</p>
        ))}
    </div>
    </div>
      <br />
      {isValidated ? (
          <button className="startbutton" onClick={props.startGame}>
            Start
          </button>
      ) : (
            <></>
        )}

        </>
    ) : (
        <></>
    )}  
    </>
    const markedWordsComp = 
    <div className='previous-round-words-container'>
        <p>Previous round's words:</p>
        {props.markedWords.map((word, i) => {
            if(word.isCorrect) {
                return <p key={i} ><b>{word.word}</b> <span style={correctWordStyle}>&#10003;</span></p>
            } return <p key={i} ><b>{word.word}</b> <span style={inCorrectWordStyle}>&#10007;</span></p>
        })}
    </div>

    const currentDescriberScreen = 
    <>  
        <div className='comments'>
            <h3>You're The Describer</h3>
        <button className="readybutton" onClick={props.nextRound}>Ready</button>
        </div>
    </>

    const viewerOrGuesserScreen = 
    <>
        <div className='comments'>
        <h3>{props.currentGuesserName} is the describer</h3>
        </div>
    </>

    // const notCurrentDescriberScreen =
    // <>
    //     <h2>{props.describerName}'s turn</h2>
    //     <h3>{props.describerName}'s team {`(${guessTeamString})`} will be guessing the words</h3>
    // </>

    const showScoreScreen = (
        <>
          {props.markedWords.length ? markedWordsComp : <></>}
          
          {/* Team Medieval Age */}
          <div className="medivalage-team-container">
            <div className="progress-container-medivalage">
              <div className="progress-bar-medivalage" style={{ width: `${(props.score.TEAM1 / 40) * 100}%` }}></div>
            </div>
            <div className='medivalblock'>
              <h3>Team Medieval Age</h3>
              <p>Score: <b>{props.score.TEAM1}</b></p>
              <div className='teammedival'>{team1String.split(',').map((user, index) => (
                <p key={index}>{user.trim()}</p>
              ))}</div>
            </div>
          </div>
          
          {/* Team Modren Age */}
          <div className="modrenage-team-container">
            <div className="progress-container-modrenage">
              <div className="progress-bar-modrenage" style={{ width: `${(props.score.TEAM2 / 40) * 100}%` }}></div>
            </div>
            <div className='modrenblock'>
              <h3>Team Modern Age</h3>
              <p>Score: <b>{props.score.TEAM2}</b></p>
              <div className='teammodren'>{team2String.split(',').map((user, index) => (
                <p key={index}>{user.trim()}</p>
              ))}</div>
            </div>
          </div>
          
          {props.currentGuesser ? currentDescriberScreen : viewerOrGuesserScreen}
        </>
      );      

    const gameScreen = 
    <>
        {props.isDescriber ? <Describer words={props.words} finishRound={props.finishRound} guessText={props.guessText} multipleGuessText={props.multipleGuessText} correctGuesses={props.correctGuesses} closeGuesses={props.closeGuesses} />: <></>}
        {props.isGuesser ? <Guesser handleGuessChange={props.handleGuessChange} correctGuesses={props.correctGuesses} closeGuesses={props.closeGuesses} />: <></>}
        {props.isViewer ? <Viewer words={props.words} guessText={props.guessText} multipleGuessText={props.multipleGuessText} correctGuesses={props.correctGuesses} closeGuesses={props.closeGuesses} />: <></>}
    </>


    return (
      <>
        {props.gameOver ? (
          <GameOverScreen winner={props.winner} score={props.score} />
        ) : (
          <>
            {roleGiven ? <></> : beforeRound}
            {props.showScoreScreen ? showScoreScreen : gameScreen}
          </>
        )}
      </>
    );
}

// const buildGuessingTeamString = (team) => {
//     return team.map((player) => {
//         return player.name
//     }).join(', ')
// }

const validateTeam = (team) => {
    return (team.length >= 2)
}

const correctWordStyle = {
    color: 'green'
}

const inCorrectWordStyle = {
    color: 'red',
    "font-style": "bold"
}

const getTeamString = (team) => {
    return team.map((member) => {
        return member.name
    }).join(", ");
}

const getUsersString = (users) => {
    return Object.keys(users).map((user) => {
        return users[user]
    }).join(", ");
};