import { writeEditor } from "./writerEditor.js";

const annotationsArea = document.getElementById("all-annotations");

// Used to know if already exists annotations at area
let control = false;

// Returns a DOM element
export function autoElementCreator(type, className, innerText = "", id = "") {
  const element = document.createElement(type);
  element.className = className;
  element.innerText = innerText;
  element.id = id;
  return element;
}

// Check if there is more annotations then storage quantity, when this happen, usually is when the user erase all annotations but even like that the annotation persists, so this function erase all data fixing this bug
function checkError() {
  const annQuant = document.querySelectorAll(".saved-annotation").length;
  const trueQuant = localStorage.getItem("annotationsQuant");
  if (annQuant > trueQuant) {
    location.reload();
    localStorage.clear();
    console.error(
      "Error detected, it seems there's an unwanted annotation is in your space, clearing data..."
    );
    return;
  }
}

// Show the annotations at area of annotations
function show() {
  const annotationList = [];
  let registerNumber = localStorage.getItem("idCount");
  let annotationBlock = {};

  // For each title, text and dates in common, will put in an object and pushed in an array
  for (let i = 1; i <= registerNumber; i++) {
    if (localStorage.getItem(`title${i}`) !== null) {
      annotationBlock = {
        title: localStorage.getItem(`title${i}`),
        text: localStorage.getItem(`text${i}`),
        date: localStorage.getItem(`date${i}`),
      };
      annotationList.push(annotationBlock);
    }
  }

  // If already exists annotations, just put one more
  if (control) {
    const div = autoElementCreator(
      "div",
      "saved-annotation",
      "",
      `${registerNumber}`
    );
    const span = autoElementCreator("span", "saved-title-area");
    const em = autoElementCreator("em", "", annotationBlock.date);
    const h2 = autoElementCreator("h2", "", annotationBlock.title);
    const p = autoElementCreator("p", "", annotationBlock.text);
    div.addEventListener("click", writeEditor);
    div.dataset.seen = false;
    span.append(h2, em);
    div.append(span, p);
    annotationsArea.appendChild(div);
    return;
  }

  // If not exists any annotations, put all that are in local storage
  annotationList.forEach((element, index) => {
    const div = autoElementCreator("div", "saved-annotation", "", index + 1);
    const span = autoElementCreator("span", "saved-title-area");
    const em = autoElementCreator("em", "", element.date);
    const h2 = autoElementCreator("h2", "", element.title);
    const p = autoElementCreator("p", "", element.text);
    div.addEventListener("click", writeEditor);
    div.dataset.seen = "false";
    span.append(h2, em);
    div.append(span, p);
    annotationsArea.appendChild(div);
  });

  // This will make the program know that now exists annotations
  control = true;
  checkError();
}

export { show };
