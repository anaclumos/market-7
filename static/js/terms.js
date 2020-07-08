const terms = document.querySelector(".terms");
const allTermsCheck = terms.querySelector(".term__all input");
const mendatoryTermsCheck = terms.querySelector(".term__mendatory input");
const optionalTermsChecks = terms.querySelectorAll(".term__optional input");

const termsCheckboxHandler = function(e) {
  if (!["INPUT", "SPAN"].includes(e.target.tagName)) return;
  const selectedTerm = e.target.parentElement;
  const selectedCheckbox = selectedTerm.querySelector("input");
  const updatedStatus = !selectedCheckbox.checked;
  if (e.target.tagName === "SPAN") {
    selectedCheckbox.checked = updatedStatus;
  }
  if (Array.from(selectedTerm.classList).includes("term__all")) {
    mendatoryTermsCheck.checked = updatedStatus;
    optionalTermsChecks.forEach(check => check.checked = updatedStatus);
  } else {
    if (updatedStatus) {
      if (mendatoryTermsCheck.checked && Array.from(optionalTermsChecks).every(check => check.checked)) {
        // 체크가 된 경우에는 다른 나머지 버튼들이 모두 체크돼어있는지 확인하고 그런 경우에는 전체 동의 체크
        allTermsCheck.checked = updatedStatus;
      }
    } else {
      // 체크가 해제된 경우에는 전체 동의 체크 해제
      allTermsCheck.checked = updatedStatus;
    }
  }
}

terms.addEventListener("click", termsCheckboxHandler);