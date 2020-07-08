const nameInput = document.querySelector(".name > input");

const validateName = function(e) {
  const name = e.target.value;
  // 한글 핸들링
  const re = /[^a-zA-Z]/;
  const comment = document.createElement("span");
  if (re.test(name)){
    comment.innerText = msg.name.failure;
    comment.style.color = msg.color.failure;
    e.target.style.borderColor = msg.color.failure;
    e.target.after(comment)   
  }
}


nameInput.addEventListener("focusout", validateName);