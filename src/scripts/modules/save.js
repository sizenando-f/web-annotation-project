const annotationTitle = document.getElementById("title-annotation");
const mainAnnotation = document.getElementById("main-annotation-area");

// Is here where all annotations will be saved
const annotations = [];

const saveBtn = () => {
  const saveIcon = document.getElementById("save-icon");

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
  saveIcon.className = "fa fa-check";

  // Createa an object and push in annotations
  const newAnnotation = {
    title,
    text,
    date,
  };
  annotations.push(newAnnotation);
  console.log(annotations);

  // After 2 seconds, the icon returns to normal
  setTimeout(() => {
    saveIcon.className = "fa fa-floppy-o";
  }, 2000);
};

export { saveBtn, annotations };
