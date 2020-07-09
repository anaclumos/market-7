const telAuthContainer = document.querySelector(".tel-auth");
const telAuthReqContainer = telAuthContainer.querySelector(".tel-auth__req");
const telAuthReqBtn = telAuthReqContainer.querySelector("button");
// const telAuthResBtn = telAuthResContainer.querySelector("button");

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

const handleReqBtnClick = function() {
  convertInnerText();
  showTelAuthResContainer();
}

telAuthReqBtn.addEventListener("click", handleReqBtnClick);
