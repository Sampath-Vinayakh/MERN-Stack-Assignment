const Book = require("../models/book");

exports.getBooks = async (req, res) => {
  try {
    const { title, author, sortBy = "title", order = "asc", page = 1, limit = 10 } = req.query;

    const filter = {};
    if (title) filter.title = new RegExp(title, "i");
    if (author) filter.author = new RegExp(author, "i");

    const books = await Book.find(filter)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(filter);

    res.status(200).json({ total, books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, publicationYear, genre } = req.body;

    if (!title || !author || !publicationYear) {
      return res.status(400).json({ error: "Title, Author, and Publication Year are required." });
    }

    const newBook = new Book({ title, author, publicationYear, genre });
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, publicationYear, genre } = req.body;

    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title;
    if (author !== undefined) updatedFields.author = author;
    if (publicationYear !== undefined) updatedFields.publicationYear = publicationYear;
    if (genre !== undefined) updatedFields.genre = genre;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    if (!updatedBook) return res.status(404).json({ error: "Book not found" });

    res.status(200).json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};
