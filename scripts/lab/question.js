let i = 0;
let pass = false;
let response, length;

window.onload = () => {
  const cancelBtn = document.getElementById("cancelBtn");
  cancelBtn.addEventListener("click", () => {
    window.location.href = "./";
  });

  const thanksModalBtn = document.getElementById("thanksModalDone");
  thanksModalBtn.addEventListener("click", () => {
    window.location.href = "../";
  });

  async function main() {
    await fetch(
      "https://webbackend-ffwfi5ynba-uc.a.run.app/api/analysis_error",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (resp) {
        return resp.json();
      })
      .then(function (resp) {
        response = resp;

        let overlaps = [];

        if (localStorage.getItem("refairyLab_historyID") !== null) {
          for (item of resp) {
            for (j in localStorage.getItem("refairyLab_historyID").split(" ")) {
              if (
                item._id ===
                localStorage.getItem("refairyLab_historyID").split(" ")[j]
              ) {
                overlaps.push(
                  localStorage.getItem("refairyLab_historyID").split(" ")[j]
                );
              }
            }
          }
        }

        length = response.length;

        let boolcnt = false;

        for (k = 0; k < length; k++) {
          if (!overlaps.includes(response[k]._id)) {
            boolcnt = true;
            document.getElementById("question").innerText = response[i].text;
          }
        }

        // 응답할 설문이 아예 없으면
        if (!boolcnt) {
          document.getElementById("thanksModalTitle").innerHTML =
            "모든 설문을 완료했습니다";

          document.getElementById("questionBox").style.display = "none";
          document.getElementById("thanksModal").style.display = "flex";

          pass = true;
        }
      });

    if (!pass) {
      const btn1 = document.getElementById("btn1");
      const btn2 = document.getElementById("btn2");
      const btn3 = document.getElementById("btn3");
      const btn4 = document.getElementById("idkButton");

      btn1.addEventListener("click", () => {
        now = localStorage.getItem("refairyLab_untilNow") * 1;

        if (localStorage.getItem("refairyLab_historyID") === null) {
          localStorage.setItem("refairyLab_historyID", response[i]._id);
        } else {
          localStorage.setItem(
            "refairyLab_historyID",
            localStorage.getItem("refairyLab_historyID") + " " + response[i]._id
          );
        }

        var myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");

        fetch(
          "https://webbackend-ffwfi5ynba-uc.a.run.app/api/analysis_error/" +
            response[i]._id,
          {
            method: "POST",
            headers: myHeader,
            body: JSON.stringify({ evaluate: "RIGHT" }),
          }
        );

        if (i + 1 === length) {
          document.getElementById("questionBox").style.display = "none";
          document.getElementById("thanksModal").style.display = "flex";
          return;
        }

        i++;
        localStorage.setItem("refairyLab_untilNow", now + 1);
        document.getElementById("question").innerText = response[i].text;
      });

      btn2.addEventListener("click", () => {
        now = localStorage.getItem("refairyLab_untilNow") * 1;

        if (localStorage.getItem("refairyLab_historyID") === null) {
          localStorage.setItem("refairyLab_historyID", response[i]._id);
        } else {
          localStorage.setItem(
            "refairyLab_historyID",
            localStorage.getItem("refairyLab_historyID") + " " + response[i]._id
          );
        }

        var myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");

        fetch(
          "https://webbackend-ffwfi5ynba-uc.a.run.app/api/analysis_error/" +
            response[i]._id,
          {
            method: "POST",
            headers: myHeader,
            body: JSON.stringify({ evaluate: "WRONG" }),
          }
        );

        if (i + 1 === length) {
          document.getElementById("questionBox").style.display = "none";
          document.getElementById("thanksModal").style.display = "flex";
          return;
        }

        i++;
        localStorage.setItem("refairyLab_untilNow", now + 1);
        document.getElementById("question").innerText = response[i].text;
      });

      btn3.addEventListener("click", () => {
        now = localStorage.getItem("refairyLab_untilNow") * 1;

        if (localStorage.getItem("refairyLab_historyID") === null) {
          localStorage.setItem("refairyLab_historyID", response[i]._id);
        } else {
          localStorage.setItem(
            "refairyLab_historyID",
            localStorage.getItem("refairyLab_historyID") + " " + response[i]._id
          );
        }

        var myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");

        fetch(
          "https://webbackend-ffwfi5ynba-uc.a.run.app/api/analysis_error/" +
            response[i]._id,
          {
            method: "POST",
            headers: myHeader,
            body: JSON.stringify({ evaluate: "NOT_ASSOCIATED" }),
          }
        );

        if (i + 1 === length) {
          document.getElementById("questionBox").style.display = "none";
          document.getElementById("thanksModal").style.display = "flex";
          return;
        }

        i++;
        localStorage.setItem("refairyLab_untilNow", now + 1);
        document.getElementById("question").innerText = response[i].text;
      });

      btn4.addEventListener("click", () => {
        now = localStorage.getItem("refairyLab_untilNow") * 1;

        if (localStorage.getItem("refairyLab_historyID") === null) {
          localStorage.setItem("refairyLab_historyID", response[i]._id);
        } else {
          localStorage.setItem(
            "refairyLab_historyID",
            localStorage.getItem("refairyLab_historyID") + " " + response[i]._id
          );
        }

        if (i + 1 === length) {
          document.getElementById("questionBox").style.display = "none";
          document.getElementById("thanksModal").style.display = "flex";
          return;
        }

        i++;
        localStorage.setItem("refairyLab_untilNow", now + 1);
        document.getElementById("question").innerText = response[i].text;
      });

      window.onkeydown = function (event) {
        if (i !== length) {
          switch (event.keyCode) {
            case 49:
            case 97:
              now = localStorage.getItem("refairyLab_untilNow") * 1;

              if (localStorage.getItem("refairyLab_historyID") === null) {
                localStorage.setItem("refairyLab_historyID", response[i]._id);
              } else {
                localStorage.setItem(
                  "refairyLab_historyID",
                  localStorage.getItem("refairyLab_historyID") +
                    " " +
                    response[i]._id
                );
              }

              var myHeader = new Headers();
              myHeader.append("Content-Type", "application/json");

              fetch(
                "https://webbackend-ffwfi5ynba-uc.a.run.app/api/analysis_error/" +
                  response[i]._id,
                {
                  method: "POST",
                  headers: myHeader,
                  body: JSON.stringify({ evaluate: "RIGHT" }),
                }
              );

              if (i + 1 === length) {
                document.getElementById("questionBox").style.display = "none";
                document.getElementById("thanksModal").style.display = "flex";
                return;
              }

              i++;
              localStorage.setItem("refairyLab_untilNow", now + 1);
              document.getElementById("question").innerText = response[i].text;
              break;
            case 50:
            case 98:
              now = localStorage.getItem("refairyLab_untilNow") * 1;

              if (localStorage.getItem("refairyLab_historyID") === null) {
                localStorage.setItem("refairyLab_historyID", response[i]._id);
              } else {
                localStorage.setItem(
                  "refairyLab_historyID",
                  localStorage.getItem("refairyLab_historyID") +
                    " " +
                    response[i]._id
                );
              }

              var myHeader = new Headers();
              myHeader.append("Content-Type", "application/json");

              fetch(
                "https://webbackend-ffwfi5ynba-uc.a.run.app/api/analysis_error/" +
                  response[i]._id,
                {
                  method: "POST",
                  headers: myHeader,
                  body: JSON.stringify({ evaluate: "WRONG" }),
                }
              );

              if (i + 1 === length) {
                document.getElementById("questionBox").style.display = "none";
                document.getElementById("thanksModal").style.display = "flex";
                return;
              }

              i++;
              localStorage.setItem("refairyLab_untilNow", now + 1);
              document.getElementById("question").innerText = response[i].text;
              break;
            case 51:
            case 99:
              now = localStorage.getItem("refairyLab_untilNow") * 1;

              if (localStorage.getItem("refairyLab_historyID") === null) {
                localStorage.setItem("refairyLab_historyID", response[i]._id);
              } else {
                localStorage.setItem(
                  "refairyLab_historyID",
                  localStorage.getItem("refairyLab_historyID") +
                    " " +
                    response[i]._id
                );
              }

              var myHeader = new Headers();
              myHeader.append("Content-Type", "application/json");

              fetch(
                "https://webbackend-ffwfi5ynba-uc.a.run.app/api/analysis_error/" +
                  response[i]._id,
                {
                  method: "POST",
                  headers: myHeader,
                  body: JSON.stringify({ evaluate: "NOT_ASSOCIATED" }),
                }
              );

              if (i + 1 === length) {
                document.getElementById("questionBox").style.display = "none";
                document.getElementById("thanksModal").style.display = "flex";
                return;
              }

              i++;
              localStorage.setItem("refairyLab_untilNow", now + 1);
              document.getElementById("question").innerText = response[i].text;
              break;

            case 52:
            case 100:
              now = localStorage.getItem("refairyLab_untilNow") * 1;

              if (localStorage.getItem("refairyLab_historyID") === null) {
                localStorage.setItem("refairyLab_historyID", response[i]._id);
              } else {
                localStorage.setItem(
                  "refairyLab_historyID",
                  localStorage.getItem("refairyLab_historyID") +
                    " " +
                    response[i]._id
                );
              }

              if (i + 1 === length) {
                document.getElementById("questionBox").style.display = "none";
                document.getElementById("thanksModal").style.display = "flex";
                return;
              }

              i++;
              localStorage.setItem("refairyLab_untilNow", now + 1);
              document.getElementById("question").innerText = response[i].text;
              break;
          }
        }
      };
    }
  }

  main();
};
