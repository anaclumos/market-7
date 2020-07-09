const idInput = document.querySelector(".id input");
const pwInput = document.querySelector(".pw input");
const pw2Input = document.querySelector(".pw2 input");
const nameInput = document.querySelector(".name input");
const telInput = document.querySelector(".tel-auth .tel-auth__req input");
const emailDomain = document.querySelector(".emailDomainField");
const emailSelect = document.querySelector(".emailDomainSelect");

const msg = {
  id: {
    success: "입력하신 아이디로 사용이 가능합니다.",
    failure: "아이디는 4~20자의 영어 소문자, 숫자, 특수기호(-, _)만 사용이 가능합니다.",
  },
  pw: {
    success: "",
    failure: "비밀번호는 영문과 숫자를 포함하여 8~20자로 입력해 주세요.",
  },
  pw2: {
    success: "",
    failure: "위 비밀번호와 일치하지 않습니다. 다시 입력해 주세요.",
  },
  emailLeft: {
    success: "",
    failure: "이메일 주소를 입력해 주세요.",
  },
  emailRight: {
    success: "",
    failure: "이메일 주소를 입력해 주세요.",
  },
  name: {
    success: "",
    failure: "이름에 특수문자, 숫자를 사용할 수 없습니다. 다시 입력해 주세요.",
  },
  tel: {
    success: "",
    failure: "전화번호는 11자리로, 숫자만 입력할 수 있습니다. 0123456789 형식으로 다시 입력해 주세요.",
  },
  color: {
    success: "grey",
    failure: "red",
  }
}

let pw;

const handleMsg = function (e, elem, status) {
  const innerText = msg[elem][status];
  const color = msg.color[status];
  let infoMsgContainer = e.target.nextSibling;
  if (infoMsgContainer === null || infoMsgContainer.tagName !== "SPAN") {
    infoMsgContainer = e.target.parentElement.nextSibling;
  }
  infoMsgContainer.innerText = innerText;
  e.target.style.borderColor = color;
  infoMsgContainer.classList.remove("hide");
  if (status === "success") {
    infoMsgContainer.classList.remove("invalid-msg");
    infoMsgContainer.classList.add("valid-msg");
  } else if (status === "failure") {
    infoMsgContainer.classList.remove("valid-msg");
    infoMsgContainer.classList.add("invalid-msg");
  }
  if (!innerText) {
    infoMsgContainer.classList.add("hide");
    infoMsgContainer.classList.remove("valid-msg");
    infoMsgContainer.classList.remove("invalid-msg");
  }
}

const handleIdUpperCase = function (e) {
  e.target.value = e.target.value.toLowerCase();
}

const validateId = function (e) {
  const id = e.target.value;
  const re = /[^-_0-9a-z]/;
  if (id.length < 4 || id.length > 20 || re.test(id)) {
    handleMsg(e, "id", "failure");
  } else {
    handleMsg(e, "id", "success");
  }
}

const validatePw = function (e) {
  const pwTemp = e.target.value;
  const reEng = /[a-zA-Z]/;
  const reNum = /[0-9]/;
  if (pwTemp.length >= 8 && pwTemp.length <= 20 && reEng.test(pwTemp) && reNum.test(pwTemp)) {
    pw = pwTemp;
    handleMsg(e, "pw", "success");
  } else {
    handleMsg(e, "pw", "failure");
  }
}

const validatePw2 = function (e) {
  const pw2 = e.target.value;
  if (pw2 !== pw) {
    handleMsg(e, "pw2", "failure");
  } else {
    handleMsg(e, "pw2", "success");
  }
}

const validateName = function (e) {
  const name = e.target.value;
  const re = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]/;
  if (re.test(name)) {
    handleMsg(e, "name", "failure");
  } else {
    handleMsg(e, "name", "success");
  }
}

const toggleTelAuthReqBtn = function (e) {
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

const validateTel = function (e) {
  const tel = e.target.value;
  const re = /[^0-9]/;
  if (tel.length !== 11 || re.test(tel)) {
    handleMsg(e, "tel", "failure");
  } else {
    handleMsg(e, "tel", "success");
  }
}

const validateEmail = function (e) {
  console.log(e);
  const email = e.target.value;
  if (!email) {
    handleMsg(e, "emailRight", "failure");
  } else {
    handleMsg(e, "emailRight", "success");
  }
}

emailSelect.addEventListener("change", () => {
  emailDomain.value = emailSelect.value;
  emailDomain.focus();
});

emailDomain.addEventListener("change", () => {
  emailSelect.selectedIndex = 0;
});

idInput.addEventListener("input", handleIdUpperCase);
idInput.addEventListener("focusout", validateId);
pwInput.addEventListener("focusout", validatePw);
pw2Input.addEventListener("focusout", validatePw2);
nameInput.addEventListener("focusout", validateName);
telInput.addEventListener("focusout", validateTel);
telInput.addEventListener("input", toggleTelAuthReqBtn);
emailDomain.addEventListener("focusout", validateEmail);