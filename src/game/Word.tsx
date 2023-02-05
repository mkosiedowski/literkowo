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
const Word = ({word, length, correctWord}: Props) => {
    const countLetterInCorrectWord = (letter: string) => correctWord?.split('').filter(l => l === letter).length || 0;
    const correctLettersMap = word
        .split('')
        .reduce((acc: Omit<WordMap, 'misplaced'>[], letter, index) => [
            ...acc,
            {
                letter,
                correct: correctWord?.charAt(index) === letter,
            }
        ], []);
    const wordMap = correctLettersMap.reduce((acc: WordMap[], cur) => [
        ...acc,
        {
            ...cur,
            misplaced: !!correctWord
                && correctWord.includes(cur.letter)
                && correctLettersMap.filter(l => l.letter === cur.letter && l.correct).length
                + acc.filter(l => l.letter === cur.letter && l.misplaced).length
                < countLetterInCorrectWord(cur.letter),
        }
    ], []);

    const correctClass = (index: number) => wordMap[index]?.correct ? 'correct' : '';
    const misplacedClass = (index: number) => (!wordMap[index]?.correct && wordMap[index]?.misplaced) ? 'misplaced' : '';

    return (
        <div className="wordRow">
            {[...Array(length).keys()].map((_, index) => (
                <div key={index} className={`wordChar ${correctClass(index)} ${misplacedClass(index)}`}>
                    {wordMap[index]?.letter || ''}
                </div>
            ))}
        </div>
    );
};

export default Word;