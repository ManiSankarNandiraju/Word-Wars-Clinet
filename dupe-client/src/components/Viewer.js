import CountDown from './CountDown';
import './WordListCard.css';
import './viewer.css';
import { ShowCorrectGuesses, ShowMultipleGuessText } from './Utility';
export default function Viewer(props) {
    return (
        <div className="Viewer">
            <CountDown />
            <h1>Other team's turn</h1>
            <h2>Sit back and watch how the other team is doing</h2>
            <div className='words-container-viewer'>
            <h3>Describe the Words :</h3>
            <div className='card'>
                <ul className='word-list'>
                    {props.words.map((word, i) => {
                        return <li key={i}>{word}</li>
                    })}
                </ul>
            </div>
            </div>
            <div className='guesses-container-viewer'>
            <h3>Guesses :</h3>
            {props.multipleGuessText ? ShowMultipleGuessText(props.multipleGuessText) : <></>}
            <br/>
            {props.closeGuesses.length ? <div className='close-list'>{ShowCorrectGuesses(props.closeGuesses)}</div> : <></>}
            <br/>
            {props.correctGuesses.length ? <div className='correct-list'>{ShowCorrectGuesses(props.correctGuesses)}</div> : <></>}
            <br/>
        </div>
        </div>
    );
}

const correctGuessStyle = {
    color: 'green'
}