//19.06.2024
(() => {
    var container = document.getElementsByClassName('wrapper')[0];
    var currentSlide = 0;
    var blockContainer = [];
    //answers and content
    var quizTest = JSON.parse(`[
        {
            "question": "Какой овощ упоминается на видео?",
            "answers": ["Tomato", "Beet", "Carrot", "Cucumber"],
            "content": "<video class='content__video lazy' src='./assets/videos/video34.mp4' controls></video>"
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["Doesn't", "Isn't", "Don’t", "Do not"],
            "content": "Tom … at home now"
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["Are", "Do", "Can", "Is"],
            "content": "These apples ... sweet"
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["This", "These", "That", "Those"],
            "content": "Kerry can see … parrots"
        },
        {
            "question": "Что изображено на картинке?",
            "answers": ["Apple", "Pine", "Pineapple", "Pear"],
            "content": "<img src='./assets/images/tests/image.png' alt='tests__image' class='tests__image'>"
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["Is", "Does", "Do", "Did"],
            "content": "... Tom play soccer or tennis?"
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["Swimming", "Swim", "Swims", "To swim"],
            "content": "Jerry can … well"
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["better", "Good", "The best", "Nice"],
            "content": "Which is … park in London?"
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["At", "For", "In", "To"],
            "content": "Good pupils are never late … school"
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["From", "Of", "To", "At"],
            "content": "The cinema is not far … our house"
        }
    ]`);
    var quizLength = quizTest.length;
    
    var optionsForResult = JSON.parse(`[
        {
            "rating": "удовлетворительно",
            "text": "Начинайте учить английский с онлайн самоучителем Lim English по уникальной методике Олега Лиманского. Результат не заставит себя ждать!"
        },
        {
            "rating": "хорошо",
            "text": "У Вас неплохие результаты! Продолжайте заниматься с онлайн самоучителем Lim English чтобы выйти на новый уровень."
        },
        {
            "rating": "отлично",
            "text": "Ваш английский на очень высоком уровне. Чтобы его поддерживать, не забывайте практиковаться в английском с онлайн самоучителем Lim English. Выбирайте курс “Intermediate”."
        },
        {
            "rating": "плохо",
            "text": "Вам нужно начать учить английский с онлайн самоучителем Lim English с нуля. Выбирайте курс “Beginner”."
        }
        ]`);
    var correctAnswer = ["Tomato", "Isn't", "Are", "These", "Pineapple", "Does", "Swim", "The best", "For", "From"];

    var eventListener = ((currentSlide) => {
        var saveAnswer = document.getElementById('answers-test__list');
        saveAnswer.addEventListener('click', (e) => {
            blockContainer.push(e.target.getAttribute('value'));
            if (blockContainer.length == quizTest.length) return quizResult(blockContainer);
            quizBuilder(++currentSlide);
        });
    });

    var quizBuilder = ((current, result, marks) => {
        var output = []; 
        //blocks visible
        if (!result) {
            var answers = [];
            var question = quizTest[current];

            for (var i in question.answers) {
                answers.push(`<li class="answers-test__item" value="${question.answers[i]}">${question.answers[i]}</li>`);
            }

            output.push(
                `<section class="tests tests_dark-blue active-slide">
            <div class="tests__inner _container">
                <div class="tests__wrap">
                    <div class="tests__body">
                        <h2 class="tests__title">Тест на уровень английского</h2>
                        <h3 class="tests__text">${question.question}</h3>
                        <div class="tests__content content">
                            <span class="content__text">${question.content}</span>
                        </div>
                        <div class="tests__count count">
                            <span class="count__text">вопрос</span>
                            <span class="count__current">${current + 1}</span>
                            <span class="count__total">/${quizLength}</span>
                        </div>
                        <div class="tests__answers answers-test">
                            <ul id="answers-test__list" style="user-select: none">
                                ${answers.join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>`)
        }
        else {
            output.push(`
            <section class="tests tests_results">
                <div class="tests__inner _container">
                    <div class="tests__wrap">
                        <div class="tests__body">
                            <div class="tests__heading">
                                <h2 class="tests__title">Тест на уровень английского</h2>
                                <div class="tests__count count">
                                    <span class="count__text">вопрос</span>
                                    <div class="count__current">${blockContainer.length}</div>
                                    <div class="count__total">/${quizLength}</div>
                                </div>
                            </div>
                            <div class="tests__content">
                                <span class="tests__subtitle">Вы ответили правильно на</span>
                                <span class="tests__results"> <b class="tests__correct">${marks}</b> вопроса из <b
                                        class="tests__total">${quizLength}</b></span>
                                <span class="tests__verdict verdict">Ваш результат - <b
                                        class="verdict__color">${result.rating}</b></span>
                                <div class="tests__about about">
                                    <p class="about__text">${result.text}</p>
                                </div>
                                <button class="tests__button button">Начать обучение</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`
            )
        }
        container.innerHTML = output;
        if(!result)eventListener(current);
    });
    quizBuilder(currentSlide);

    //function for mathematical evaluation and verdict
    var quizResult = ((blockContainer) => {
        var marks = 0;
        var result = {};
        for (var key of correctAnswer) { if(blockContainer.includes(key)) ++marks }
        //options for result of marks
        switch (true) {
            case marks >= Math.floor(quizLength * 0.3) && marks <= Math.floor(quizLength * 0.5):
                result = {
                    "rating": optionsForResult[0].rating,
                    "text": optionsForResult[0].text
                };
                break;
            case marks >= Math.floor(quizLength * 0.6) && marks <= Math.floor(quizLength * 0.8):
                result = {
                    "rating": optionsForResult[1].rating,
                    "text": optionsForResult[1].text
                };
                break;
            case marks >= Math.floor(quizLength * 0.9) && marks <= quizLength:
                result = {
                    "rating": optionsForResult[2].rating,
                    "text": optionsForResult[2].text
                };
                break;
            default:
                result = {
                    "rating": optionsForResult[3].rating,
                    "text": optionsForResult[3].text
                };
                break;
        }
        
        return quizBuilder(0, result, marks);
    });
})();