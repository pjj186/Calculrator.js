const result = document.querySelector(".js-result");
const reset = document.querySelector(".js-reset");
const equals = document.querySelector(".js-equals");

const numbers = Array.from(document.querySelectorAll(".js-number"));
const operations = Array.from(document.querySelectorAll(".js-operation"));

let firstValue = "", // 첫번째 입력 (string)
    firstDone,  // 첫번째 입력을 했는지 체크 (boolean)
    secondValue = "", // 두번째 입력 (string)
    secondDone, // 두번째 입력을 했는지 체크 (boolean)
    currentOperation; // 현재 클릭한 연산자가 무엇인지? (string)

function doOperation() {
    // 연산 함수, 연산의 결과를 반환한다.
    const intValueA = parseInt(firstValue, 10); // 뒤에 오는 10은 진수를 나타낸다. 이 경우 10진수로 표현하겠다 의미
    const intValueB = parseInt(secondValue, 10); 
    switch (currentOperation) {
        case "+":
            return intValueA + intValueB;
        case "-":
            return intValueA - intValueB;
        case "/":
            return intValueA / intValueB;
        case "*":
            return intValueA * intvalueB;
        default:
            return;
    }
}

function handleNumberClick(e) {
    // 숫자를 클릭했을 때 호출되는 함수
    //
    const clickedNum = e.target.innerText;
    if(!firstDone) { // 첫번째 입력을 받는다.
        firstValue = firstValue + clickedNum; // firstValue는 빈 문자열이다. 숫자를 클릭할때마다 추가해준다.
        result.innerHTML = firstValue; // 디스플레이에 입력한 숫자를 표기.
    } else { // 첫번째 입력을 마치고 (연산자를 누른 이후에 숫자 클릭)
        secondValue = secondValue + clickedNum; // 클릭한 숫자를 secondValue에 저장!
        result.innerHTML = secondValue; // 디스플레이에 입력한 숫자를 표기한다.
        secondDone = true; // 두번째 입력 마침.
    }
}

function calculate(){
    const operation = doOperation(); // operation 변수에는 doOperation() 함수를 통해 얻은 결과값이 저장된다.
    result.innerHTML = operation; // 디스플레리에 결과 표시
    firstValue = operation; // 첫번째 값에 결과값을 저장. (연속적인 계산을 위해)
    secondDone = false; // 두번째 입력 초기화
    secondValue = ""; // 두번째 입력 초기화
}

function handleOperationClick(e) { 
    // 연산자를 클릭했을때 호출되는 함수
    const clickedOperation = e.target.innerText;
    if(!firstDone) {
        firstDone = true;
    }
    if(firstDone && secondDone) { // 연산자를 클릭했을때, 첫번째 값, 두번째 값이 이미 입력되있다면?
        calculate(); // 계산함수를 한번 더 실행함
    }
    currentOperation = clickedOperation;
}

function handleReset(){
    // Clear 함수
    firstValue = "";
    secondValue = "";
    firstDone = false;
    secondDone = false;
    currentOperation = null;
    result.innerHTML = "0";
}

function handleEqualsClick(){
    if (firstDone && secondDone) { // 첫번쨰 입력, 두번째 입력 둘다 참이라면,
        calculate(); // 계산함수 실행
    }
}

numbers.forEach(function (number) { // numbers 배열에 저장된 각각에 값에 대해 이벤트 리스너 등록
    number.addEventListener("click", handleNumberClick);
});

operations.forEach(function (operation) {
    operation.addEventListener("click", handleOperationClick);
});
reset.addEventListener("click", handleReset);
equals.addEventListener("click", handleEqualsClick);