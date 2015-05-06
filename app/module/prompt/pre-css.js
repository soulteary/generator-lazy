/**
 * 设置CSS预编译器
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

var jsModule = require('./js-module');

module.exports = function(yeoman) {
    var done = yeoman.async();

    yeoman.prompt({
        type    : 'list',
        name    : 'cssProcessor',
        message : message.promptMessage('请选择CSS预编译器工具'),
        choices : conf.cssProcessorOptions,
        store   : true
    }, function(answers) {
        done((function() {

            // TODO: 完善其他类型
            if (answers.cssProcessor !== '' || answers.cssProcessor !== 'less') {
                helper.console.log(
                    message.notice('稍后添加[' + answers.cssProcessor + ']相关功能，默认设置回`less`模式。')
                );
                answers.cssProcessor = 'less';
            }

            yeoman.data.css = {};
            yeoman.data.css.type = answers.cssProcessor;
            jsModule(yeoman);
        }()));
    }.bind(yeoman));
};
