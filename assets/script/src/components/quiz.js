import { renderResult } from './result.js';

export const renderQuiz = (state) => {
    const { container, slide, quizTest, quizLength } = state;
    const { answers, question, content } = quizTest[slide];
    
    const generateAnswersList = (answers) => {
        return answers.map(ans => `<li class="answers-test__item" data-value="${ans}">${ans}</li>`).join('');
    };
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
                            <ul id="answers-test__list" style="user-select: none">
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
    addEventListenerToAnswers(state);
};

const addEventListenerToAnswers = (state) => {
    const saveAnswer = document.getElementById('answers-test__list');

    saveAnswer.replaceWith(saveAnswer.cloneNode(true));
    const newSaveAnswer = document.getElementById('answers-test__list');

    // Using event delegation
    newSaveAnswer.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('answers-test__item')) {
            handleAnswerSelection(e.target.dataset.value, state);
        }
    });
};

const handleAnswerSelection = (answer, state) => {
    const newBlockContainer = [...state.blockContainer, answer];
    
    if (newBlockContainer.length === state.quizLength) {
        renderResult(state, newBlockContainer);
    } else {
        renderQuiz({
            ...state,
            slide: state.slide + 1,
            blockContainer: newBlockContainer,
        });
    }
};