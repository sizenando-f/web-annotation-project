import { show } from "./showAnnotations.js";

const annotationTitle = document.getElementById("title-annotation");
const mainAnnotation = document.getElementById("main-annotation-area");
const btnWriteSaver = document.getElementById("btn-annotation-saver");

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

  btnWriteSaver.innerText = "Saved!";
  // To know how many annotations exists
  idCounter++;

  // Control variable to storage how many annotations there is
  let annotationsQuant = localStorage.getItem("annotationsQuant") ?? 0;
  annotationsQuant++;
  localStorage.setItem("annotationsQuant", annotationsQuant);
  localStorage.setItem("idCount", idCounter);

  localStorage.setItem(`title${idCounter}`, title);
  localStorage.setItem(`text${idCounter}`, text);
  localStorage.setItem(`date${idCounter}`, date);

  show();

  // After 2 seconds, the icon returns to normal
  setTimeout(() => {
    btnWriteSaver.innerText = "Save";
  }, 2000);
};

export { saveBtn };
