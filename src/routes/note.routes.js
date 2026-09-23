const express = require("express");

const {
    createNote,
    updateNote,
    replaceNote,
    updateAllNotesTitles,
    deleteNote,
    paginateAndSortNotes,
    getNoteById,
    getNoteByContent,
    getNotesWithUser,
    aggregateNotes,
    deleteAllNotes
} = require("../controllers/note.controller");

const router = express.Router();


// Create Note
router.post("/", createNote);


// Update All Notes Titles
router.patch("/all", updateAllNotesTitles);


// Pagination and Sort
router.get("/paginate-sort", paginateAndSortNotes);


// Search Note By Content
router.get("/note-by-content", getNoteByContent);


// Get Notes With User
router.get("/note-with-user", getNotesWithUser);


// Aggregation
router.get("/aggregate", aggregateNotes);


// Delete All Notes
router.delete("/", deleteAllNotes);


// Update Note
router.patch("/:noteId", updateNote);


// Replace Note
router.put("/replace/:noteId", replaceNote);


// Delete Note
router.delete("/:noteId", deleteNote);


// Get Note By ID
router.get("/:id", getNoteById);


module.exports = router;