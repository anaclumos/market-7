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
    }
  }

  submitBtn.addEventListener("click", handleSubmitBtnClick);
})();
