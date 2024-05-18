import CountDown2 from './CountDown2';
import './guesser.css';
import { ShowCorrectGuesses } from './Utility';
export default function Guesser(props) {
    return (
        <div className="Guesser">
            <CountDown2 />
            <h1>Your team's turn!</h1>
            <p>Type your guesses in the textbox below</p>
            <p>Remember to separate words using commas</p>
            <div className='guesses-container-guesser'>
            <h3>Guesses :</h3>
            {props.closeGuesses.length ? <div className='close-list'>{ShowCorrectGuesses(props.closeGuesses)}</div> : <></>}
            <br/>
            {props.correctGuesses.length ? <div className='correct-list'>{ShowCorrectGuesses(props.correctGuesses)}</div> : <></>}
            <br/>
            </div>
            <input style={inputStyle} type="text" onChange={props.handleGuessChange} placeholder="Enter Guess" />
        </div>
    );
}



const inputStyle = {
    "border-radius": '15px',
    height: '40px',
    width: '300px',
    "margin-top": '25px'
}