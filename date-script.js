const options = document.querySelectorAll(".date-option");
const chosenOption = document.querySelector("#chosenOption");
const celebration = document.querySelector("#celebration");

options.forEach((option) => {
  option.addEventListener("click", () => {
    options.forEach((currentOption) => currentOption.setAttribute("aria-pressed", "false"));
    option.setAttribute("aria-pressed", "true");
    chosenOption.textContent = `Perfect. ${option.dataset.choice} it is.`;
    celebration.classList.remove("is-visible");
    requestAnimationFrame(() => celebration.classList.add("is-visible"));
  });
});
