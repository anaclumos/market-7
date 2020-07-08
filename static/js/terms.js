const terms = document.querySelector(".terms");
const allTermsCheck = terms.querySelector(".term__all input");
const mendatoryTermsCheck = terms.querySelector(".term__mendatory input");
const optionalTermsChecks = terms.querySelectorAll(".term__optional input");

const toggleAllCheckBoxes = function(e) {
  const isChecked = e.target.checked;
  if (isChecked) {
    allTermsCheck.setAttribute("checked", "");
    mendatoryTermsCheck.setAttribute("checked", "");
    optionalTermsChecks.forEach(checkBox => checkBox.setAttribute("checked", ""));
  } else {
    allTermsCheck.removeAttribute("checked");
    mendatoryTermsCheck.removeAttribute("checked");
    optionalTermsChecks.forEach(checkBox => checkBox.removeAttribute("checked"));
  }
}

allTermsCheck.addEventListener("click", toggleAllCheckBoxes);
