/**
 * check update
 *
 * @desc    检查程序是否存在更新，修改自```cnpm - bin/cnpm-check```
 * @author  soulteary <soulteary@qq.com> (http://soulteary.com)
 *          fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

var urllib = require('urllib');
var chalk = require('chalk');
var exec = require('child_process').exec;
var conf = require('../common/conf');
var helper = require('../common/helper');
var message = require('../module/message');

/**
 * 检查程序是否需要更新
 *
 * @param params
 * @param callback
 */
function checkUpdate(params, callback) {
    var names = Object.keys(params.dependencies);
    // if any module has update
    var hasUpdate = false;
    var mustUpdate = false;

    var check = function(yoLazy, skipCheck) {
        var name;
        if (yoLazy) {
            name = params.name;
        } else {
            name = names.shift();
        }
        // if yoLazy need update, doesn't check others.
        /* istanbul ignore if */
        if (mustUpdate) {
            return callback(true, true, true);
        }
        // check every repo already
        if (!name) {
            /* istanbul ignore else */
            if (!skipCheck) {
                /* istanbul ignore else */
                if (hasUpdate) {
                    helper.console.log(message.notice(['\n', '程序有更新，建议更新: npm install -g generator-lazy', '\n']));
                } else {
                    helper.console.log('程序版本已是最新。');
                }
                // with internet check
                return callback(true, hasUpdate, mustUpdate);
            }
            // without internet check
            /* istanbul ignore next */
            return callback(false, hasUpdate);
        } else {
            if (skipCheck) {
                // without internet check
                /* istanbul ignore next */
                return callback(false, hasUpdate);
            }
        }

        var url = 'https://' + conf.npmRegistry + '/' + name + '/latest';
        urllib.request(url, {headers : {'user-agent' : 'cnpm-check'}},
            function(err, result) {
                var errmsg = '';
                /* istanbul ignore if */
                if (err) {
                    errmsg = err.message;
                } else {
                    try {
                        result = JSON.parse(result);
                    } catch (e) {
                        /* istanbul ignore next */
                        errmsg = '获取包信息错误' + err.message;
                        /* istanbul ignore next */
                        result = {};
                    }
                }
                /* istanbul ignore if */
                if (errmsg) {
                    helper.console.log('[' + message.fatal(name) + '] 检查版本时发生错误: ' + message.fatal(err.message));
                    return check();
                }

                var localVersion;
                if (yoLazy) {
                    localVersion = params.version;
                } else {
                    localVersion = String(params.dependencies[name] || '*');
                }
                var localVersionCheck = localVersion.replace(/^[^\.\d]+/g, '');
                var remoteVersion = result && result.version || 'unknow';
                if (remoteVersion !== localVersionCheck) {
                    hasUpdate = true;
                    /* istanbul ignore else */
                    if (yoLazy) {
                        /* istanbul ignore if */
                        if (localVersionCheck.replace(/\.\d+$/, '') !== remoteVersion.replace(/\.\d+$/, '')) {
                            mustUpdate = true;
                        }
                    }
                    if (!mustUpdate) {
                        helper.console.log(chalk.cyan.underline.bold('[' + name + ']') + ' ' + chalk.white('发现新版本: ') + chalk.green(remoteVersion) + chalk.white(', 当前版本: ') + chalk.yellow(localVersion) + chalk.white('.'));
                    }
                }
                check();
            });
    };

    exec('ping -c 1 ' + conf.npmRegistry, function(error) {
        if (error !== null) {
            // skip update check
            /* istanbul ignore next */
            return check(false, true);
        } else {
            helper.console.log(chalk.underline.bold.grey.bgBlack('[' + params.name + '] ') + chalk.grey.bgBlack('正在检查更新:'));
            // check version, include yoLazy
            return check(true);
        }
    });
}


module.exports = checkUpdate;
