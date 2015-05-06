/**
 * 设置构建工具
 *
 *
 * @desc    A generator for building front-end project.
 * @author  [@soulteary](soulteary@qq.com)
 * @website http://soulteary.com
 * @date    2015.07.01
 */
/* global module */

'use strict';

var conf = require('../../common/conf');
var message = require('../message');
var helper = require('../../common/helper');

var cssProcessor = require('./pre-css');

function tasker(yeoman) {
    var done = yeoman.async();

    yeoman.prompt({
        type    : 'list',
        name    : 'taskerRunner',
        message : message.promptMessage('请选择构建工具'),
        choices : conf.taskRunnerOptions,
        store   : true
    }, function(answers) {
        done((function() {
            /* istanbul ignore if */
            if (!answers) {
                tasker(yeoman);
            } else {
                // TODO: 完善其他类型
                if (answers.taskerRunner !== 'gulp') {
                    helper.console.log(
                        message.notice('稍后添加[' + answers.taskerRunner + ']相关功能，默认设置回`gulp`模式。')
                    );
                    answers.taskerRunner = 'gulp';
                }
                yeoman.data.tasker = {};
                yeoman.data.tasker.type = answers.taskerRunner;
                cssProcessor(yeoman);
            }
        }()));
    }.bind(yeoman));
}

module.exports = tasker;
