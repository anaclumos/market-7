const telAuthContainer = document.querySelector(".tel-auth");
const telAuthReqContainer = telAuthContainer.querySelector(".tel-auth__req");
const telAuthReqBtn = telAuthReqContainer.querySelector("button");

let timer;

const showTimeLimit = function(timeLimitInString) {
  const timeLimit = document.querySelector(".tel-auth__res-limit");
  timeLimit.innerText = timeLimitInString;
}

const convertTimeLimit = function(seconds) {
  const min = parseInt(seconds / 60);
  const sec = seconds % 60;
  const timeLimitInString = `${min}:${sec > 10 ? sec : `0${sec}`}`
  showTimeLimit(timeLimitInString);
}

const setAuthTimer = function() {
  clearInterval(timer);
  let limitInSec = 120;
  timer = setInterval(() => {
    limitInSec -= 1;
    convertTimeLimit(limitInSec);
  }, 1000);
}

const createAuthTimer = function() {
  const timeLimit = document.createElement("span");
  timeLimit.innerText = "2:00";
  timeLimit.classList.add("tel-auth__res-limit");
  telAuthContainer.appendChild(timeLimit);
}

const showTelAuthResContainer = function() {
  const telAuthResContainer = document.createElement("div");
  const telAuthResInput = document.createElement("input");
  telAuthResInput.type = "text";
  telAuthResInput.placeholder = "인증번호를 입력하세요.";
  const telAuthResBtn = document.createElement("button");
  telAuthResBtn.classList.add("unfilled");
  telAuthResBtn.innerText = "확인";
  telAuthResContainer.appendChild(telAuthResInput);
  telAuthResContainer.appendChild(telAuthResBtn);
  telAuthResContainer.classList.add("row");
  telAuthResContainer.classList.add("tel-auth__res");
  telAuthContainer.appendChild(telAuthResContainer);
}

const convertInnerText = function() {
  telAuthReqBtn.innerText = "재전송";
}

const handleReqBtnClick = function(e) {
  if (e.target.innerText !== "재전송") {
    convertInnerText();
    showTelAuthResContainer();
    createAuthTimer();
  }
  setAuthTimer();
}

telAuthReqBtn.addEventListener("click", handleReqBtnClick);