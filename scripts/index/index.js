const refairyLab = document.getElementById("refairyLab");

refairyLab.addEventListener("click", () => {
  window.location.href = "./lab";
});

Array.from(document.getElementsByClassName("SearchHistory")).forEach(function (
  item
) {
  item.addEventListener("click", () => {
    window.location.href = "./report";
  });
});

const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  window.location.href = "./report";
});

window.onload = () => {
  let response = fetch(
    "https://webbackend-ffwfi5ynba-uc.a.run.app/api/report/recents",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (err) {
      console.log(err);
    });
};
