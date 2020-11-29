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

document.getElementById("copy").innerText = window.location.href;

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

document.getElementById("reportError").addEventListener("click", () => {
  let list = [];

  Array.from(document.getElementsByTagName("input")).forEach(function (input) {
    if (input.checked) {
      list.push(document.getElementById(input.name).innerText);
    }
  });

  fetch("https://webbackend-ffwfi5ynba-uc.a.run.app/api/analysis_error", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      texts: list,
    }),
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

document.getElementsByClassName("snsWrap")[0].addEventListener("click", () => {
  window.open(
    "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href
  );
});

document.getElementsByClassName("snsWrap")[1].addEventListener("click", () => {
  window.open(
    "https://twitter.com/intent/tweet?text=Refairy 검사 결과&url=" +
      window.location.href
  );
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

function highlightSentence(frame, result) {
  const els = [
    ...[
      ...frame.contentWindow.document.querySelectorAll(
        "*:not(script):not(style)"
      ),
    ],
  ].reverse();
  if (els.length === 5) return; // init이벤트는 무시

  const highlightStyle = frame.contentWindow.document.createElement("style");
  highlightStyle.appendChild(
    frame.contentWindow.document.createTextNode(`.REFAIRY_HIGHLIGHT {
    background-color: #646ef8;
    color: white;
  }`)
  );

  frame.contentWindow.document.children[0].appendChild(highlightStyle);

  window.frame = frame.contentWindow;
  result.forEach((e) => {
    const index = els.findIndex((el) => el?.innerText.includes(e.origin));
    if (!els[index]) return;
    els[index].innerHTML = els[index].innerHTML
      .split(e.origin)
      .join(`<span class="REFAIRY_HIGHLIGHT">${e.origin}</span>`);
    els[index] = null;
  });
}

function beforeExit() {
  window.onbeforeunload = function (e) {
    return true;
  };
}

window.onload = () => {
  resizeButtonControl();

  const reportID = getParam("id");
  const reportSentenceTotalCount =
    sessionStorage.getItem(reportID + "-TotalCount") * 1;

  const CheckProgress = () => {
    fetch(
      "https://webbackend-ffwfi5ynba-uc.a.run.app/api/analyze/" + reportID,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        let progressPercentage =
          (resp.progress / reportSentenceTotalCount) * 100;
        document.getElementById("reportProgressBar").style.width =
          progressPercentage + "%";

        // console.log(resp);

        if (resp.isDone) {
          fetch(
            "https://webbackend-ffwfi5ynba-uc.a.run.app/api/report/" + reportID,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
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
              document.querySelector("#reportURL span").innerHTML =
                response.uri;
              document.getElementById(
                "view"
              ).innerHTML = `<iframe is="x-frame-bypass" src="${response.uri}"></iframe>`;
              const frame = document.getElementById("view").children[0];
              frame.addEventListener("load", () =>
                highlightSentence(frame, response.analysisResult)
              );
              document.querySelector("#view iframe").src = response.uri;
              document.querySelector("#reportCount span").innerHTML =
                response.analysisResult.length + "개";

              for (key in response.analysisResult) {
                document.getElementById("reportSentences").innerHTML += `
                <div class="reportSentenceWrap">
                  <label id="${key}" for="${key}" class="reportSentence">
                    ${response.analysisResult[key].origin}
                  </label>
                </div>`;
              }

              if (document.getElementById("reportSentences").innerText == "") {
                document.getElementById("reportSentences").style.display =
                  "none";
                document.getElementById("reportCount").style.display = "none";
                document.getElementById("reportIsError").style.display = "none";
                document.getElementById("reportNoError").style.display = "flex";
              }

              document.getElementById("reportButtons").style.display = "block";
              document.getElementById("reportIsError").style.display = "block";
              document.getElementById("reportProgress").style.display = "none";

              let names = [],
                values = [];
              for (key in response.history) {
                updatedDate = new Date(response.history[key].date);
                updatedDate =
                  updatedDate.getMonth() + "/" + updatedDate.getDate();

                names.push(updatedDate);
                values.push([response.history[key].amount]);
              }

              if (names != [] && values != []) {
                document.getElementById("Nwagon").innerText = "";
                document.getElementById("Nwagon").style.border = "0px";

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
              }
            });

          clearInterval(analyzeProgressTimer);
        }
      });
  };

  CheckProgress();

  let analyzeProgressTimer = setInterval(CheckProgress, 3000);
};
