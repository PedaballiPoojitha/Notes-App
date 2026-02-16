let notes = JSON.parse(localStorage.getItem("notesApp")) || [];

const container = document.getElementById("notesContainer");
const searchInput = document.getElementById("searchInput");

function saveNotes() {
    localStorage.setItem("notesApp", JSON.stringify(notes));
}

function renderNotes() {
    container.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();

    notes
        .filter(note => note.content.toLowerCase().includes(searchText))
        .forEach(note => {

            const noteDiv = document.createElement("div");
            noteDiv.className = "note";

            const textarea = document.createElement("textarea");
            textarea.value = note.content;

            textarea.addEventListener("input", () => {
                note.content = textarea.value;
                saveNotes();
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";

            deleteBtn.addEventListener("click", () => {
                notes = notes.filter(n => n.id !== note.id);
                saveNotes();
                renderNotes();
            });

            noteDiv.appendChild(textarea);
            noteDiv.appendChild(deleteBtn);
            container.appendChild(noteDiv);
        });
}

function addNote() {
    const noteText = prompt("Enter your note:");

    if (!noteText) return;

    notes.push({
        id: Date.now(),
        content: noteText
    });

    saveNotes();
    searchInput.value = "";
    renderNotes();
}

