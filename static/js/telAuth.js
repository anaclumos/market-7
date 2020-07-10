import { isMandatoryArgsValid } from "./isInputsValid.js";
export let authNumber;

(function() {
  const telAuthContainer = document.querySelector(".tel-auth");
  const telAuthReqContainer = telAuthContainer.querySelector(".tel-auth__req");
  const telAuthReqBtn = telAuthReqContainer.querySelector("button");
  const telInput = telAuthReqContainer.querySelector("input");
  const telAuthResContainer = telAuthContainer.querySelector(".tel-auth__res");
  
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
      if (limitInSec === 0) {
        clearInterval(timer);
        console.log("입력시간을 초과하였습니다");
        return;
      }
      if (isMandatoryArgsValid.telAuth) {
        clearInterval(timer);
        showTimeLimit("");
      }
    }, 1000);
    
  }

  const createAuthTimer = function() {
    const timeLimit = document.createElement("span");
    timeLimit.innerText = "2:00";
    timeLimit.classList.add("tel-auth__res-limit");
    telAuthContainer.appendChild(timeLimit);
  }

  const showTelAuthResContainer = function() {
    const telAuthResInput = document.createElement("input");
    telAuthResInput.type = "text";
    telAuthResInput.placeholder = "인증번호를 입력하세요.";
    const telAuthResBtn = document.createElement("button");
    telAuthResBtn.classList.add("unfilled");
    telAuthResBtn.innerText = "확인";
    telAuthResBtn.name = "telAuth";
    telAuthResContainer.appendChild(telAuthResInput);
    telAuthResContainer.appendChild(telAuthResBtn);
  }

  const convertInnerText = function() {
    telAuthReqBtn.innerText = "재전송";
  }

  const getAuthNumber = function() {
    authNumber = String(parseInt(Math.random() * 1000000));
    const length = authNumber.length
    if (length < 6) {
      authNumber = '0'.repeat(6 - length) + authNumber;
    }
    alert(`인증번호 ${authNumber} 를 입력해주세요.`)
  };

  const handleReqBtnClick = function(e) {
    if (e.target.innerText !== "재전송") {
      convertInnerText();
      showTelAuthResContainer();
      createAuthTimer();
    }
    setAuthTimer();
    getAuthNumber()
  }

  const toggleTelAuthReqBtn = function(e) {
    const telAuthReqBtn = telInput.nextSibling;
    const inputLength = e.target.value.length;
    if (inputLength === 11) {
      telAuthReqBtn.removeAttribute("disabled");
      telAuthReqBtn.classList.remove("deactive");
      telAuthReqBtn.classList.add("unfilled");
    } else {
      telAuthReqBtn.setAttribute("disabled", "");
      telAuthReqBtn.classList.remove("unfilled");
      telAuthReqBtn.classList.add("deactive");
    }
  }

  telInput.addEventListener("input", toggleTelAuthReqBtn);
  telAuthReqBtn.addEventListener("click", handleReqBtnClick);
})();

