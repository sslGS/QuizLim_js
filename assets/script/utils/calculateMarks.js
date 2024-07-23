export const calculateMarks = (blockContainer, correctAnswer) => {
    return blockContainer.reduce((count, answer) => correctAnswer.includes(answer) ? ++count : count, 0);
};