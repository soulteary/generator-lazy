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

var helper = require('../common/helper');
var features = require('./set-features');
var builder = require('./builder');
var afterBuild = require('./after-build');

/* istanbul ignore next */
function tryDecodeByBase64(content) {
    return new Buffer(content, 'base64').toString();
}


module.exports = function(yeoman) {

    var configure = yeoman.options['with-configure'];
    var options;

    /* istanbul ignore if */
    if (configure) {
        /* istanbul ignore next */
        if (['static'].indexOf(configure) > -1) {

            options = {
                mode : configure
            };

            helper.mergeOption(yeoman.data, options);

            features(yeoman, yeoman.data);

            builder(yeoman, yeoman.data);

            afterBuild(yeoman);

            return true;

        } else {

            try {
                options = JSON.parse(tryDecodeByBase64(configure));
            } catch (e) {
                options = false;
                helper.console.log('该配置无法解析。');
            }

            if (options) {

                helper.mergeOption(yeoman.data, options);

                features(yeoman, yeoman.data);

                builder(yeoman, yeoman.data);

                afterBuild(yeoman);

                return true;

            } else {

                return false;

            }
        }
    } else {

        return false;

    }

};
