var express = require('express');
var router = express.Router();

var user_action = require('../action/user.action.js');

router.get('/', (req, res, next) => {
    res.render('user/index');
});

router.post('/register', (req, res, next) => {
    var param = {
        nickname: req.body.nickname,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
    };

    if (!param.nickname || !param.email || !param.mobile || !param.password) {
        return res.send('param nickname, email, mobile, password is required.');
    }

    user_action.register(param).then(rs => {
        return res.json(rs);
    }).catch(err => {
        return res.json(err);
    });
});

router.post('/login', (req, res, next) => {
    var param = {
        username: req.body.username,
        password: req.body.password
    };

    if (!param.username || !param.password) {
        return res.send('param username, password is required.');
    }

    user_action.login(param).then(rs => {
        res.session.userInfo = rs.content;
        return res.json(rs);
    }).catch(err => {
        return res.json(err);
    });
});

router.get('/:uid/detail', (req, res, next) => {
    console.log(req.sessionID);
    console.log(req.session);
    var uid = req.params.uid;

    if (!uid) {
        return res.send('no uid passed.');
    }

    return res.send('o');
    // user_action.getInfo({
    //     uid
    // }).then(rs => {
    //     return res.render('user/detail', rs.content);
    // }).catch(err => {
    //     return res.json(err);
    // });
});

module.exports = router;