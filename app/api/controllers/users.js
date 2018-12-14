const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


module.exports = {
    create: (req, res, next) => {
        console.log(req.body);
        let password = bcrypt.hashSync(req.body.password, saltRounds);
        userModel.create({ name: req.body.name, email: req.body.email, password: password },
            (err, result) => {
                console.log(err);
                if (err) {
                    next(err);
                }
                else {
                    res.json({ status: 'success', message: 'User Added', data: result });
                }
            })
    },

    authenticate: (req, res, next) => {
        userModel.findOne({ email: req.body.email }, (err, result) => {
            if (err) {
                next(err)
            }
            else {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    const token = jwt.sign({ id: result._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.json({ status: 'success', message: 'User Found', data: { user: result, token: token } });
                } else {
                    res.json({ status: 'error', message: 'invalid username/password.', data: null });
                }
            }
        })
    }
}