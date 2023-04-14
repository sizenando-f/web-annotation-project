import { show } from "./showAnnotations.js";

const annotationTitle = document.getElementById("title-annotation");
const mainAnnotation = document.getElementById("main-annotation-area");
const btnWriteSaver = document.getElementById("btn-annotation-saver");
const writerPanel = document.getElementById("add-or-edit-annotation-div");

let idCounter = localStorage.getItem("idCount") ?? 0;

const saveBtn = () => {
  // Get the title and text values
  let title = annotationTitle.value;
  let text = mainAnnotation.value;
  let date = dayjs().format("DD/MM/YYYY - hh:mm");

  // Check if is null
  if (!title && !text) {
    annotationTitle.style.backgroundColor = "rgba(255, 0, 0, 0.345)";
    mainAnnotation.style.backgroundColor = "rgba(255, 0, 0, 0.345)";
    setTimeout(() => {
      annotationTitle.style.backgroundColor = "transparent";
      mainAnnotation.style.backgroundColor = "transparent";
    }, 2000);
    return;
  }

  // If its a new panel from the create annotation button
  if (writerPanel.dataset.actualEdit === "") {
    btnWriteSaver.innerText = "Saved!";
    // To know how many annotations exists
    idCounter++;

    // Control to identify each annotation
    let id = idCounter;

    // Control variable to storage how many annotations there is
    let annotationsQuant = localStorage.getItem("annotationsQuant") ?? 0;
    annotationsQuant++;
    localStorage.setItem("annotationsQuant", annotationsQuant);
    localStorage.setItem("idCount", idCounter);

    localStorage.setItem(`id${idCounter}`, id);
    localStorage.setItem(`title${idCounter}`, title);
    localStorage.setItem(`text${idCounter}`, text);
    localStorage.setItem(`date${idCounter}`, date);

    show();

    writerPanel.dataset.actualEdit = id;

    // After 2 seconds, the icon returns to normal
    setTimeout(() => {
      btnWriteSaver.innerText = "Save";
    }, 2000);
    return;
  }

  btnWriteSaver.innerText = "Saved!";

  // If the code gets here, thats mean that is an existing annotation that will be saved, so he will just replace those info on local storage
  let id = parseInt(writerPanel.dataset.actualEdit);
  localStorage.setItem(`title${id}`, title);
  localStorage.setItem(`text${id}`, text);
  localStorage.setItem(`date${id}`, date);

  setTimeout(() => {
    btnWriteSaver.innerText = "Save";
  }, 2000);

  show();
};

export { saveBtn };
