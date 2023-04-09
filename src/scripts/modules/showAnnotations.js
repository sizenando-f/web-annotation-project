const annotationsArea = document.getElementById("all-annotations");

// Used to know if already exists annotations at area
let control = false;

// Returns a DOM element
function autoElementCreator(type, className, innerText = "") {
  const element = document.createElement(type);
  element.className = className;
  element.innerText = innerText;
  return element;
}

// Show the annotations at area of annotations
function show() {
  const annotationList = [];
  let registerNumber = localStorage.getItem("idCount");
  let annotationBlock = {};

  // For each title, text and dates in common, will put in an object and pushed in an array
  for (let i = 1; i <= registerNumber; i++) {
    annotationBlock = {
      title: localStorage.getItem(`title${i}`),
      text: localStorage.getItem(`text${i}`),
      date: localStorage.getItem(`date${i}`),
    };
    annotationList.push(annotationBlock);
  }

  // If already exists annotations, just put one more
  if (control) {
    const div = autoElementCreator("div", "saved-annotation");
    const span = autoElementCreator("span", "saved-title-area");
    const em = autoElementCreator("em", "", annotationBlock.date);
    const h2 = autoElementCreator("h2", "", annotationBlock.title);
    const p = autoElementCreator("p", "", annotationBlock.text);
    span.append(h2, em);
    div.append(span, p);
    annotationsArea.appendChild(div);
    return;
  }

  // If not exists any annotations, put all that are in local storage
  annotationList.forEach((element) => {
    const div = autoElementCreator("div", "saved-annotation");
    const span = autoElementCreator("span", "saved-title-area");
    const em = autoElementCreator("em", "", element.date);
    const h2 = autoElementCreator("h2", "", element.title);
    const p = autoElementCreator("p", "", element.text);
    span.append(h2, em);
    div.append(span, p);
    annotationsArea.appendChild(div);
  });

  // This will make the program know that now exists annotations
  control = true;
}

export { show };
