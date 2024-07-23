export const initialState = {
    slide: 0,
    container: document.querySelector('.wrapper'),
    blockContainer: [],
    quizTest: [],
    quizLength: 0,
    correctAnswer: ["Tomato", "Isn't", "Are", "These", "Pineapple", "Does", "Swim", "The best", "For", "From"],
    ratings: [],
};

export const setState = (state, newState) => ({
    ...state,
    ...newState
});