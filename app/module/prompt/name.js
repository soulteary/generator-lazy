/**
 * 设置项目名称
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

var author = require('./author');

function name(yeoman) {
    var done = yeoman.async();

    yeoman.prompt({
        type      : 'input',
        name      : 'projectName',
        message   : message.promptMessage('请选择程序名称'),
        'default' : yeoman.appname
    }, function(answers) {
        done((function() {
            var appName = String.prototype.trim.call(answers.projectName);
            /* istanbul ignore if */
            if (!helper.isCorrectProjectName(appName)) {
                name(yeoman);
            } else {
                yeoman.data.name = answers.projectName;
                author(yeoman);
            }
        }()));
    }.bind(yeoman));
}

module.exports = name;
