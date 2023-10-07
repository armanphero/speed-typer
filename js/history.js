const historyContainer = document.getElementById('history-container');
const setDataInLocalStorage = () => {
    const testResult = createObj();
    const history = getDataFromLocalStorage();
    history.unshift(testResult);
    if(history.length > 6){
        history.pop();
    }
    displayHistory(history);
    const historyString = JSON.stringify(history);
    localStorage.setItem('history', historyString);
}

const displayHistory = (histories) => {
    historyContainer.innerText = '';
    histories.forEach(history => {
        const {questionText, mistake, timeTaken, date} = history;
        historyContainer.innerHTML += `
        <div class="p-4 rounded-1 d-flex flex-column justify-content-center" style="background-color: #252525;">
            <h4 class="fs-5 fw-bolder" id="question-in-history">${questionText}</h4>
            <p class="mb-1">You took: <span class="fw-bold">${timeTaken}</span> seconds</p>
            <p class="m-0">You made <span class="text-danger fw-bold">${mistake}</span> mistakes</p>
            <div id="date-div">
                <i class="fa-regular fa-calendar me-2"></i> <span>${date}</span>
            </div>
        </div>
        `;
    })
}

const createObj = () => {
    const date = new Date().toString();
    const dateOfTest = date.slice(4, 24);
    const testResult = {
        questionText: questionDiv.innerText,
        mistake: mistakeCount,
        timeTaken: timer,
        date: dateOfTest
    };
    return testResult;
}
const getDataFromLocalStorage = () => {
    let history = [];
    if (localStorage.getItem('history')) {
        history = localStorage.getItem('history');
        const historyArr = JSON.parse(history);
        return historyArr;
    }
    return history;
}

const showDataOnloadFromLocalStorage = () => {
    const history = getDataFromLocalStorage();
    displayHistory(history);
}