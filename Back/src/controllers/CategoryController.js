import Category from "../models/Category";

export default class CategoryController {

    //List of Category

    static async list(req, res) {
        let status = 200;
        let body = {};

        try {
            let category = await Category.find().select('-__v');
            body = {category};
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'category list',
                message: e.message || 'An error is occured into category list',
            }
        }
        return res.status(status).json(body);
    }

    //Create Category

    static async store(req, res) {
        let status = 200;
        let body = {};

        try {
            let category = await Category.create(req.body);
            body = {category};
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'category store',
                message: e.message || 'An error is occured into category store',
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
            let category = await Category.findByIdAndUpdate(id, req.body, {new: true})
                .select('-__v');
            body = {category};
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'category update',
                message: e.message || 'An error is occured into category update',
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
            await Category.findByIdAndDelete(id);
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'category remove',
                message: e.message || 'An error is occured into category remove',
            }
        }
        return res.status(status).json(body);
    }
}
