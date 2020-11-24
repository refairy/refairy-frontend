const refairyLab = document.getElementById("refairyLab");

refairyLab.addEventListener("click", () => {
  window.location.href = "./lab";
});

Array.from(document.getElementsByClassName("SearchHistory")).forEach(function (
  item
) {
  item.addEventListener("click", () => {
    window.location.href = "./result";
  });
});
