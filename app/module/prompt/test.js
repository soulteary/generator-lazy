/**
 * 选择测试框架
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

var licenses = require('./license');

/* istanbul ignore next: untestable */
module.exports = function(yeoman) {
    var done = yeoman.async();

    yeoman.prompt({
        type    : 'list',
        name    : 'testFramwork',
        message : message.promptMessage('请选择测试框架'),
        choices : conf.testFrameworkOptions,
        store   : true
    }, function(answers) {
        done((function() {

            // TODO: 完善其他类型
            if (answers.testFramwork !== '' || answers.testFramwork !== 'less') {
                helper.console.log(
                    message.notice('稍后添加[' + answers.testFramwork + ']相关功能，默认设置回`mocha`模式。')
                );
                answers.testFramwork = 'mocha';
            }

            yeoman.data.testFramework = {};
            yeoman.data.testFramework.type = answers.testFramwork;
            // enable仅为脚本使用
            yeoman.data.testFramework.enable = !!answers.testFramwork;
            licenses(yeoman);
        }()));
    }.bind(yeoman));
};
