const question = document.querySelector("#question");
const response = document.querySelector("#response");
const yesButton = document.querySelector("#yesButton");
const noButton = document.querySelector("#noButton");
const buttons = document.querySelector("#buttons");

const noLines = [
  "That button seems a little shy.",
  "Are you sure? I picked a really good place.",
  "I can wait... but I hope not too long.",
  "The flowers are quietly voting for yes.",
  "You are making me work for it!",
  "I have a feeling you might change your mind.",
  "A little adventure is still waiting for us.",
];

let noAttempts = 0;

function acceptDate() {
  window.location.href = "date.html";
}

function moveNoButton(event) {
  noAttempts += 1;
  const line = noLines[Math.min(noAttempts - 1, noLines.length - 1)];
  response.textContent = line;

  buttons.classList.add("is-running");

  const frame = buttons.getBoundingClientRect();
  const frameWidth = buttons.clientWidth;
  const frameHeight = buttons.clientHeight;
  const yes = yesButton.getBoundingClientRect();
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;
  const yesBox = {
    left: yes.left - frame.left,
    right: yes.right - frame.left,
    top: yes.top - frame.top,
    bottom: yes.bottom - frame.top,
  };
  const cursorX = event?.clientX ? event.clientX - frame.left : -1000;
  const cursorY = event?.clientY ? event.clientY - frame.top : -1000;
  const frameInset = 4;

  let left = 0;
  let top = 0;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const candidateLeft = frameInset + Math.random() * Math.max(frameWidth - buttonWidth - frameInset * 2, 0);
    const candidateTop = frameInset + Math.random() * Math.max(frameHeight - buttonHeight - frameInset * 2, 0);
    const overlapsYes = candidateLeft < yesBox.right
      && candidateLeft + buttonWidth > yesBox.left
      && candidateTop < yesBox.bottom
      && candidateTop + buttonHeight > yesBox.top;
    const tooCloseToCursor = Math.hypot(
      candidateLeft + buttonWidth / 2 - cursorX,
      candidateTop + buttonHeight / 2 - cursorY,
    ) < 100;

    if (!overlapsYes && !tooCloseToCursor) {
      left = candidateLeft;
      top = candidateTop;
      break;
    }
  }

  noButton.style.transform = "none";
  noButton.style.left = `${left}px`;
  noButton.style.top = `${top}px`;
}

yesButton.addEventListener("click", acceptDate);
noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("focus", moveNoButton);
noButton.addEventListener("click", moveNoButton);
