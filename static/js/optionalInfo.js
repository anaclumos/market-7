(function() {
  const optionalWrapper = document.querySelector(".optional");
  const optionalCheckWrapper = optionalWrapper.querySelector(".optional__check");
  const addressInfoWrapper = optionalWrapper.querySelector(".optional__address");

  const activateInput = function() {
    addressInfoWrapper.querySelectorAll("*").
      forEach(elem => {
        if (["INPUT", "BUTTON"].includes(elem.tagName)) {
          elem.removeAttribute("disabled");
          if (elem.tagName === "BUTTON") {
            elem.classList.remove("deactive");
            elem.classList.add("unfilled");
          }
        }
      })
  }

  const deactivateInput = function() {
    addressInfoWrapper.querySelectorAll("*").
      forEach(elem => {
        if (["INPUT", "BUTTON"].includes(elem.tagName)) {
          elem.setAttribute("disabled", "");
          if (elem.tagName === "BUTTON") {
            elem.classList.remove("unfilled");
            elem.classList.add("deactive");
          }
        }
      })
  }

  const checkboxHandler = function(e) {
    const checkbox = optionalCheckWrapper.querySelector("input");
    if (e.target.tagName === "SPAN") {
      checkbox.checked = !checkbox.checked;
    };
    if (checkbox.checked) {
      activateInput();
    } else {
      deactivateInput();
    }
  }

  optionalCheckWrapper.addEventListener("click", checkboxHandler);
})();