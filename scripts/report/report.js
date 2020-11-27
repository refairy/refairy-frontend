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

function getParam(sname) {
  var params = location.search.substr(location.search.indexOf("?") + 1);
  var sval = "";

  params = params.split("&");

  for (var i = 0; i < params.length; i++) {
    temp = params[i].split("=");

    if ([temp[0]] == sname) {
      sval = temp[1];
    }
  }

  return sval;
}

window.onload = () => {
  resizeButtonControl();

  const reportID = getParam("id");

  fetch("https://webbackend-ffwfi5ynba-uc.a.run.app/api/report/" + reportID, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      switch (response.status) {
        case 200:
          return response.json();
        default:
          document.write("존재하지 않는 보고서입니다.");
      }
    })
    .then(function (response) {
      document.getElementById("reportID").innerText = reportID;
      document.querySelector("#reportURL span").innerHTML = response.uri;

      for (key in response.analysisResult) {
        document.getElementById("reportSentences").innerHTML += `
        <div class="reportSentenceWrap">
          <label for="0" class="reportSentence">
            ${response.analysisResult[key].origin}
          </label>
        </div>`;
      }

      let names = [],
        values = [];
      for (key in response.history) {
        updatedDate = new Date(response.history[key].date);
        updatedDate = updatedDate.getMonth() + "/" + updatedDate.getDate();

        names.push(updatedDate);
        values.push([response.history[key].amount]);
      }

      var options = {
        legend: {
          names: names,
          hrefs: [],
        },
        dataset: {
          title: "Playing time per day",
          values: values,
          colorset: ["#1AB394"],
          fields: ["오류 기록"],
        },
        chartDiv: "Nwagon",
        chartType: "area",
        chartSize: { width: 684, height: 300 },
        increment: 100,
      };

      Nwagon.chart(options);
    });
};
