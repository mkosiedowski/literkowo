type Props = {
    word: string;
    length: number;
    correctWord?: string;
};

type WordMap = {
    letter: string,
    correct: boolean,
    misplaced: boolean,
}
const Word = ({ word, length, correctWord }: Props) => {
    const countLetterInCorrectWord = (letter: string) => correctWord?.split('').filter(l => l === letter).length || 0;
    const wordPartialMap = word.split('').reduce((acc: Omit<WordMap, 'misplaced'>[], letter, index) => {
        return [
            ...acc,
            {
                letter,
                correct: correctWord?.charAt(index) === letter,
            }
        ]
    }, []);
    const wordMap = wordPartialMap.reduce((acc: WordMap[], cur) => ([
        ...acc,
        {
            ...cur,
            misplaced: !!correctWord
                && correctWord.includes(cur.letter)
                && wordPartialMap.filter(l =>
                    l.letter === cur.letter && l.correct).length
                        + acc.filter(l => l.letter === cur.letter && l.misplaced).length
                    < countLetterInCorrectWord(cur.letter),
        }
    ]), []);

    return (
        <div className="wordRow">
            {[...Array(length).keys()].map((_, index) => (
                <div key={index} className={`wordChar ${wordMap[index]?.correct ? 'correct' : (wordMap[index]?.misplaced ? 'misplaced' : '')}`}>
                    {wordMap[index]?.letter || ''}
                </div>
            ))}
        </div>
    );
};

export default Word;