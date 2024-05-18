const ShowCorrectGuesses = (correctGuesses) => {
    return correctGuesses.map((guess) => {
        return guess
    }).join(", ");
}

const ShowMultipleGuessText = (multipleGuessText) => {
    return (
    <>
        {Object.keys(multipleGuessText).map((key, i) => {
            return (
            <>
                <span><b>{key}</b>'s guesses:  {multipleGuessText[key]}</span>
                <br/>
            </>
            )
        })
        }
    </>
    )
}

const nameStyling = {
    "font-style": "bold"
}

export { ShowCorrectGuesses, ShowMultipleGuessText };