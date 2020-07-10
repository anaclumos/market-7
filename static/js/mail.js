const emailDomain = document.querySelector(".emailDomainField");
const emailSelect = document.querySelector(".emailDomainSelect");

emailSelect.addEventListener("change", () => {
  emailDomain.value = emailSelect.value;
  emailDomain.focus();
});

emailDomain.addEventListener("change", () => {
  emailSelect.selectedIndex = 0;
});