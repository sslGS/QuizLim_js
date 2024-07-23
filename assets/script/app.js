import { fetchJSON } from './src/services/fetchService.js';
import { renderQuiz } from './src/components/quiz.js';
import { initialState, setState } from './state/state.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const [quizTest, ratings] = await Promise.all([
            fetchJSON('./assets/data/quizTest.json'),
            fetchJSON('./assets/data/ratings.json')
        ]);

        const state = setState(initialState, {
            quizTest,
            quizLength: quizTest.length,
            ratings
        });

        renderQuiz(state);
    } catch (error) {
        console.error('Error initializing quiz:', error);
    }
});