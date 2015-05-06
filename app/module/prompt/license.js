/**
 * 选择项目协议
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
var features = require('../set-features');
var afterBuild = require('../after-build');
var builder = require('../builder');

/* istanbul ignore next: untestable */
function license(yeoman) {
    var done = yeoman.async();

    yeoman.prompt({
        type    : 'list',
        name    : 'licenseType',
        message : message.promptMessage('请选择项目协议'),
        choices : conf.projectLicensesOptions,
        store   : true
    }, function(answers) {
        done((function() {
            yeoman.data.license = {};
            yeoman.data.license.type = answers.licenseType;

            features(yeoman, yeoman.data);
            builder(yeoman, yeoman.data);
            afterBuild(yeoman);

        }()));
    }.bind(yeoman));
}

module.exports = license;
