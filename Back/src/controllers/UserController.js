import User from "../models/User";
import jsonwebtoken from 'jsonwebtoken';

export default class UserController {

    //User verification

    static async auth(req, res) {
        let status = 200;
        let body = {};

        try {
            let {email, password} = req.body;
            let user = await User.findOne({'email': email}).select('-__v');
            if (!user) {
                return res.status(422).send({ error: 'Invalid password or email' });
              }
            if (user && password === user.password) {

                //User is on DB

                let {JWT_SECRET} = process.env;

                let token = jsonwebtoken.sign({sub: user._id}, JWT_SECRET);
                if(token)
                body = {user, token};
            } else {
                status = 401;
                new Error('Unauthorized');
            }
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'User authentication',
                message: e.message || 'An error is occured into user auth',
            }
        }
        return res.status(status).json(body);
    }

    //Get List of Users

    static async list(req, res) {
        let status = 200;
        let body = {};

        try {

            //User recuperation

            let users = await User.find().select('-__v -password');
            body = {users};
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'User list',
                message: e.message || 'An error is occured into user list',
            }
        }
        return res.status(status).json(body);
    }

    //Detail of User

    static async details(req, res) {
        let status = 200;
        let body = {};

        try {
            let {id} = req.params;
            let user = await User.findById(id).select('-__v -password');
            body = {user};
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'User details',
                message: e.message || 'An error is occured into user details',
            }
        }
        return res.status(status).json(body);
    }

    //Create User

    static async store(req, res) {
        let status = 200;
        let body = {};

        try {
            let user = await User.create(req.body);
            body = {user};
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'User create',
                message: e.message || 'An error is occured into user create',
            }
        }
        return res.status(status).json(body);
    }

    //Update User

    static async update(req, res) {
        let status = 200;
        let body = {};

        try {
            let {id} = req.params;
            let user = await User.findByIdAndUpdate(id, req.body, {new: true})
                .select('-__v -password');
            body = {user};
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'User update',
                message: e.message || 'An error is occured into user update',
            }
        }
        return res.status(status).json(body);
    }

    //Remove User

    static async remove(req, res) {
        let status = 200;
        let body = {};

        try {
            let {id} = req.params;
            await User.findByIdAndDelete(id);
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error || 'User remove',
                message: e.message || 'An error is occured into user remove',
            }
        }
        return res.status(status).json(body);
    }
}
