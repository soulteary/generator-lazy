/**
 * 项目构建模块
 *
 *
 * @desc    A generator for building front-end project.
 * @author  [@soulteary](soulteary@qq.com)
 * @website http://soulteary.com
 * @date    2015.06.28
 */
/* global module */

'use strict';

var conf = require('../common/conf');
var path = require('path');
/* istanbul ignore next: untestable */
module.exports = function(yeoman, options) {

    yeoman.data = yeoman.data || {};
    options = options || {};

    // 构建方式以及构建之后是否进行安装
    yeoman.data.mode = yeoman.data.mode || 'static';
    yeoman.data.install = yeoman.data.install || true;

    if (options.build) {
        if (options.build.mode) {
            yeoman.data.mode = options.build.mode;
        }
        if (options.build.install) {
            yeoman.data.install = options.build.install;
        }
    }

    // 处理当前项目名称
    yeoman.data.name = yeoman.data.name || path.basename(process.cwd());
    if (options.name) {
        yeoman.data.name = options.name;
    }

    // 处理项目描述
    yeoman.data.desc = yeoman.data.desc || '这里是项目的默认描述信息。';
    if (options.desc) {
        yeoman.data.desc = options.desc;
    }

    // 处理项目作者
    yeoman.data.author = yeoman.data.author || 'yournickname <yournickname@email.com> (http://website.com)';
    if (options.author) {
        yeoman.data.author = options.author;
    }

    // 协议相关
    yeoman.data.license = yeoman.data.license || {};
    yeoman.data.license.author = yeoman.data.license.author || yeoman.data.author;
    yeoman.data.license.name = yeoman.data.license.name || yeoman.data.name;
    yeoman.data.license.desc = yeoman.data.license.desc || yeoman.data.desc;
    yeoman.data.license.type = yeoman.data.license.type || 'MIT';
    yeoman.data.license.year = yeoman.data.license.year || (new Date()).getFullYear();
    if (options.license) {
        if (options.license.name) {
            yeoman.data.license.name = options.license.name;
        }
        if (options.license.author) {
            yeoman.data.license.author = options.license.author;
        }
        if (options.license.desc) {
            yeoman.data.license.desc = options.license.desc;
        }
        if (options.license.year) {
            yeoman.data.license.year = options.license.year;
        }
        if (options.license.type) {
            yeoman.data.license.type = options.license.type;
        }
        // 仅为脚本使用
        yeoman.data.license.fullName = conf.projectLicensesOptions
            .filter(function(item) {return (item.value === options.license.type);})[0].name;
    }

    // CSS
    yeoman.data.css = yeoman.data.css || {};
    yeoman.data.css.type = yeoman.data.css.type || 'css';
    if (options.css) {
        if (options.css.type) {
            yeoman.data.css.type = options.css.type;
        }
    }

    // Tasker
    yeoman.data.tasker = yeoman.data.tasker || {};
    yeoman.data.tasker.type = yeoman.data.tasker.type || 'gulp';
    if (options.tasker) {
        if (options.tasker.type) {
            yeoman.data.tasker.type = options.tasker.type;
        }
    }

    // Template
    yeoman.data.template = yeoman.data.template || {};
    yeoman.data.template.type = yeoman.data.template.type || 'doT';
    if (options.template) {
        if (options.template.type) {
            yeoman.data.template.type = options.template.type;
        }
    }

    // Test Framework
    yeoman.data.testFramework = yeoman.data.testFramework || {};
    yeoman.data.testFramework.type = yeoman.data.testFramework.type || 'mocha';
    if (options.testFramework) {
        if (options.testFramework.type) {
            yeoman.data.testFramework.type = options.testFramework.type;
        }
    }

    // JS Module
    yeoman.data.js = yeoman.data.js || {};
    yeoman.data.js.module = yeoman.data.js.module || 'commonjs';
    yeoman.data.js.ver = yeoman.data.js.ver || 'es5';
    if (options.js) {
        if (options.js.module) {
            yeoman.data.js.module = options.js.module;
        }
        if (options.js.ver) {
            yeoman.data.js.ver = options.js.ver;
        }
        if (options.js.jquery && [1, 2].indexOf(options.js.jquery) > -1) {
            yeoman.data.js.jquery = options.js.jquery;
        }
    }

};
