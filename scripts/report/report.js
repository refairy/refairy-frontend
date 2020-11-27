const minusBtn = document.getElementById("makeSmall");
const plusBtn = document.getElementById("makeBig");
let panelSize = document.getElementById("report").className;
let condition = false;

const resizeButtonControl = () => {
  switch (panelSize) {
    case "full":
      minusBtn.className = "";
      plusBtn.className = "unable";
      break;
    case "medium":
      minusBtn.className = "";
      plusBtn.className = "";
      break;
    case "small":
      minusBtn.className = "unable";
      plusBtn.className = "";
      break;
  }
};

minusBtn.addEventListener("click", () => {
  if (minusBtn.className != "unable") {
    switch (panelSize) {
      case "full":
        document.getElementById("report").className = "medium";
        document.getElementById("reportErrorBack").style.display = "none";
        document.getElementById("reportIsError").style.display = "none";
        break;
      case "medium":
        document.getElementById("report").className = "small";
        document.getElementById("reportErrorButtons").style.display = "none";
        document.getElementById("reportIsError").style.display = "none";
        document.getElementById("reportButtons").style.display = "none";
        break;
    }

    panelSize = document.getElementById("report").className;
    resizeButtonControl();
  }
});

plusBtn.addEventListener("click", () => {
  if (plusBtn.className != "unable") {
    switch (panelSize) {
      case "small":
        document.getElementById("report").className = "medium";

        if (condition) {
          document.getElementById("reportErrorButtons").style.display = "block";
        } else {
          document.getElementById("reportButtons").style.display = "block";
        }

        break;
      case "medium":
        document.getElementById("report").className = "full";

        if (condition) {
          document.getElementById("reportErrorButtons").style.display = "block";
          document.getElementById("reportErrorBack").style.display = "flex";
        } else {
          document.getElementById("reportIsError").style.display = "block";
        }

        break;
    }

    panelSize = document.getElementById("report").className;
    resizeButtonControl();
  }
});

const reportIsError = document.getElementById("reportIsError");
const reportSentenceForm = document.getElementById("reportSentences");
const reportSentences = document.getElementsByClassName("reportSentence");

const reportErrorBack = document.getElementById("reportErrorBack");

document.getElementById("reportErrorButtons").style.display = "none";

reportIsError.addEventListener("click", () => {
  document.getElementById("reportButtons").style.display = "none";
  document.getElementById("reportIsError").style.display = "none";
  document.getElementById("reportErrorButtons").style.display = "block";
  document.getElementById("reportErrorBack").style.display = "flex";

  condition = true;

  Array.from(reportSentences).forEach(function (_, i) {
    let innerText = document
      .getElementsByClassName("reportSentence")
      [i].textContent.trim();

    document.getElementsByClassName("reportSentence")[i].innerHTML = "";

    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.name = i;

    document.getElementsByClassName("reportSentence")[i].before(checkBox);
    document.getElementsByClassName("reportSentence")[i].innerHTML = innerText;
  });
});

reportErrorBack.addEventListener("click", () => {
  condition = false;

  document.getElementById("reportButtons").style.display = "block";
  document.getElementById("reportIsError").style.display = "block";
  document.getElementById("reportErrorButtons").style.display = "none";

  Array.from(document.getElementsByTagName("input")).forEach(function (item) {
    item.remove();
  });
});

const prevButton = document.getElementById("prevButton");
prevButton.addEventListener("click", () => {
  window.location.href = "./";
});

const reportShare = document.getElementById("reportShare");
reportShare.addEventListener("click", () => {
  document.getElementById("report").style.filter = "blur(6px)";
  document.getElementById("view").style.filter = "blur(6px)";
  document.getElementById("modalBackground").style.display = "flex";
});

const cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", () => {
  document.getElementById("report").style.filter = "";
  document.getElementById("view").style.filter = "";
  document.getElementById("modalBackground").style.display = "none";
});

const modalShareURL = document.getElementById("modalShareURL");
modalShareURL.addEventListener("click", function () {
  var tempElem = document.createElement("textarea");
  tempElem.value = document.getElementById("copy").innerText;
  document.body.appendChild(tempElem);
  tempElem.select();
  document.execCommand("copy");
  document.body.removeChild(tempElem);
  alert("Copied!");
});

window.onload = () => {
  resizeButtonControl();
};