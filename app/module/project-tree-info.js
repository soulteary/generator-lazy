/**
 * 获取构建后的目录树
 *
 *
 * @desc    A generator for building front-end project.
 * @author  [@soulteary](soulteary@qq.com)
 * @website http://soulteary.com
 * @date    2015.06.28
 */
/* global module, process */

'use strict';

var fs = require('fs');
var helper = require('../common/helper');
var tree = require('yes-tree');

module.exports = function(yeoman, updateFile) {
    var basePath = yeoman.options.env.cwd;
    process.chdir(basePath);
    if (fs.existsSync('README.md')) {
        var projectTree = tree({
                cwd     : basePath,
                depth   : 3,
                exclude : {
                    path       : ['.git', '.idea', 'node_modules'],
                    mode       : 'all',
                    extensions : ['.tmp']
                },
                json    : false
            }
        );

        if (yeoman.options['show-struct']) {
            console.log(projectTree);
        }

        if (updateFile || yeoman.options['save-project-struct']) {
            fs.writeFileSync('README.md', fs.readFileSync('README.md', 'utf8').replace('项目目录结构。', '```' + projectTree + '\n```\n'));
            helper.process.end();
        }
    }
};
