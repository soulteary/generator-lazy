/* global module, process */

'use strict';

var fs = require('fs');

/**
 * 验证项目名称
 * @param name
 * @returns {boolean}
 */
function verifyProjectName(name) {
    return !name.match(/[\\\/:\?"<>\*]+/);
}


/**
 * 输出消息（log）
 * @param text
 * @returns {*}
 */
function log(text) {
    return console.log(text);
}


/**
 * 输出消息（info）
 * @param text
 * @returns {*}
 */
/* istanbul ignore next */
function info(text) {
    return console.info(text);
}


/**
 * 输出消息（error）
 * @param text
 * @returns {*}
 */
/* istanbul ignore next */
function error(text) {
    return console.error(text);
}


/**
 * 读取配置
 * @param path
 * @returns {boolean}
 */
/* istanbul ignore next */
function loadConfig(path) {
    try {
        return JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (e) {
        error(e.line, e.message);
        return false;
    }
}


/**
 * 合并配置项
 * @param src
 * @param dist
 */
/* istanbul ignore next */
function mergeOption(src, dist) {
    for (var option in dist) {
        if (dist.hasOwnProperty(option)) {
            src[option] = dist[option];
        }
    }
}


/**
 * 结束进程
 */
/* istanbul ignore next */
function exitProcess(message) {
    if (message) {
        log(message);
    }

    process.exit(1);
}


/**
 * 判断对象类型
 * @param object
 * @returns {string}
 */
function type(object) {
    return Object.prototype.toString.call(object).slice(8, -1).toLowerCase();
}


module.exports = {
    isCorrectProjectName : verifyProjectName,
    loadConifg           : loadConfig,
    mergeOption          : mergeOption,
    process              : {
        end : exitProcess
    },
    type                 : type,
    console              : {
        log   : log,
        info  : info,
        error : error
    }
};
