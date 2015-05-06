/**
 * Generator Lazy
 *
 *
 * @desc    A generator for building front-end project.
 * @author  [@soulteary](soulteary@qq.com)
 * @website http://soulteary.com
 * @date    2015.07.01
 */
/* global module */

'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

    constructor : function() {

        yeoman.generators.Base.apply(this, arguments);

        this.option('skip-install', {
            desc : '跳过依赖安装。',
            type : Boolean
        });

        this.option('update', {
            desc : '检查程序是否有新版本可用。',
            type : Boolean
        });

        this.option('show-struct', {
            desc : '显示当前目录结构。',
            type : Boolean
        });

        this.option('with-configure', {
            desc : '根据配置代码直接生成项目。',
            type : String
        });

        this.option('with-profile', {
            desc : '根据配置文件直接生成项目。',
            type : Boolean
        });

    },


    /**
     * 程序初始化
     */
    initializing : function() {
        this.pkg = require('../package.json');
        this.switcher = {};
        this.data = {};
        // 开关:是否清理过目录
        this.switcher.hasCleanDir = null;

        // 如果存在默认配置文件或者参数传递了有效的配置文件，根据配置创建项目，退出程序
        /* istanbul ignore if */
        if (require('./module/build-with-config-file')(this)) {
            return true;
        }

        // 如果选择使用命令行直接构建，退出程序
        /* istanbul ignore if */
        if (require('./module/build-with-configure')(this)) {
            return true;
        }

        /**
         * 工具流程:
         *      - 检查程序是否需要更新
         *      - 重新准备项目目录
         *      - 如遇非空目录，再次和用户确认目录将会清空(*)
         *      - 设置项目名称
         *      - 设置项目作者信息
         *      - 设置项目描述信息
         *      - 选择构建模式
         *      - 设置构建工具
         *      - 设置CSS预编译器
         *      - 设置JS模块方案
         *      - 设置JS模板方案
         *      - 选择测试框架
         *      - 设置项目协议
         *      - 整理工具参数，选择构建使用的功能
         *      - 创建项目文件
         *      - 安装构建好的项目依赖
         *      - 显示 && 更新文档中当前项目结构信息
         */
        // 禁止重复初始化目录，开始向导模式
        /* istanbul ignore next */
        require('./module/pre-checker').start(this);
        // 构建完成后的事情
        /* istanbul ignore next */
        require('./module/after-build')(this);
    }

});
