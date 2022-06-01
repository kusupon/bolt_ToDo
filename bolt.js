'use strict';
const bolt = require('@slack/bolt');
const dotenv = require('dotenv');
dotenv.config();
const todo = require('todo');

const app = new bolt.App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
    logLevel: 'debug'
});

app.message(/add (.+)/i, ({context, say}) => {
    const task = context.matches[1].trim();
    todo.add(task);
    say(`追加しました: ${task}`);
});

app.message(/done (.+)/i, ({context, say}) => {
    const task = context.matches[1].trim();
    todo.done(task);
    say(`完了にしました: ${task}`);
});

app.message(/del (.+)/i, ({context, say}) => {
    const task = context.matches[1].trim();
    todo.del(task);
    say(`削除しました: ${task}`);
});

app.message(/^list/i, ({context, say}) => {
    const list = todo.list();
    if (list.length === 0) {
        say('(TODOはありません)');
    } else {
    say(todo.list().join('\n'));
    }
});

app.message(/^donelist/i, ({context, say}) => {
    const donelist = todo.donelist();
    if (donelist.length === 0) {
        say('(完了したTODOはありません)');
    } else {
    say(todo.donelist().join('\n'));
    }
});

app.start();