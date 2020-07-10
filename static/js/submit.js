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
  const mandatoryArgs = ["id", "pw", "pw2", "emailDomain", "name", "tel", "telAuth"]

  const handleSubmitBtnClick = function() {
    const isSubmittable = Object.values(isMandatoryArgsValid).every(elem => elem);
    if (isSubmittable) {
      const registerInfo = {
        "username": isMandatoryArgsValid.id,
        "passwordHash": isMandatoryArgsValid.pw,
        "passwordSalt": "salt",
        "email": isMandatoryArgsValid.emailDomain,
        "name": isMandatoryArgsValid.name,
        "phone": isMandatoryArgsValid.tel,
        "postalCode": "",
        "postalAddress": "",
        "postalAddressDetails": "",
        "agreedToTermsOfUse": true,
        "isMarketingAllowed": false
      }
      fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify(registerInfo),
        headers: {
          "Content-Type": "application/json"
        }
      })  
    } else {
      alert("필수 입력란을 작성해주세요.")
    }
  }

  registerForm.addEventListener("keydown", preventSubmission);
  registerForm.addEventListener("click", preventSubmission);
  submitBtn.addEventListener("click", handleSubmitBtnClick);
})();
