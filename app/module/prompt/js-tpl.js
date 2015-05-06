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

var test = require('./test');

function template(yeoman) {
    var done = yeoman.async();
    /* istanbul ignore next */
    yeoman.prompt({
        type    : 'list',
        name    : 'jsTpl',
        message : message.promptMessage('请选择JS模块方案'),
        choices : conf.jsTemplateOptions,
        store   : true
    }, function(answers) {
        done((function() {

            // TODO: 完善其他类型
            if (answers.jsTpl !== '' || answers.jsTpl !== 'doT') {
                helper.console.log(
                    message.notice('稍后添加[' + answers.jsTpl + ']相关功能，默认设置回`doT`模式。')
                );
                answers.jsTpl = 'doT';
            }

            yeoman.data.template = {};
            yeoman.data.template.type = answers.jsTpl;
            test(yeoman);
        }()));
    }.bind(yeoman));
}

module.exports = template;
