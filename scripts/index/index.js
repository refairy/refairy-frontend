let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

const refairyLab = document.getElementById("refairyLab");

refairyLab.addEventListener("click", () => {
  window.location.href = "./lab";
});

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  if (regex.test(document.getElementById("searchInput").value)) {
    let reportURL = document.getElementById("searchInput").value;

    document.getElementById(
      "forIframe"
    ).innerHTML = `<iframe is="x-frame-bypass" src="${
      document.getElementById("searchInput").value
    }" style="display: none"></iframe>`;

    const iframe = document.querySelector("iframe");

    iframe.addEventListener("load", () => {
      // 초기화이벤트는 무시!
      if([...iframe.contentWindow.document.all].length === 5) return

      let sentences = iframe.contentWindow.document.body.innerText
        .replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "")
        .split('\n')
        .map(e => e.trim())
        .filter(Boolean);
      let title = iframe.contentWindow.document.title;
      var myHeader = new Headers();
      myHeader.append("Content-Type", "application/json");
      fetch("https://webbackend-ffwfi5ynba-uc.a.run.app/api/analyze", {
        method: "POST",
        headers: myHeader,
        body: JSON.stringify({
          uri: reportURL,
          sentences: sentences,
          title: title,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((resa) => {
          if (resa._id != undefined) {
            //console.log(JSON.stringify(sentences));
            sessionStorage.setItem(resa._id + "-TotalCount", sentences.length);
            // window.location.href = "./report?id=" + resa._id;
          }
        });
    });
  } else {
    alert("웹사이트 주소를 입력해주세요!");
  }
});

document.getElementById("searchInput").onkeydown = function (event) {
  if (event.keyCode === 13) {
    if (regex.test(document.getElementById("searchInput").value)) {
      let reportURL = document.getElementById("searchInput").value;

      document.getElementById(
        "forIframe"
      ).innerHTML = `<iframe is="x-frame-bypass" src="${
        document.getElementById("searchInput").value
      }" style="display: none"></iframe>`;

      const iframe = document.querySelector("iframe");

      iframe.addEventListener("load", () => {
        let sentences = iframe.contentWindow.document.body.innerText
          .split("\n")
          .map((e) => e.trim());

        let title = iframe.contentWindow.document.title;

        var myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");

        fetch("https://webbackend-ffwfi5ynba-uc.a.run.app/api/analyze", {
          method: "POST",
          headers: myHeader,
          body: JSON.stringify({
            uri: reportURL,
            sentences: sentences,
            title: title,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((resa) => {
            if (resa._id != undefined) {
              sessionStorage.setItem(
                resa._id + "-TotalCount",
                sentences.length
              );
              window.location.href = "./report?id=" + resa._id;
            }
          });
      });
    } else {
      alert("웹사이트 주소를 입력해주세요!");
    }
  }
};

function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금 전";
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일 전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년 전`;
}

window.onload = () => {
  fetch("https://webbackend-ffwfi5ynba-uc.a.run.app/api/report/recents", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      for (key in response) {
        keyID = key * 1 + 1;

        document.querySelector(
          "#history" + keyID + " .SearchHistory__time"
        ).innerHTML = timeForToday(response[key].updatedAt);

        document.querySelector(
          "#history" + keyID + " .SearchHistory__title"
        ).innerHTML = response[key].title;

        document.querySelector(
          "#history" + keyID + " .SearchHistory__url"
        ).innerHTML = response[key].uri;

        document
          .querySelector("#history1")
          .addEventListener("click", function () {
            window.location.href = "./report?id=" + response[0]._id;
          });

        document
          .querySelector("#history2")
          .addEventListener("click", function () {
            window.location.href = "./report?id=" + response[1]._id;
          });

        document
          .querySelector("#history3")
          .addEventListener("click", function () {
            window.location.href = "./report?id=" + response[2]._id;
          });

        document
          .querySelector("#history4")
          .addEventListener("click", function () {
            window.location.href = "./report?id=" + response[3]._id;
          });

        document.querySelector(
          "#history" + keyID + " .SearchHistory__circle"
        ).innerHTML = response[key].errorAmount + "건";

        if (response[key].errorAmount == 0) {
          document.querySelector(
            "#history" + keyID + " .SearchHistory__circle"
          ).className += " zero";

          document.querySelector(
            "#history" + keyID + " .SearchHistory__circle"
          ).innerHTML = "ZERO";
        } else if (response[key].errorAmount <= 2) {
          document.querySelector(
            "#history" + keyID + " .SearchHistory__circle"
          ).className += " warning";
        } else {
          document.querySelector(
            "#history" + keyID + " .SearchHistory__circle"
          ).className += " risk";
        }
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};
