/**
 * 设置JS模块方案
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

var jsTemplate = require('./js-tpl');

module.exports = function(yeoman) {
    var done = yeoman.async();

    yeoman.prompt({
        type    : 'list',
        name    : 'jsModule',
        message : message.promptMessage('请选择JS模块方案'),
        choices : conf.jsModuleOptions,
        store   : true
    }, function(answers) {
        done((function() {
            // TODO: 完善其他类型
            if (answers.jsModule !== '' || answers.jsModule !== 'commonjs') {
                helper.console.log(
                    message.notice('稍后添加[' + answers.jsModule + ']相关功能，默认设置回`commonjs`模式。')
                );
                answers.jsModule = 'commonjs';
            }
            yeoman.data.js = {};
            yeoman.data.js.module = answers.jsModule;
            jsTemplate(yeoman);
        }()));
    }.bind(yeoman));
};
