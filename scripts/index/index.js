const refairyLab = document.getElementById("refairyLab");

refairyLab.addEventListener("click", () => {
  window.location.href = "./lab";
});

const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  window.location.href = "./report";
});

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

const wordScroll = () => {
  console.log("Timer");
};

window.onload = () => {
  wordScroll();
  wordScrollTimer = setInterval(wordScroll, 1000);

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
