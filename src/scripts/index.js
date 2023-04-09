import { saveBtn } from "./modules/save.js";
import { show } from "./modules/showAnnotations.js";

const annotationDiv = document.getElementById("add-or-edit-annotation-div");
const annotationTitle = document.getElementById("title-annotation");
const mainAnnotation = document.getElementById("main-annotation-area");

// Show the existing annotations
show();

// Turns the panel visible to write
document
  .getElementById("menu-btn-new-annotation")
  .addEventListener("click", () => {
    annotationDiv.classList = "annotation-actived";
  });

// The panel is hidden and the title and the text wrote is erased
document.getElementById("close-button-itself").addEventListener("click", () => {
  annotationDiv.classList = "annotation-desactived";
  annotationTitle.value = "";
  mainAnnotation.value = "";
});

// Calls save function
document
  .getElementById("btn-annotation-saver")
  .addEventListener("click", saveBtn);
