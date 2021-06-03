export default class Utils {

    /**
     * Request template
     */

    static async process(call, req, res) {
        let status = 200;
        let body = {};

        try {
            body = await call(req, res);
        } catch (e) {
            status = status !== 200 ? status : 500;
            body = {
                error: e.error,
                message: e.message,
            }
        }
        return res.status(status).json(body);
    }

    /**
     * Generate string random
     */

    static generateStringRandom() {
        return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
    }
}
