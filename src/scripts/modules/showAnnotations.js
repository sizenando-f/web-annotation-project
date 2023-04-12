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
        id: localStorage.getItem(`id${i}`),
      };
      annotationList.push(annotationBlock);
    }
  }

  const writerPanel = document.getElementById("add-or-edit-annotation-div");

  // If already exists annotations and its not actually editing one, just put one more
  if (control && writerPanel.dataset.actualEdit === "") {
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

  // If already exists annotations and its actually editing one, just replace those infos
  if (control && writerPanel.dataset.actualEdit !== "") {
    let id = writerPanel.dataset.actualEdit;
    const allAnnotations = document.querySelectorAll(".saved-annotation");
    allAnnotations.forEach((el) => {
      if (el.id === id) {
        console.log("Right");
        el.childNodes[0].childNodes[0].innerText = localStorage.getItem(
          `title${parseInt(id)}`
        );
        el.childNodes[0].childNodes[1].innerText = localStorage.getItem(
          `date${parseInt(id)}`
        );
        el.childNodes[1].innerText = localStorage.getItem(
          `text${parseInt(id)}`
        );
      }
    });
    return;
  }

  // If not exists any annotations, put all that are in local storage
  annotationList.forEach((element) => {
    const div = autoElementCreator("div", "saved-annotation", "", element.id);
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
}

export { show };
