(function() {
  const terms = document.querySelector(".terms");
  const allTermsCheck = terms.querySelector(".term__all input");
  const mandatoryTermsContainer = terms.querySelectorAll(".term__mandatory");
  const optionalTermsContainer = terms.querySelectorAll(".term__optional");

  const termsCheckboxHandler = function(e) {
    if (e.target.tagName !== "INPUT") return;
    const selectedTerm = e.target.parentElement;
    const selectedCheckbox = selectedTerm.querySelector("input");
    const updatedStatus = selectedCheckbox.checked;
    if (selectedTerm === allTermsCheck.parentElement) {
      mandatoryTermsContainer.forEach(elem => elem.querySelector("input").checked = updatedStatus);
      optionalTermsContainer.forEach(elem => elem.querySelector("input").checked = updatedStatus);
    } else {
      if (updatedStatus) {
        const isAllMandatoryTermsChecked = Array.from(mandatoryTermsContainer).filter(container => container !== e.target.parentElement.parentElement).every(container => container.querySelector("input").checked);
        const isAllOptionalTermsChecked = Array.from(optionalTermsContainer).filter(container => container !== e.target.parentElement.parentElement).every(container => container.querySelector("input").checked);
        if (isAllMandatoryTermsChecked && isAllOptionalTermsChecked) {
          console.log("need to check all terms")
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
})();