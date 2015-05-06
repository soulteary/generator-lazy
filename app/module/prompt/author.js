/**
 * 设置项目作者信息
 *
 *
 * @desc    A generator for building front-end project.
 * @author  [@soulteary](soulteary@qq.com)
 * @website http://soulteary.com
 * @date    2015.07.01
 */
/* global module */

'use strict';

var message = require('../message');
var helper = require('../../common/helper');

var desc = require('./desc');

function author(yeoman) {
    var done = yeoman.async();

    yeoman.prompt({
        type      : 'input',
        name      : 'projectAuthor',
        message   : message.promptMessage([
            '请输入作者信息：',
            '参考格式：',
            '  yournickname <yournickname@email.com> (http://website.com)',
            '  或: yournickname <yournickname@email.com>',
            '  或: yournickname'
        ]),
        'default' : 'yournickname',
        store     : true
    }, function(answers) {
        done((function() {
            /* istanbul ignore else: untestable */
            if (answers && answers.projectAuthor) {
                var checkNick = answers.projectAuthor
                    .match(/([A-z0-9\.-]+)(\W<([A-z0-9\.-]+@[A-z0-9\.-]+\.[A-z0-9\.-]+)>\W\(.*\)?)?/);
                /* istanbul ignore else: untestable */
                if (checkNick && checkNick[1]) {
                    yeoman.data.author = checkNick[1];
                    desc(yeoman);
                } else {
                    helper.console.log(message.error('输入的信息有误，请检查后重新尝试。'));
                    author(yeoman);
                }
            } else {
                author(yeoman);
            }
        }()));
    }.bind(yeoman));
}

module.exports = author;
