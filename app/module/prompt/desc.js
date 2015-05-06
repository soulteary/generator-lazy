/**
 * 设置项目描述信息
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

var mode = require('./mode');

module.exports = function(yeoman) {
    var done = yeoman.async();

    yeoman.prompt({
        type      : 'input',
        name      : 'projectDesc',
        message   : message.promptMessage('请输入项目的描述信息（可选）。'),
        'default' : '这里是项目的默认描述信息',
        store     : true
    }, function(answers) {
        done((function() {
            /* istanbul ignore else */
            if (answers.projectDesc) {
                yeoman.data.desc = answers.projectDesc.replace('\'', '');
            }
            mode(yeoman);
        }()));
    }.bind(yeoman));
};
