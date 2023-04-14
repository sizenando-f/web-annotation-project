import { saveBtn } from "./modules/save.js";
import { show } from "./modules/showAnnotations.js";

const annotationDiv = document.getElementById("add-or-edit-annotation-div");
const annotationTitle = document.getElementById("title-annotation");
const mainAnnotation = document.getElementById("main-annotation-area");
const buttonSave = document.getElementById("btn-annotation-saver");
const deleteBtn = document.getElementById("btn-delete-annotation");
const editBtn = document.getElementById("btn-edit-annotation");

// Show the existing annotations
show();

// Turns the panel visible to write
document
  .getElementById("menu-btn-new-annotation")
  .addEventListener("click", () => {
    // Clean previous values inserted
    mainAnnotation.value = "";
    mainAnnotation.disabled = false;
    annotationTitle.value = "";
    annotationTitle.disabled = false;
    annotationDiv.dataset.actualEdit = "";
    annotationDiv.classList = "annotation-actived";
    deleteBtn.disabled = true;
    editBtn.disabled = true;
    buttonSave.disabled = false;
  });

// The panel is hidden and the title and the text wrote is erased
document.getElementById("close-button-itself").addEventListener("click", () => {
  annotationDiv.classList = "annotation-desactived";
  // Reset control data
  annotationDiv.dataset.actualEdit = "";
  annotationTitle.disabled = false;
  mainAnnotation.disabled = false;
  buttonSave.disabled = false;
  annotationTitle.value = "";
  mainAnnotation.value = "";
});

// Calls save function
document
  .getElementById("btn-annotation-saver")
  .addEventListener("click", saveBtn);

editBtn.addEventListener("click", () => {
  mainAnnotation.disabled = false;
  annotationTitle.disabled = false;
  buttonSave.disabled = false;
  annotationTitle.style.backgroundColor = "rgba(0, 128, 0, 0.377)";
  mainAnnotation.style.backgroundColor = "rgba(0, 128, 0, 0.377)";
  setTimeout(() => {
    annotationTitle.style.backgroundColor = "transparent";
    mainAnnotation.style.backgroundColor = "transparent";
  }, 500);
});
