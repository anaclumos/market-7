(function(){
  
  const submitBtn = document.querySelector("button");

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
      })  
    } else {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
    }
  }

  submitBtn.addEventListener("click", handleSubmitBtnClick);
})();
