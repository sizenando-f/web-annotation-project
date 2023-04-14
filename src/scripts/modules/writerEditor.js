import { saveBtn } from "./save.js";

const annotationDiv = document.getElementById("add-or-edit-annotation-div");
const title = document.getElementById("title-annotation");
const text = document.getElementById("main-annotation-area");
const buttonSave = document.getElementById("btn-annotation-saver");
const deleteBtn = document.getElementById("btn-delete-annotation");
const editBtn = document.getElementById("btn-edit-annotation");

// Used to know if the buttons already have an event
let control = false;

function writeEditor(ev) {
  // Gets the div who called the event
  let div = ev.currentTarget;
  deleteBtn.disabled = false;
  editBtn.disabled = false;

  // Set a data to future edit or remove of div in annotations area
  annotationDiv.dataset.actualEdit = div.id;
  annotationDiv.classList = "annotation-actived";

  // Makes disabled while is not in edit mode
  title.disabled = true;
  text.disabled = true;
  buttonSave.disabled = true;

  // Gets value that match with div id
  title.value = localStorage.getItem(`title${div.id}`);
  text.value = localStorage.getItem(`text${div.id}`);

  // If the buttons dont have any events yet
  if (control === false) {
    document
      .getElementById("btn-delete-annotation")
      .addEventListener("click", (ev) => {
        const allAnnotations = document.querySelectorAll(".saved-annotation");
        // Gets the id of the div that called the event
        const id = ev.currentTarget.parentNode.parentNode.dataset.actualEdit;

        if (confirm("Are you sure you want to delete this annotation?")) {
          // If the id match with any div id existing in annotation area, that div is erased
          allAnnotations.forEach((el) => {
            if (id === el.id) {
              let annotationsQuant = localStorage.getItem("annotationsQuant");
              annotationsQuant--;
              localStorage.setItem("annotationsQuant", annotationsQuant);
              localStorage.removeItem(`title${id}`);
              localStorage.removeItem(`text${id}`);
              localStorage.removeItem(`date${id}`);
              localStorage.removeItem(`id${id}`);
              el.remove();

              // Close writer when deleted
              annotationDiv.classList = "annotation-desactived";
            }
          });
        }
      });
  }

  // Changes to true if the buttons get events
  control = true;
}

export { writeEditor };
