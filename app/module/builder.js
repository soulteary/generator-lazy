/**
 * 项目构建模块
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
var pathPrefix = '../templates/';
var helper = require('../common/helper');

/* istanbul ignore next */
function mixPath(fileName) {
    return pathPrefix + fileName;
}

/* istanbul ignore next */
module.exports = function(yeoman, options) {

    var modeDir = options.mode + '/';

    // .editorconfig
    yeoman.template(mixPath('editorconfig'), '.editorconfig');
    // .gitattributes
    yeoman.template(mixPath('gitattributes'), '.gitattributes');
    // .gittgnore
    yeoman.template(mixPath('gitignore'), '.gitignore');
    // .jscsrc
    yeoman.template(mixPath('jscsrc'), '.jscsrc');
    // .jshintrc
    yeoman.template(mixPath('jshintrc'), '.jshintrc');
    // .npmignore
    yeoman.template(mixPath('npmignore'), '.npmignore');
    // package.json
    yeoman.template(mixPath(modeDir + '_package.json'), 'package.json');
    // README.md
    yeoman.template(mixPath('_README.md'), 'README.md');
    // js tasker
    switch (yeoman.data.tasker.type) {
        case 'gulp':
            yeoman.template(mixPath(modeDir + 'gulpfile.js'), 'gulpfile.js');
            break;
        case 'grunt':
            helper.console.log('grunt待稍后更新。');
            break;
    }
    // LICENSE
    yeoman.template(mixPath('licenses/' + options.license.type), 'LICENSE');

    switch (options.mode) {
        case 'static':
            yeoman.template(mixPath(modeDir + 'robots.txt'), 'robots.txt');
            /**
             ├── .gitignore      // git的忽略文件配置
             ├── Gulpfile.js     // gulp的任务配置
             ├── README.md       // 项目说明
             ├── asset           // build后的文件存放位置，与src的目录结构一致
             ├── demo            // 开发中的测试demo
             ├── doc             // 项目文档
             ├── package.json    // 项目package信息及依赖的模块信息配置
             └── src
                 ├── font        // 字体文件目录
                 ├── img         // 图片
                 ├── js
                 │   ├── common  // 通用可复用的组件基本功能，与业务无关(复杂功能可在里面再自建目录进行分类)
                 │   ├── conf    // 配置相关
                 │   ├── general // 与业务有关的组件功能或零碎的功能(复杂功能可在里面再自建目录进行分类)
                 │   ├── lib     //基础库和第三方库
                 │   ├── page    // 与页面对应的入口文件，加载general中实现的各业务功能
                 │   ├── tpl     // 模板文件
                 │   └── util    // 其它各零碎小功能
                 └── style       // 样式文件目录
                     ├── base
                     ├── icon
                     ├── page
                     ├── util
                     ├── view
                     └── widget
             */
            fs.mkdirSync('asset');
            fs.mkdirSync('demo');
            fs.mkdirSync('demo/asset');
            fs.mkdirSync('doc');
            fs.mkdirSync('src');
            fs.mkdirSync('src/fonts');
            fs.mkdirSync('src/img');
            fs.mkdirSync('src/js');
            fs.mkdirSync('src/js/common');
            fs.mkdirSync('src/js/conf');
            fs.mkdirSync('src/js/general');
            fs.mkdirSync('src/js/lib');
            fs.mkdirSync('src/js/page');
            fs.mkdirSync('src/js/tpl');
            fs.mkdirSync('src/js/util');
            fs.mkdirSync('src/style');
            fs.mkdirSync('src/style/base');
            fs.mkdirSync('src/style/icon');
            fs.mkdirSync('src/style/page');
            fs.mkdirSync('src/style/util');
            fs.mkdirSync('src/style/view');
            fs.mkdirSync('src/style/widget');

            // js lib: jquery
            switch (yeoman.data.js.jquery){
                case 1:
                    yeoman.template(mixPath('common/jquery-1.11.3.js'), 'src/js/lib/jquery-1.11.3.js');
                    break;
                case 2:
                    yeoman.template(mixPath('common/jquery-2.1.4.js'), 'src/js/lib/jquery-2.1.4.js');
                    break;
            }
            break;
        default :
            break;
    }
};
