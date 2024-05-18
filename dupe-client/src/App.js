import './App.css';
import { useState, useRef } from 'react';
import { io } from 'socket.io-client';
import Form from './components/Form';
import Screen from './components/Screen';

function App() {
  const [username, setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const [firstUser, setFirstUser] = useState(false);
  const [isDescriber, setDescriber] = useState(false);
  const [isGuesser, setGuesser] = useState(false);
  const [isViewer, setViewer] = useState(false);
  const [round, setRound] = useState(0);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [users, setUsers] = useState({});
  const [words, setWords] = useState([]);
  const [guessText, setGuessText] = useState('');
  const [multipleGuessText, setMultipleGuessText] = useState({});
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [closeGuesses, setCloseGuesses] = useState([]);
  const [showScoreScreen, setShowScoreScreen] = useState(false);
  const [score, setScore] = useState({TEAM1: 0, TEAM2: 0});
  const [currentGuesser, setCurrentGuesser] = useState(false);
  const [currentGuesserName, setCurrentGuesserName] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [markedWordss, setMarkedWords] = useState([]);
  const socketRef = useRef();
  let body;

  const handleChange = (e) => {
    setUsername(e.target.value);
  }

  const joinTeamOne = () => {
    socketRef.current.emit('join team', 1);
    socketRef.current.on('teams updated', ({TEAM1, TEAM2}) => {
      setTeam1(TEAM1);
      setTeam2(TEAM2);
    })
  }

  if(socketRef.current) {
    socketRef.current.on('roles and words', ({usersAndRoles, words}) => {
      const { describer, guessers } = usersAndRoles;
      const {name } = describer;
      if(username === name) {
        setDescriber(true);
        setViewer(false);
        setGuesser(false);
      } else if (checkInArray(guessers, username)) {
        setGuesser(true);
        setDescriber(false);
        setViewer(false);
      } else {
        setViewer(true);
        setGuesser(false);
        setDescriber(false);
      }
      setWords(words);
      setShowScoreScreen(false);
      setGuessText('');
      setMultipleGuessText({});
      setCorrectGuesses([]);
      setCloseGuesses([]);
    });

    socketRef.current.on('guessText', (guessText) => {
      setMultipleGuessText(guessText);
    })

    socketRef.current.on('game scores', ({TEAM1, TEAM2, currentGuesser, round, markedWords}) => {
      setScore({TEAM1, TEAM2});
      setRound(round);
      setShowScoreScreen(true);
      setMarkedWords(markedWords);
      console.log(markedWords);
      setCurrentGuesserName(currentGuesser);
      if(currentGuesser === username) {
        setCurrentGuesser(true);
      } else {
        setCurrentGuesser(false);
      }
    })

    socketRef.current.on('game over', (winner, {TEAM1, TEAM2}) => {
      setScore({TEAM1, TEAM2});
      setGameOver(true);
      setWinner(winner);
    });

    socketRef.current.on('correct guesses', ([corrects, closes]) => {
      setCorrectGuesses(corrects);
      setCloseGuesses(closes);
    })
  }

  const joinTeamTwo = () => {
    socketRef.current.emit('join team', 2);
    socketRef.current.on('teams updated', ({TEAM1, TEAM2}) => {
      setTeam1(TEAM1);
      setTeam2(TEAM2);
    })
  }

  const connect = () => {
    socketRef.current = io(`http://localhost:1337`, {
      extraHeaders: {
        "ngrok-skip-browser-warning": "69420",
      }
    });
    socketRef.current.emit('join server', username);
    socketRef.current.on('first user', () => {
      setFirstUser(true);
    });
    socketRef.current.on('updated users list', (CLIENT_DATA) => {
      setUsers(CLIENT_DATA);
    });
    setConnected(true);
  }  

  const checkInArray = (arr, username) => {
      for(const element of arr) {
          if(element.name === username) {
              return true;
          }
      }
      return false;
  }

  const handleGuessChange = (e) => {
    setMultipleGuessText((prev) => {
      const newGuessText = prev;
      newGuessText[username] = e.target.value;
      return newGuessText;
    });
    socketRef.current.emit('guess', {multipleGuessText, words})
  }

  const nextRound = () => {
    socketRef.current.emit('new round', round);
  }

  const finishRound = () => {
    setRound(prevRound => {
      const newRound = prevRound + 1
      socketRef.current.emit('start game', {round: newRound, correctGuesses, closeGuesses, words});
      return newRound;
    });
  }

  const startGame = () => {
    socketRef.current.emit('start game', {round, correctGuesses, closeGuesses, words});
  }

  if(connected) {
    body = 
    <Screen 
    users={users} 
    startGame = {startGame} 
    joinTeamOne={joinTeamOne} 
    joinTeamTwo={joinTeamTwo} 
    round={round}
    team1={team1} 
    team2={team2} 
    firstUser={firstUser}
    isDescriber={isDescriber}
    isGuesser={isGuesser}
    isViewer={isViewer}
    words={words}
    finishRound={finishRound}
    nextRound={nextRound}
    guessText={guessText}
    multipleGuessText={multipleGuessText}
    handleGuessChange={handleGuessChange}
    correctGuesses={correctGuesses}
    closeGuesses={closeGuesses}
    showScoreScreen={showScoreScreen}
    score={score}
    currentGuesser={currentGuesser}
    currentGuesserName={currentGuesserName}
    gameOver={gameOver}
    winner={winner}
    markedWords={markedWordss}
    />
  }
   else {
    body = <Form username={username} onChange={handleChange} connect={connect}/>
  }
  return (
    <div className="App">
      {body}
    </div>
  );
}

export default App;
