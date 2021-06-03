import Book from "../models/Book";
import fs from 'fs';
import Utils from "../utils/Utils";

export default class BookController {

    /**
     * Create Book
     */

    static async store(req, res) {
        let status = 200;
        let body = {};

        try {
            let book = await Book.create(req.body);
            body = {book};
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Book create',
                message: e.message || 'An error is occured into create book',
            }
        }
        return res.status(status).json(body);
    }

    /**
     * List of books
     */

    //Trier par genre ou categorie ?

    static async list(req, res) {
        return Utils.process(async (req, res) => {
            let {limit, skip} = req.query;
            let books;
            if (limit && skip) {
                books = await Book.find().populate('category').limit(parseInt(limit)).skip(parseInt(skip));
            } else {
                books = await Book.find().populate('category');
            }
            return {books};
        }, req, res);
    }

    /**
     * Get details of book
     */

    static async details(req, res) {
        return Utils.process(async (req, res) => {
            let book = await Book.findById(req.params.id).populate('category');
            return {book};
        }, req, res);
    }

    /**
     * Remove book and thumbnail
     */

    static async remove(req, res) {
        let status = 200;
        let body = {};

        try {
            let book = await Book.findByIdAndDelete(req.params.id);
            if (fs.existsSync(`./${book.thumbnail}`)) {
                await fs.unlinkSync(`./${book.thumbnail}`);
            }
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Remove book',
                message: e.message || 'An error is occured into book remove',
            }
        }
        return res.status(status).json(body);
    }

    /**
     * Update book
     */

    static async update(req, res) {
        let status = 200;
        let body = {};

        try {
            delete req.body.thumbnail;
            let book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
                .populate('category');
            body = {book};
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Update book',
                message: e.message || 'An error is occured into book updated',
            }
        }
        return res.status(status).json(body);
    }

    /**
     * Update thumnail of book
     */

    static async updateThumbnail(req, res) {
        let status = 200;
        let body = {};

        try {
            let book = await Book.findById(req.params.id);
            if (fs.existsSync(`./${book.thumbnail}`)) {
                await fs.unlinkSync(`./${book.thumbnail}`);
            }
            book.thumbnail = req.body.thumbnail;
            await book.save();
            body = {book};
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'Update book',
                message: e.message || 'An error is occured into book updated',
            }
        }
        return res.status(status).json(body);
    }
}
