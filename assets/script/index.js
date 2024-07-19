import { fetchJSON } from './utils/fetchJSON.js';
import { renderQuiz } from './src/components/quiz.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const [quizTest, ratings] = await Promise.all([
            fetchJSON('./assets/data/quizTest.json'),
            fetchJSON('./assets/data/ratings.json')
        ]);

        const state = {
            slide: 0,
            container: document.querySelector('.wrapper'),
            blockContainer: [],
            quizTest,
            quizLength: quizTest.length,
            correctAnswer: ["Tomato", "Isn't", "Are", "These", "Pineapple", "Does", "Swim", "The best", "For", "From"],
            ratings,
        };

        renderQuiz(state);

    } catch (error) {
        console.error('Error initializing quiz:', error);
    }
});