/**
 * 执行之前的环境预检查
 *
 *
 * @desc    A generator for building front-end project.
 * @author  [@soulteary](soulteary@qq.com)
 * @website http://soulteary.com
 * @date    2015.06.30
 */
/* global module */

'use strict';

var exec = require('child_process').exec;
var fs = require('fs');
var helper = require('../common/helper');
var message = require('./message');
var updateChecker = require('./update-checker');

/**
 * 检查当前目录是否可以被初始化
 * @param yeoman
 */
function ableInit(yeoman) {
    var done = yeoman.async();
    var fileBaseDir = yeoman.options.env.cwd;

    fs.readdir(fileBaseDir, function(err, fileList) {
        /* istanbul ignore if: untestable */
        if (err) {
            helper.process.end(message.fatal('程序异常退出，请检查当前目录是否存在问题:' + err));
        }
        /* istanbul ignore if: untestable */
        if (fileList.length) {
            // 允许在空的git repo中初始化项目
            var whiteList = ['.git', '.gitkeeper', '.yo-rc.json', 'lazy-config.json', '*.iml', '.idea', '.svn'], checkResult = [];
            for (var i = 0, j = fileList.length; i < j; i++) {
                var pass = false;
                if (whiteList.indexOf(fileList[i]) > -1) {
                    pass = true;
                } else {
                    for (var m = 0, n = whiteList.length; m < n; m++) {
                        if (whiteList[m].indexOf('*') > -1) {
                            var regexp = whiteList[m].replace('.', '\\.').replace('*', '.*') + '$';
                            if (fileList[i].trim().match(new RegExp(regexp))) {
                                pass = true;
                            }
                        }
                    }
                }
                checkResult = checkResult.concat(pass);
            }
            if (checkResult.every(function(v) {return v === true;})) {
                updateChecker(yeoman);
            } else {
                yeoman.prompt({
                    type    : 'input',
                    name    : 'isForbidden',
                    message : message.promptMessage('generator-lazy需要一个洁净的目录，请重新选择目录，或者手动清理当前目录。')
                }, function() {
                    done((function() {
                        helper.process.end(message.warn('骚年，山水有相逢，等你选择好了目录再来执行`yo lazy`吧'));
                    }()));
                }.bind(yeoman));
            }
        } else {
            updateChecker(yeoman);
        }
    });
}

//TODO: 添加选项，允许覆盖
/* istanbul ignore next */
function reConfirmCleanDir(yeoman) {
    var done = yeoman.async();
    var fileBaseDir = yeoman.options.env.cwd;

    yeoman.prompt({
        type    : 'input',
        name    : 'needCleanDir',
        message : message.warn('请再次确认要清空目录[' + fileBaseDir + ']中的所有文件？(Y/N)')
    }, function(answers) {
        done((function() {
            var needClean = String.prototype.trim.call(answers.needCleanDir).toLowerCase();
            if (['y', 'n'].indexOf(needClean) > -1) {
                if ('n' === needClean) {
                    helper.process.end(message.warn('骚年，山水有相逢，等你选择好了目录再来执行`yo lazy`吧'));
                }
                exec('rm -rf ' + fileBaseDir, function(err) {
                    if (err) {
                        helper.process.end('清理文件时发生错误:' + message.fatal(err));
                    }
                    exec('mkdir ' + fileBaseDir + ' && cd ' + fileBaseDir, function(err) {
                        if (err) {
                            helper.process.end('重新创建目录时发生错误:' + message.fatal(err));
                        }
                        yeoman.hasCleanDir = fileBaseDir;
                        updateChecker(yeoman);
                    });
                });
            } else {
                reConfirmCleanDir(yeoman);
            }
        }()));
    }.bind(yeoman));
}

//TODO: 添加选项，允许覆盖
/* istanbul ignore next */
function prepareDir(yeoman) {
    var done = yeoman.async();
    var fileBaseDir = yeoman.options.env.cwd;

    fs.readdir(fileBaseDir, function(err, fileList) {
        if (err) {
            helper.process.end(message.fatal('程序异常退出，请检查当前目录是否存在问题:' + err));
        }
        if (fileList.length) {
            yeoman.prompt({
                type    : 'input',
                name    : 'needCleanDir',
                message : [message.promptMessage('generator-lazy需要一个洁净的目录，是否要清空当前目录'),
                    message.fatal('[' + fileBaseDir + ']'),
                    message.promptMessage('中的文件？(Y/N)')
                ].join('')
            }, function(answers) {
                done((function() {
                    var needClean = String.prototype.trim.call(answers.needCleanDir).toLowerCase();
                    if (['y', 'n'].indexOf(needClean) > -1) {
                        if ('n' === needClean) {
                            helper.process.end(message.warn('骚年，山水有相逢，等你选择好了目录再来执行`yo lazy`吧'));
                        }
                        reConfirmCleanDir(yeoman);
                    } else {
                        prepareDir(yeoman);
                    }
                }()));
            }.bind(yeoman));
        } else {
            updateChecker(yeoman);
        }
    });
}

module.exports = {
    ableInit          : ableInit,
    prepareDir        : prepareDir,
    reConfirmCleanDir : reConfirmCleanDir,
    start : ableInit
};
