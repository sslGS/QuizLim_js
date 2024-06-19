//04.09.2021
(function () {
    const container = document.getElementsByClassName('wrapper')[0];

    //answers and content
    const quizTest = [
        {
            "question": "Какой овощ упоминается на видео?", //title question
            "answers": ["Tomato", "Beet", "Carrot", "Cucumber"], //answers for question
            "correctAnswer": "Tomato", //correct answer for question
            "content": `<video class="content__video lazy" src="./assets/videos/video34.mp4" controls></video>` //content who visible
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["Doesn't", "Isn't", "Don’t", "Do not"],
            "correctAnswer": "Isn't",
            "content": "Tom … at home now"
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["Are", "Do", "Can", "Is"],
            "correctAnswer": "Are",
            "content": "These apples ... sweet"
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["This", "These", "That", "Those"],
            "correctAnswer": "These",
            "content": "Kerry can see … parrots"
        },
        {
            "question": "Что изображено на картинке?",
            "answers": ["Apple", "Pine", "Pineapple", "Pear"],
            "correctAnswer": "Pineapple",
            "content": `<img src="./assets/images/tests/image.png" alt="tests__image" class="tests__image">`
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["Is", "Does", "Do", "Did"],
            "correctAnswer": "Does",
            "content": "... Tom play soccer or tennis?"
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["Swimming", "Swim", "Swims", "To swim"],
            "correctAnswer": "Swim",
            "content": "Jerry can … well"
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["better", "Good", "The best", "Nice"],
            "correctAnswer": "The best",
            "content": "Which is … park in London?"
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["At", "For", "In", "To"],
            "correctAnswer": "For",
            "content": "Good pupils are never late … school"
        },
        {
            "question": "Вставьте пропущенное слово",
            "answers": ["From", "Of", "To", "At"],
            "correctAnswer": "From",
            "content": "The cinema is not far … our house"
        },
    ];

    const optionsForResult = [
        {
            "rating": "удовлетворительно", //marks for result
            "text": "Начинайте учить английский с онлайн самоучителем Lim English по уникальной методике Олега Лиманского. Результат не заставит себя ждать!" //recommendation for result
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
        },
    ];

    //function made answer and content on web page
    function quizBuild() {
        const output = []; //what be build on web page

        //cycle for <li> element answer
        quizTest.forEach((current, number) => {
            const answers = [];
            for (let i in current.answers) {

                answers.push(`<li class="answers-test__item" value="${current.answers[i]}">${current.answers[i]}</li>`);
                
            }
            //blocks visible
            output.push(
                `<section class="tests tests_dark-blue">
                    <div class="tests__inner _container">
                        <div class="tests__wrap">
                            <div class="tests__body">
                                <h2 class="tests__title">Тест на уровень английского</h2>
                                <h3 class="tests__text">${current.question}</h3>
                                <div class="tests__content content">
                                    <span class="content__text">${current.content}</span>
                                </div>
                                <div class="tests__count count">
                                    <span class="count__text">вопрос</span>
                                    <span class="count__current">${number + 1}</span>
                                    <span class="count__total">/${quizTest.length}</span>
                                </div>
                                <div class="tests__answers answers-test">
                                    <ul class="answers-test__list">
                                        ${answers.join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>`
            );
        });

        container.innerHTML = output.join('');

    };

    quizBuild();

    //function for mathematical evaluation and verdict
    function quizResult() {
        const output = [];
        let marks = 0;
        for (let i = 0; i < quizTest.length; i++) {
            if (blockContainer.includes(quizTest[i].correctAnswer)) {
                marks++
            }
        }
        if (blockContainer.length <= quizTest.length) {
            //options for result of marks
            switch (true) {
                case marks >= Math.floor(quizTest.length * 0.3) && marks <= Math.floor(quizTest.length * 0.5):
                    result = {
                        "rating": optionsForResult[0].rating,
                        "text": optionsForResult[0].text
                    }
                    break;
                case marks >= Math.floor(quizTest.length * 0.6) && marks <= Math.floor(quizTest.length * 0.8):
                    result = {
                        "rating": optionsForResult[1].rating,
                        "text": optionsForResult[1].text
                    }
                    break;
                case marks >= Math.floor(quizTest.length * 0.9) && marks <= Math.floor(quizTest.length * 1):
                    result = {
                        "rating": optionsForResult[2].rating,
                        "text": optionsForResult[2].text
                    }
                    break;
                default:
                    result = {
                        "rating": optionsForResult[3].rating,
                        "text": optionsForResult[3].text
                    }
                    break;
            }
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
                                    <div class="count__total">/${quizTest.length}</div>
                                </div>
                            </div>
                            <div class="tests__content">
                                <span class="tests__subtitle">Вы ответили правильно на</span>
                                <span class="tests__results"> <b class="tests__correct">${marks}</b> вопроса из <b
                                        class="tests__total">${quizTest.length}</b></span>
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
            );
            container.innerHTML = output.join('')
        }
    };

    //slide question
    let slides = document.querySelectorAll('.tests_dark-blue');

    let currentSlide = 0;

    function nextQuest(number) {
        slides[currentSlide].classList.remove('active-slide');
        slides[number].classList.add('active-slide');
        currentSlide = number;
    }
    

    //engine check answer
    let blockContainer = [];

    const saveAnswer = document.getElementsByClassName('answers-test__item');

    //cycle for all <li> element
    for (let i = 0; i < saveAnswer.length; i++) {

        saveAnswer[i].addEventListener('click', function () {
            if (!blockContainer.includes(saveAnswer[i].getAttribute('value'))) {
                blockContainer.push(saveAnswer[i].getAttribute('value'));
                if (blockContainer.length <= quizTest.length - 1) nextQuest(currentSlide + 1); //check for amount slide block
                else quizResult() //start function quizResult for result test
            }
        });
    }

    nextQuest(currentSlide); // start slide

})();