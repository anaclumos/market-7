import { isMandatoryArgsValid } from "./isInputsValid.js"

(function(){
  
  const registerForm = document.querySelector("form");
  const submitBtn = registerForm.querySelector("#submit-btn");

  const preventSubmission = function(e) {
    const isEnterPressed = (e.type === "keydown" && e.key === "Enter");
    const isNonSubmitBtnClicked = (e.type === "click" && e.target.tagName === "BUTTON");
    if (isEnterPressed || isNonSubmitBtnClicked) {
      e.preventDefault();
    }
  }

  const handleSubmitBtnClick = function() {
    const isSubmittable = Object.values(isMandatoryArgsValid).every(elem => elem);
    if (isSubmittable) {
      console.log("send POST request")
    }
  }

  registerForm.addEventListener("keydown", preventSubmission);
  registerForm.addEventListener("click", preventSubmission);
  submitBtn.addEventListener("click", handleSubmitBtnClick);
})();
