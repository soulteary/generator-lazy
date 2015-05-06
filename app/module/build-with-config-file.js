/**
 * 根据配置生成项目
 *
 *
 * @desc    A generator for building front-end project.
 * @author  [@soulteary](soulteary@qq.com)
 * @website http://soulteary.com
 * @date    2015.07.01
 */
/* global module */

'use strict';

var fs = require('fs');
var helper = require('../common/helper');
var features = require('./set-features');
var builder = require('./builder');
var path = require('path');
var afterBuild = require('./after-build');

module.exports = function(yeoman) {

    var configFile;
    // 如果用户选择根据指定路径的文件来初始化项目
    /* istanbul ignore if: untestable */
    if (yeoman.options['with-profile']) {
        configFile = path.resolve(yeoman.options['with-profile']);
    } else {
        configFile = [path.resolve('./'), 'lazy-config.json'].join('/');
    }
    // 优先读取当前目录下的Config.json
    /* istanbul ignore if: untestable */
    if (fs.existsSync(configFile)) {

        var options = helper.loadConifg(configFile);

        if (options) {

            helper.mergeOption(yeoman.data, options);

            features(yeoman, yeoman.data);

            builder(yeoman, yeoman.data);

            afterBuild(yeoman);
            return true;

        }else {

            return false;

        }

    }else {

        return false;

    }

};
