const annotationDiv = document.getElementById("add-or-edit-annotation-div");

document
  .getElementById("menu-btn-new-annotation")
  .addEventListener("click", () => {
    annotationDiv.classList = "annotation-actived";
  });

document
  .getElementById("close-annotation-div-btn")
  .addEventListener("click", () => {
    annotationDiv.classList = "annotation-desactived";
  });
