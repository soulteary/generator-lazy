/**
 * 消息输出显示
 *
 *
 * @desc    A generator for building front-end project.
 * @author  [@soulteary](soulteary@qq.com)
 * @website http://soulteary.com
 * @date    2015.06.28
 */
/* global module */

'use strict';

var chalk = require('chalk');
var helper = require('../common/helper');

function toText(text) {
    switch (helper.type(text)) {
        case 'array':
            return text.join('\n');
        case 'string':
            return text;
    }
}

/* istanbul ignore next */
module.exports = {
    promptMessage : function(text) {
        return chalk.grey(toText(text));
    },
    warn :function(text) {
        return chalk.yellow.underline(toText(text));
    },
    error         : function(text) {
        return chalk.red(toText(text));
    },
    fatal : function(text) {
        return chalk.red.bold(toText(text));
    },
    notice : function(text) {
        return chalk.bold.bgGreen.white(toText(text));
    }
};
