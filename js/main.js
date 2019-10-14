let firstNum = document.querySelector("#first-number");
let secondNum = document.querySelector("#second-number");

let addOpt = document.querySelector("#add");
let subOpt = document.querySelector("#subtract");
let mulOpt = document.querySelector("#multiply");
let divideOpt = document.querySelector("#divide");

let calButton = document.querySelector("#cal-btn");

let resultField = document.querySelector("#result-field");

let notifiField = document.querySelector("#notifi-field")

let notifiNum1 = document.createElement("p");
let notifiNum2 = document.createElement("p");
let notifi = document.createElement("p");

const ADD = 1;
const SUB = 2;
const MUL = 3;
const DIV = 4;

function checkNum1() {
  if ((isNaN(firstNum.value) == true || firstNum.value.indexOf("+") >= 0 || firstNum.value.indexOf("-") > 0 || firstNum.value.indexOf("*") >= 0 || firstNum.value.indexOf("/") >= 0) 
      && firstNum.value != "") {
    notifiNum1.innerHTML = "Số thứ nhất không phải là số thực <br><br>";
    notifiField.appendChild(notifiNum1);
  }
}

function checkNum2() {
  if ((isNaN(secondNum.value) == true || secondNum.value.indexOf("+") >=  0 || secondNum.value.indexOf("-") > 0 || secondNum.value.indexOf("*") >= 0 || secondNum.value.indexOf("/") >= 0) 
      && secondNum.value != "") {
    notifiNum2.innerHTML += "Số thứ hai không phải là số thực <br><br>";
    notifiField.appendChild(notifiNum2);
  }
}

function checkOpt() {
  switch (true) {
    case addOpt.checked == true:
      return ADD;
    case subOpt.checked == true:
      return SUB;
    case mulOpt.checked == true:
      return MUL;
    case divideOpt.checked == true:
      return DIV;
    default:
      return 0;
  }
}

function checkCal() {
  let checked = true;
  if (checkOpt() == 0) {
    checked = false;
    notifi.innerHTML += "Chưa chọn phép tính<br><br>";
    notifiField.appendChild(notifi);
  }

  if (firstNum.value == "" || secondNum.value == "") {
    checked = false;
    notifi.innerHTML += "Chưa điền đủ hai số hợp lệ<br><br>";
    notifiField.appendChild(notifi);
  }
  
  return checked;
}

function calculator(num1, num2) {
  let add = () => {
    return num1 + num2;
  }

  let sub = () => {
    return num1 - num2;
  }
  
  let mul = () => {
    return num1 * num2;
  }
  
  let divide = () => {
    return num1 / num2;
  }

  return {
    add,
    sub,
    mul,
    divide
  }
};

let calculating = () => {
  let num1 = parseFloat(firstNum.value);
  let num2 = parseFloat(secondNum.value);
  let count = 1;

  if (checkOpt() == ADD || checkOpt() == SUB) {
    while (num1 % 1 !== 0 || num2 % 1 !== 0) {
      num1 = num1 * 10;
      num2 = num2 * 10;
      count = count * 10;
    }
  } else if (checkOpt() == MUL || checkOpt() == DIV) {
    while (true) {
      if (num1 % 1 !== 0) {
        num1 = num1 * 10;
        count = count * 10;
      } else if (num2 % 1 !== 0) {
        num2 = num2 * 10;
        count = count * 10;        
      } else {
        break;
      }      
    }
  }
  
  let tmp = calculator(num1, num2);
  let result;
  switch (checkOpt()) {
    case ADD:
      result = tmp.add();
      break;
    case SUB:
      result = tmp.sub();
      break;
    case MUL:
      result = tmp.mul();
      break;
    case DIV:
      result = tmp.divide();
      break;
  }
  result = result / count;

  resultField.value = result.toString();
}

firstNum.onblur = () => {
  notifiNum1.innerHTML = "";
  checkNum1();
}

secondNum.onblur = () => {
  notifiNum2.innerHTML = "";
  checkNum2();
}

calButton.onclick = () => {
  notifi.innerHTML = "";
  resultField.value = "";
  if (checkCal() == true) {
    calculating();
  }
}
