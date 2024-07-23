import { renderResult } from './result.js';
import { setState } from '../../state/state.js';

const generateAnswersList = (answers) => {
    return answers.map(ans => `<li class="answers-test__item" data-value="${ans}">${ans}</li>`).join('');
};

const addEventListenerToAnswers = (state, handleAnswerSelection) => {
    const saveAnswer = document.getElementById('answers-test__list');
    if (!saveAnswer) return;

    saveAnswer.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('answers-test__item')) {
            handleAnswerSelection(e.target.dataset.value, state);
        }
    });
};

const handleAnswerSelection = (answer, state) => {
    const newBlockContainer = [...state.blockContainer, answer];
    const updatedState = setState(state, { blockContainer: newBlockContainer });

    if (newBlockContainer.length === state.quizLength) {
        renderResult(updatedState);
    } else {
        renderQuiz(setState(updatedState, { slide: state.slide + 1 }));
    }
};

export const renderQuiz = (state) => {
    const { container, slide, quizTest, quizLength } = state;
    const { answers, question, content } = quizTest[slide];

    const answerList = generateAnswersList(answers);

    const quizHTML = `
        <section class="tests tests_dark-blue active-slide">
            <div class="tests__inner _container">
                <div class="tests__wrap">
                    <div class="tests__body">
                        <h2 class="tests__title">Тест на уровень английского</h2>
                        <h3 class="tests__text">${question}</h3>
                        <div class="tests__content content">
                            <span class="content__text">${content}</span>
                        </div>
                        <div class="tests__count count">
                            <span class="count__text">вопрос</span>
                            <span class="count__current">${slide + 1}</span>
                            <span class="count__total">/${quizLength}</span>
                        </div>
                        <div class="tests__answers answers-test">
                            <ul id="answers-test__list">
                                ${answerList}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>`;

    const fragment = document.createRange().createContextualFragment(quizHTML);
    container.innerHTML = '';
    container.appendChild(fragment);
    addEventListenerToAnswers(state, handleAnswerSelection);
};