window.onload = () => {
  const questionStart = document.getElementById("questionBoxStart");
  const link = document.getElementById("link");

  questionStart.addEventListener("click", () => {
    window.location.href = "./question";
  });

  link.addEventListener("click", () => {
    window.location.href = "../";
  });
};
