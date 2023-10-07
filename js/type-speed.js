const modalShadow = document.getElementById('modal');
const answer = document.getElementById('answer-div');
const questionDiv = document.getElementById('question');
const resultDiv = document.getElementById('result-div');
const startBtn = document.getElementById('start-btn');
const timerSpan = document.getElementById('timer');
const reloadIcon = document.getElementById('reload-icon');
let mistakeCount = 0;
let timer = 0;
let text = '';
/* load question */
const loadQuestion = () => {
    fetch('../json/texts.json')
        .then(res => res.json())
        .then(data => {
            const randomIndex = parseInt(Math.random() * data.length);
            showQuestion(data[randomIndex]);
        })
        .catch(error => console.log(error))
}

const reloadQuestion = () => {
    reloadIcon.classList.add('rotation');

    loadQuestion();
    answer.innerText = '';
    setTimeout(() => {
        reloadIcon.classList.remove('rotation');
    }, 300);

}

const showQuestion = (question) => {
    questionDiv.innerText = question;
}
const showCounter = () => {
    let count = 3;
    const counter = document.getElementById('counter');
    counter.classList.remove('d-none');
    modal.classList.remove('d-none');
    const intervalId = setInterval(() => {
        counter.innerText = `${count === -1 ? '' : count}`;
        count--;
        if (count < -1) {
            clearInterval(intervalId);
            counter.classList.add('d-none');
            modal.classList.add('d-none');
            startBtn.setAttribute('disabled', '');
            increaseTimer();
            disabledReloadIcon();
            answer.className = 'green-border';
            mistakeCount = 0;
            document.addEventListener('keypress', addElementInDiv);
        }
    }, 1000);
}

const disabledReloadIcon = () => {
    reloadIcon.removeAttribute('onclick');
    reloadIcon.style.color = 'gray';
}

let timerIntervalId;
const increaseTimer = () => {
    timer = 0;
    const intervalId = setInterval(() => {
        timerIntervalId = intervalId;
        timer++;
        timerSpan.innerText = timer;
    }, 1000);
}

const addElementInDiv = (event) => {
    const keys = `abcdefghijklmnopqrstuvwxyz,.<>/\!1234567890?' `;
    if (keys.includes(event.key.toLowerCase())) {
        // console.log(event.key);
        const span = document.createElement('span');
        // console.log(event.key === ' ');
        if (event.key === ' ') {
            span.innerText = `▪`;
        } else {
            span.innerText = `${event.key}`;
        }
        answer.appendChild(span);
        // 
        const answerLastElementText = answer.children[answer.children.length - 1].innerText;
        const questionText = questionDiv.innerText[answer.children.length - 1];
        if (answerLastElementText === '▪' && questionText === ' ') {
            span.className = 'green';
        }
        else if (answerLastElementText === questionText) {
            span.className = 'green';
        }
        else {
            span.className = 'tomato';
            mistakeCount++;
        }
    }
    checkTextEquality();
}


document.addEventListener('keydown', function (event) {
    if (event.key === 'Backspace') {
        const answerLastElement = answer.children[answer.children.length - 1];
        if (answer.children.length != 0) {
            answer.removeChild(answerLastElement);
            checkTextEquality();
        }
    }
})
// const setCursorPosition 
const checkTextEquality = () => {
    const answerInnerText = answer.innerText;
    const splitedAnswer = answerInnerText.split('\n');
    const arrText = splitedAnswer.map(letter => {
        if (letter === '▪') {
            return ' ';
        } else { return letter }
    })
    const answerText = arrText.join('');
    if (questionDiv.innerText === answerText) {
        resultDiv.classList.remove('d-none');
        modalShadow.classList.remove('d-none');
        document.getElementById('mistake').innerText = mistakeCount;
        clearInterval(timerIntervalId);
        document.getElementById('taken-time').innerText = timer;
        setDataInLocalStorage();
    }
}

const hideModal = () => {
    resultDiv.classList.add('d-none');
    modalShadow.classList.add('d-none');
    timerSpan.innerText = 0;
    answer.innerText = '';
    startBtn.removeAttribute('disabled');
    answer.className = 'white-border';
    document.removeEventListener('keypress', addElementInDiv);
    enableReloadIcon();
}
const enableReloadIcon = () => {
    reloadIcon.setAttribute('onclick', 'reloadQuestion()');
    reloadIcon.style.color = '#fff';
}
loadQuestion();