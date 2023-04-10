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

  const allAnnotations = document.querySelectorAll(".saved-annotation");

  // If the buttons dont have any events yet
  if (control === false) {
    document
      .getElementById("btn-delete-annotation")
      .addEventListener("click", (ev) => {
        // Gets the id of the div that called the event
        const id = ev.currentTarget.parentNode.parentNode.dataset.actualEdit;

        // If the id match with any div id existing in annotation area, that div is erased
        allAnnotations.forEach((el) => {
          if (id === el.id) {
            el.remove();
          }
        });
      });
  }

  // Changes to true if the buttons get events
  control = true;
}

export { writeEditor };
