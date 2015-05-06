/**
 * 更新检查
 *
 *
 * @desc    A generator for building front-end project.
 * @author  [@soulteary](soulteary@qq.com)
 * @website http://soulteary.com
 * @date    2015.06.30
 */
/* global module */

'use strict';

var chalk = require('chalk');
var conf = require('../common/conf');
var name = require('./prompt/name');

/* istanbul ignore next: untestable */
function helpComment() {
    /**
     * Generator Lazy v{version}
     * > {update}
     * > More Help: yo lazy --help
     * > 程序启动: {date}
     */
}

module.exports = function(yeoman) {
    var helpDoc = helpComment
        .toString().split('\n')
        .map(function(item) {return String.prototype.trim.call(item).replace(/^\*\W?/, '');})
        .slice(2, -2).join('\n')
        .replace('{version}', yeoman.pkg.version)
        .replace('{date}', (new Date()).toLocaleTimeString().match(/[0-9:]+/));

    var lastCheck  = yeoman.config.get('update-check'),
        updateText = conf.updateMsg;

    /* istanbul ignore if: untestable */
    if (yeoman.options.update) {
        lastCheck = false;
    }
    var lastCheckTime = (new Date()).valueOf() - (new Date(lastCheck)).valueOf();
    /* istanbul ignore if: untestable */
    if (lastCheck && (lastCheckTime < conf.updateInterval)) {
        if (!yeoman.config.get('has-new-version')) {
            updateText = '';
        }
        console.log(helpDoc.replace('{update}', updateText));
        name(yeoman);
    } else {
        var checkUpdate = require('../tools/check-update');
        checkUpdate(yeoman.pkg, function(hasCheckInternet, hasNewVersion, appMustUpdate) {
            /* istanbul ignore else: untestable */
            if (hasCheckInternet) {
                yeoman.config.set('update-check', (new Date()).valueOf());
                /* istanbul ignore if: untestable */
                if (hasNewVersion) {
                    yeoman.config.set('has-new-version', true);
                    if (appMustUpdate) {
                        // app must update
                        console.log(chalk.cyan.underline.bold('程序有较大变化，建议输入以下命令立即更新程序:'));
                        console.log(chalk.red.bold('npm install -g yo-lazy'));
                        console.log(chalk.gray.bgBlack('\n如果使用npm更新时发生网络错误，请尝试使用cnpm:'));
                        console.log(chalk.gray.bgBlack('\tnpm install -g cnpm --registry=http://registry.npm.taobao.org'));
                        console.log(chalk.gray.bgBlack('\tcnpm install -g yo-lazy'));
                        process.exit(1);
                    }
                } else {
                    yeoman.config.set('has-new-version', false);
                    updateText = '';
                }
                yeoman.config.forceSave();
            } else {
                updateText = '检查程序最新版本失败。';
            }
            yeoman.log(helpDoc.replace('{update}', updateText));
            name(yeoman);
        });
    }
};
