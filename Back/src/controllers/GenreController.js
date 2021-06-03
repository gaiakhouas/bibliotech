import Genre from "../models/Genre";

export default class GenreController {

    //List of genres

    static async list(req, res) {
        let status = 200;
        let body = {};

        try {
            let genres = await Genre.find().select('-__v');
            body = {genres};
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'genres list',
                message: e.message || 'An error is occured into genres list',
            }
        }
        return res.status(status).json(body);
    }

    //Create Genre

    static async store(req, res) {
        let status = 200;
        let body = {};

        try {
            let genre = await Genre.create(req.body);
            body = {genre};
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'genres store',
                message: e.message || 'An error is occured into genres stores',
            }
        }
        return res.status(status).json(body);
    }

    //Update Genre

    static async update(req, res) {
        let status = 200;
        let body = {};

        try {
            let {id} = req.params;
            let genre = await Genre.findByIdAndUpdate(id, req.body, {new: true})
                .select('-__v');
            body = {genre};
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'genres update',
                message: e.message || 'An error is occured into genres update',
            }
        }
        return res.status(status).json(body);
    }

    //Remove Genre

    static async remove(req, res) {
        let status = 200;
        let body = {};

        try {
            let {id} = req.params;
            await Genre.findByIdAndDelete(id);
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'genres remove',
                message: e.message || 'An error is occured into genres remove',
            }
        }
        return res.status(status).json(body);
    }
}
