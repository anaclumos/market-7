export const validationConfig = {
  id: {
    validator(value) {
      const re = /[^-_0-9a-z]/;
      return (value.length >= 4 && value.length <= 20 && !re.test(value));
    },
    msg: {
      success: "입력하신 아이디로 사용이 가능합니다.",
      failure: "아이디는 4~20자의 영어 소문자, 숫자, 특수기호(-, _)만 사용이 가능합니다.",
    }
  },
  pw: {
    validator(value) {
      console.log(value)
      const reEng = /[a-zA-Z]/;
      const reNum = /[0-9]/;
      const reProhibited = /[^a-zA-Z0-9]/;
      return (value.length >= 8 && value.length <= 20 && reEng.test(value) && reNum.test(value) && !reProhibited.test(value));
    },
    msg: {
      success: "",
      failure: "비밀번호는 영문과 숫자를 포함하여 8~20자로 입력해 주세요.",
    }
  },
  pw2: {
    validator(value, original) {
      return (value === original)
    },
    msg: {
      success: "",
      failure: "위 비밀번호와 일치하지 않습니다. 다시 입력해 주세요.",
    }
  },
  email: {
    validator() {

    },
    msg: {

    }
  },
  name: {
    validator(value) {
      console.log(value);
      const re = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]/;
      return !re.test(value);
    },
    msg: {
      success: "",
      failure: "이름에 특수문자, 숫자를 사용할 수 없습니다. 다시 입력해 주세요.",
    }
  },
  tel: {
    validator(value) {
      const re = /[^0-9]/;
      return (value.length === 11 && !re.test(value));
    },
    msg: {
      success: "",
      failure: "전화번호는 11자리로, 숫자만 입력할 수 있습니다. 0123456789 형식으로 다시 입력해 주세요.",
    }
  },
  color: {
    success: "grey",
    failure: "red",
  },
  status: {
    SUCCESS: "success",
    FAILURE: "failure"
  },
  handler(e, status) {
    const innerText = this[e.target.name]["msg"][status];
    const color = this.color[status];
    let infoMsgContainer = e.target.nextSibling;
    if (infoMsgContainer.tagName !== "SPAN") {
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
}