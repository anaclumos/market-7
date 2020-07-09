const registerForm = document.querySelector("form");
const submitBtn = document.querySelector("form > button");
const btns = registerForm.querySelectorAll("button");


const preventSubmission = function(e) {
  const isEnterPressed = (e.type === "keydown" && e.key === "Enter");
  const isNonSubmitBtnClicked = (e.type === "click" && e.target.tagName === "BUTTON" && e.target.id !== "submit-btn");
  if (isEnterPressed || isNonSubmitBtnClicked) {
    e.preventDefault();
  }
}

registerForm.addEventListener("keydown", preventSubmission);
registerForm.addEventListener("click", preventSubmission);