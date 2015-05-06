/**
 * 选择构建模式
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

var tasker = require('./tasker');

function mode(yeoman) {
    var done = yeoman.async();

    yeoman.prompt({
        type    : 'list',
        name    : 'projectMode',
        message : message.promptMessage('请选择你的模式：'),
        choices : conf.projectModeOptions,
        store   : true
    }, function(answers) {
        done((function() {
            /* istanbul ignore if */
            if (!answers) {
                mode(yeoman);
            } else {
                // TODO: 完善其他类型
                if (answers.projectMode !== 'static') {
                    helper.console.log(
                        message.notice('稍后添加[' + answers.projectMode + ']相关功能，默认设置回`static`模式。')
                    );
                    answers.projectMode = 'static';
                }
                yeoman.data.mode = answers.projectMode;
                tasker(yeoman);
            }
        }()));
    }.bind(yeoman));
}

module.exports = mode;
