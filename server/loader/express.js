const express = require('express');
const cors = require('cors');

const accountAPI = require('../api/account');
const mediaAPI = require('../api/media');
const userAPI = require('../api/user');
const passionAPI = require('../api/passion');
// const matchMakingAPI = require('../api/matchMaking');
// const chatAPI = require('../api/chat');

module.exports = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());    //parsing raw json
    app.use(express.urlencoded({ extended: true })); //parsing application/x-www-form-urlencoded

    //use route
    app.use('/account', accountAPI);
    app.use('/media', mediaAPI);
    app.use('/user', userAPI);
    app.use('/passion', passionAPI);
    // app.use('/matchMaking', matchMakingAPI);
    // app.use('/chat', chatAPI);

    //use front-end build
    // app.use(express.static(path.resolve(__dirname, '..', 'client/build')));
    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, '..','client/build', 'index.html'));
    // })

    return app;
}

