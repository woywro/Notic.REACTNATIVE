export const saveNote = (notes, note) => {
  const newArray = notes.filter((e) => e.id !== note.id);
  newArray.push(
    updateNote(
      note,
      noteTitle,
      noteText,
      note.sharedWith,
      pinned,
      color,
      note.reminder,
      note.isEditable
    )
  );
  setNotes(newArray);
  const noteRef = doc(db, "notes", note.id);
  updateDoc(noteRef, {
    text: noteText,
    title: noteTitle,
    isPinned: pinned,
    color: color,
    modification_timestamp: getTime(),
  });
};
