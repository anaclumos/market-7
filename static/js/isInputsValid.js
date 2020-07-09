import { validationConfig } from "./validator.js"

const mandatoryArgs = ["id", "pw", "pw2", "name", "tel"]
export const isMandatoryArgsValid = mandatoryArgs.reduce((a, b) => (a[b] = false, a), {});

(function() {
  const idInput = document.querySelector(".id input");
  const pwInput = document.querySelector(".pw input");
  const pw2Input = document.querySelector(".pw2 input");
  const nameInput = document.querySelector(".name input");
  const telInput = document.querySelector(".tel-auth .tel-auth__req input");

  const handleIdUpperCase = function(e) {
    e.target.value = e.target.value.toLowerCase();
  }

  const checkValidity = function(e) {
    const argName = e.target.name;
    let isValid;
    if (e.target.name !== "pw2") {
      isValid = validationConfig[argName].validator(e.target.value);
    } else {
      isValid = validationConfig[argName].validator(e.target.value, pwInput.value);
    }
    
    if (isValid) {
      validationConfig.handler(e, validationConfig.status.SUCCESS);
      isMandatoryArgsValid[argName] = true;
    } else {
      validationConfig.handler(e, validationConfig.status.FAILURE);
      isMandatoryArgsValid[argName] = false;
    }
  }

  idInput.addEventListener("input", handleIdUpperCase);
  idInput.addEventListener("focusout", checkValidity);
  pwInput.addEventListener("focusout", checkValidity);
  pw2Input.addEventListener("focusout", checkValidity);
  nameInput.addEventListener("focusout", checkValidity);
  telInput.addEventListener("focusout", checkValidity);
})();