const mongoose = require("mongoose");
const Note = require("../models/note.model");


// Create Note
const createNote = async (req, res) => {
    try {
        const userId = req.query.id;

        const { title, content } = req.body;

        const note = await Note.create({
            title,
            content,
            userId
        });

        res.status(201).json({
            message: "Note created successfully",
            note
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating note",
            error: error.message
        });
    }
};


// Update Note
const updateNote = async (req, res) => {
    try {
        const userId = req.query.id;
        const { noteId } = req.params;

        const note = await Note.findOne({
            _id: noteId,
            userId
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found or you are not the owner"
            });
        }

        const { title, content } = req.body;

        if (title !== undefined) {
            note.title = title;
        }

        if (content !== undefined) {
            note.content = content;
        }

        await note.save();

        res.status(200).json({
            message: "Note updated successfully",
            note
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating note",
            error: error.message
        });
    }
};


// Replace Note
const replaceNote = async (req, res) => {
    try {
        const userId = req.query.id;
        const { noteId } = req.params;

        const note = await Note.findOne({
            _id: noteId,
            userId
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found or you are not the owner"
            });
        }

        const { title, content } = req.body;

        note.title = title;
        note.content = content;
        note.userId = userId;

        await note.save();

        res.status(200).json({
            message: "Note replaced successfully",
            note
        });

    } catch (error) {
        res.status(500).json({
            message: "Error replacing note",
            error: error.message
        });
    }
};


// Update all note titles
const updateAllNotesTitles = async (req, res) => {
    try {
        const userId = req.query.id;
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const result = await Note.updateMany(
            { userId },
            {
                $set: {
                    title
                }
            }
        );

        res.status(200).json({
            message: "Titles updated successfully",
            modifiedCount: result.modifiedCount
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating note titles",
            error: error.message
        });
    }
};


// Delete single note
const deleteNote = async (req, res) => {
    try {
        const userId = req.query.id;
        const { noteId } = req.params;

        const note = await Note.findOneAndDelete({
            _id: noteId,
            userId
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found or you are not the owner"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully",
            note
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting note",
            error: error.message
        });
    }
};


// Pagination and Sort
const paginateAndSortNotes = async (req, res) => {
    try {
        const userId = req.query.id;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const notes = await Note.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalNotes = await Note.countDocuments({ userId });

        res.status(200).json({
            page,
            limit,
            totalNotes,
            totalPages: Math.ceil(totalNotes / limit),
            notes
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving notes",
            error: error.message
        });
    }
};


// Get Note By ID
const getNoteById = async (req, res) => {
    try {
        const userId = req.query.id;
        const { id } = req.params;

        const note = await Note.findOne({
            _id: id,
            userId
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found or you are not the owner"
            });
        }

        res.status(200).json({
            message: "Note found successfully",
            note
        });

    } catch (error) {
        res.status(500).json({
            message: "Error getting note",
            error: error.message
        });
    }
};


// Get Note By Content
const getNoteByContent = async (req, res) => {
    try {
        const userId = req.query.id;
        const { content } = req.query;

        const note = await Note.findOne({
            userId,
            content
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note found successfully",
            note
        });

    } catch (error) {
        res.status(500).json({
            message: "Error searching for note",
            error: error.message
        });
    }
};


// Notes with User Information
const getNotesWithUser = async (req, res) => {
    try {
        const userId = req.query.id;

        const notes = await Note.find({ userId })
            .select("title userId createdAt")
            .populate({
                path: "userId",
                select: "email"
            });

        res.status(200).json({
            message: "Notes retrieved successfully",
            notes
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving notes with user",
            error: error.message
        });
    }
};


// Aggregation
const aggregateNotes = async (req, res) => {
    try {
        const userId = req.query.id;
        const { title } = req.query;

        const matchStage = {
            userId: new mongoose.Types.ObjectId(userId)
        };

        if (title) {
            matchStage.title = {
                $regex: title,
                $options: "i"
            };
        }

        const notes = await Note.aggregate([
            {
                $match: matchStage
            },

            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },

            {
                $unwind: "$user"
            },

            {
                $project: {
                    _id: 1,
                    title: 1,
                    content: 1,
                    createdAt: 1,
                    userId: 1,
                    name: "$user.name",
                    email: "$user.email"
                }
            }
        ]);

        res.status(200).json({
            message: "Aggregation completed successfully",
            notes
        });

    } catch (error) {
        res.status(500).json({
            message: "Error running aggregation",
            error: error.message
        });
    }
};


// Delete All Notes
const deleteAllNotes = async (req, res) => {
    try {
        const userId = req.query.id;

        const result = await Note.deleteMany({
            userId
        });

        res.status(200).json({
            message: "All notes deleted successfully",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting notes",
            error: error.message
        });
    }
};


module.exports = {
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
};