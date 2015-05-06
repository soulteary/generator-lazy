/**
 * 构建目录之后
 *
 *
 * @desc    A generator for building front-end project.
 * @author  [@soulteary](soulteary@qq.com)
 * @website http://soulteary.com
 * @date    2015.07.01
 */
/* global module, process */

'use strict';

var chalk = require('chalk');
var projectTree = require('./project-tree-info');

/* istanbul ignore next */
module.exports = function(yeoman) {

    if (yeoman.options['skip-install']) {
        console.log('安装之后，请手动执行: ' + chalk.cyan.bold('npm install'));
        return;
    }

    if (yeoman.switcher.hasCleanDir) {
        console.log(chalk.cyan('\n当前目录内容重建完成，请重新进入当前目录，例如: `cd ' + yeoman.switcher.hasCleanDir + '`'));
        console.log(chalk.cyan('如果需要更新README.md文件中的项目目录结构，请在重新进入当前目录后，输入: `yo lazy --save-project-struct`\n'));
    } else {
        process.on('exit', function() {
            projectTree(yeoman, true);
        });
    }
};
