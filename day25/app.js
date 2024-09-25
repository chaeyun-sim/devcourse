const express = require('express');
const app = express();

const userRouter = require('./routes/user');
const channelRouter = require('./routes/channel');

app.use('/', userRouter);
app.use('/channels', channelRouter);

app.listen(7777);
