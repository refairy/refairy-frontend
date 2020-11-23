const minusBtn = document.getElementById("makeSmall");
const plusBtn = document.getElementById("makeBig");
let panelSize = document.getElementById("report").className;

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

window.onload = () => {
  resizeButtonControl();
};

minusBtn.addEventListener("click", () => {
  if (minusBtn.className != "unable") {
    switch (panelSize) {
      case "full":
        document.getElementById("report").className = "medium";
        break;
      case "medium":
        document.getElementById("report").className = "small";
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
        break;
      case "medium":
        console.log("in");
        document.getElementById("report").className = "full";
        break;
    }

    panelSize = document.getElementById("report").className;
    resizeButtonControl();
  }
});
