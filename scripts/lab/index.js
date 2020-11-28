window.onload = () => {
  const questionStart = document.getElementById("questionBoxStart");
  const link = document.getElementById("link");

  questionStart.addEventListener("click", () => {
    window.location.href = "./question";
  });

  link.addEventListener("click", () => {
    window.location.href = "../";
  });

  let untilNow;
  let untilNowStorage = localStorage.getItem("refairyLab_untilNow");

  if (untilNowStorage == null) {
    untilNow = 0;
  } else {
    untilNow = untilNowStorage;
  }

  document.getElementById("untilNow").innerText = untilNow;
};
