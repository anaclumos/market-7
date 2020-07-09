
const registerForm = document.querySelector("form");


const preventSubmission = function(e) {
  const isEnterPressed = (e.type === "keydown" && e.key === "Enter");
  const isBtnClicked = (e.type === "click" && e.target.tagName === "BUTTON");
  if (isEnterPressed || isBtnClicked) {
    e.preventDefault();
  }
}

registerForm.addEventListener("keydown", preventSubmission);
registerForm.addEventListener("click", preventSubmission);