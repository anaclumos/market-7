const idInput = document.querySelector(".id > input");
const pwInput = document.querySelector(".pw > input");
const pw2Input = document.querySelector(".pw2 > input");
const nameInput = document.querySelector(".name > input");

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
    failure: "",
  },
  color: {
    success: "grey",
    failure: "red",
  }
}

let pw;

const handleMsg = function(e, elem, status) {
  const innerText = msg[elem][status];
  const color = msg.color[status];
  const infoMsgContainer = e.target.nextSibling;
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
}

const handleIdUpperCase = function(e) {
  e.target.value = e.target.value.toLowerCase();
}

const validateId = function(e) {
  const id = e.target.value;
  const re = /[^-_0-9a-z]/;
  if (id.length < 4 || id.length > 20 || re.test(id)) {
    handleMsg(e, "id", "failure");
  } else {
    handleMsg(e, "id", "success");
  }
}

const validatePw = function(e) {
  const pwTemp = e.target.value;
  const reEng = /[a-zA-Z]/;
  const reNum = /[0-9]/;
  if (pwTemp.length >= 8 && pwTemp.length <= 20 && reEng.test(pwTemp) && reNum.test(pwTemp)){
    pw = pwTemp;
    handleMsg(e, "pw", "success");
  } else {
    handleMsg(e, "pw", "failure");
  }
}

const validatePw2 = function(e) {
  const pw2 = e.target.value;
  if (pw2 !== pw) {
    handleMsg(e, "pw2", "failure");
  } else {
    handleMsg(e, "pw2", "success");
  }
}

const  validateName = function(e) {
  const name = e.target.value;
  const re = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]/;
  if (re.test(name)){
    handleMsg(e, "name", "failure");
  } else {
    handleMsg(e, "name", "success");
  }
}

idInput.addEventListener("input", handleIdUpperCase);
idInput.addEventListener("focusout", validateId);
pwInput.addEventListener("focusout", validatePw);
pw2Input.addEventListener("focusout", validatePw2);
nameInput.addEventListener("focusout", validateName);