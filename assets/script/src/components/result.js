import { calculateMarks } from '../../utils/calculateMarks.js';
import { getResult } from '../../utils/getResult.js';

export const renderResult = (state, blockContainer) => {
    const marks = calculateMarks(blockContainer, state.correctAnswer);
    const result = getResult(marks, state.quizLength, state.ratings);

    const resultHTML = `
        <section class="tests tests_results">
            <div class="tests__inner _container">
                <div class="tests__wrap">
                    <div class="tests__body">
                        <div class="tests__heading">
                            <h2 class="tests__title">Тест на уровень английского</h2>
                            <div class="tests__count count">
                                <span class="count__text">вопрос</span>
                                <div class="count__current">${blockContainer.length}</div>
                                <div class="count__total">/${state.quizLength}</div>
                            </div>
                        </div>
                        <div class="tests__content">
                            <span class="tests__subtitle">Вы ответили правильно на</span>
                            <span class="tests__results"> <b class="tests__correct">${marks}</b> вопроса из <b class="tests__total">${state.quizLength}</b></span>
                            <span class="tests__verdict verdict">Ваш результат - <b class="verdict__color">${result.rating}</b></span>
                            <div class="tests__about about">
                                <p class="about__text">${result.text}</p>
                            </div>
                            <button class="tests__button button">Начать обучение</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>`;

    const fragment = document.createRange().createContextualFragment(resultHTML);
    state.container.innerHTML = '';
    state.container.appendChild(fragment);
};