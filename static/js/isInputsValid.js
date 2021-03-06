import { validationConfig } from "./validator.js";
import { authNumber } from "./telAuth.js";

const mandatoryArgs = ["id", "pw", "pw2", "emailDomain", "name", "tel", "telAuth"]
export const isMandatoryArgsValid = mandatoryArgs.reduce((a, b) => (a[b] = "", a), {});

(function() {
  const idInput = document.querySelector(".id input");
  const pwInput = document.querySelector(".pw input");
  const pw2Input = document.querySelector(".pw2 input");
  const nameInput = document.querySelector(".name input");
  const telInput = document.querySelector(".tel-auth .tel-auth__req input");
  const telAuthResContainer = document.querySelector(".tel-auth__res");
  const emailDomain = document.querySelector(".emailDomainField");

  const handleIdUpperCase = function(e) {
    e.target.value = e.target.value.toLowerCase();
  }

  const checkValidity = function(e) {
    const argName = e.target.name;
    let isValid;
    if (e.target.name === "pw2") {
      isValid = validationConfig[argName].validator(e.target.value, pwInput.value);
    } else {
      isValid = validationConfig[argName].validator(e.target.value);
    }
    
    if (isValid) {
      validationConfig.handler(e, validationConfig.status.SUCCESS);
      isMandatoryArgsValid[argName] = e.target.value;
    } else {
      validationConfig.handler(e, validationConfig.status.FAILURE);
      isMandatoryArgsValid[argName] = "";
    }
  }

  const handleTelAuthResEvent = function(e) {
    if (e.target.tagName === "BUTTON") {
      const telAuthInput = telAuthResContainer.querySelector("input");
      const isValid = validationConfig.telAuth.validator(telAuthInput.value, authNumber);

      if (isValid) {
        validationConfig.handler(e, validationConfig.status.SUCCESS);
        isMandatoryArgsValid["telAuth"] = true;
      } else {
        validationConfig.handler(e, validationConfig.status.FAILURE);
        isMandatoryArgsValid["telAuth"] = false;
        alert("인증번호가 일치하지 않습니다.");
      }
    }
  }

  idInput.addEventListener("input", handleIdUpperCase);
  idInput.addEventListener("focusout", checkValidity);
  pwInput.addEventListener("focusout", checkValidity);
  pw2Input.addEventListener("focusout", checkValidity);
  nameInput.addEventListener("focusout", checkValidity);
  telInput.addEventListener("focusout", checkValidity);
  telAuthResContainer.addEventListener("click", handleTelAuthResEvent);
  emailDomain.addEventListener("focusout", checkValidity);
})();