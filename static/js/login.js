(function(){
  const loginForm = document.querySelector("form");
  const submitBtn = document.querySelector("button");

  const preventSubmission = function(e) {
    const isEnterPressed = (e.type === "keydown" && e.key === "Enter");
    const isNonSubmitBtnClicked = (e.type === "click" && e.target.tagName === "BUTTON");
    if (isEnterPressed || isNonSubmitBtnClicked) {
      e.preventDefault();
    }
  }

  const handleSubmitBtnClick = function() {
    const username = document.querySelector(".id").value;
    const password = document.querySelector(".pw").value;

    if (username && password) {
      const loginInfo = {
        username, password
      }
      fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        if (res.status === 200) {
          location.href = "/";
        } else {
          alert("입력하신 정보가 올바르지 않습니다.");
        }
      }).catch()
    } else {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
    }
  }

  loginForm.addEventListener("keydown", preventSubmission);
  loginForm.addEventListener("click", preventSubmission);
  submitBtn.addEventListener("click", handleSubmitBtnClick);
})();
