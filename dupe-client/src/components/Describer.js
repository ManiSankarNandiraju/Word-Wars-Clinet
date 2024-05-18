import CountDown from './CountDown';
import './WordListCard.css';
import { ShowCorrectGuesses, ShowMultipleGuessText } from './Utility';

export default function Describer(props) {
    return (
        <div className="Describer">
                <CountDown isDescriber="true" childFinishRound={props.finishRound} />
                <h1>GO!</h1>
            <div className='words-container'>
            <h3>Describe the Words :</h3>
            <div className='card'>
                <ul className='word-list'>
                    {props.words.map((word, i) => {
                        return <li key={i}>{word}</li>
                    })}
                </ul>
            </div>
            </div>
            <div className='guesses-container'>
            <h3>Guesses :</h3>
            {props.multipleGuessText ? ShowMultipleGuessText(props.multipleGuessText) : <></>}
            <br/>
            {props.closeGuesses.length ? <div className='close-list'>{ShowCorrectGuesses(props.closeGuesses)}</div> : <></>}
            <br/>
            {props.correctGuesses.length ? <div className='correct-list'>{ShowCorrectGuesses(props.correctGuesses)}</div> : <></>}
            <br/>
            </div>
            <button className='donebutton' onClick={props.finishRound}>
                Done
            </button>
        </div>
    );
}

const wordStyle = {
    color: 'black',

}

const correctGuessStyle = {
    color: 'green'
}



