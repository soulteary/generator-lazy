'use strict';

/**
 * 程序更新默认文案
 *
 * @const updateMsg
 * @type {string}
 */
var updateMsg = '发现程序新版本，请及时更新哟！';


/**
 * NPM仓库
 *
 * @const npmRegistry
 * @type {string}
 */
var npmRegistry = 'registry.npm.taobao.org';


/**
 * 更新时间为一天
 *
 * @const updateInterval
 * @type {number}
 */
var updateInterval = 86400;


/**
 * 返回一个混合后的对象
 * @param key
 * @param val
 * @returns {Array}
 */
function mix(key, val) {
    var result = [];
    /* istanbul ignore if  */
    if (key.length !== val.length) {
        return result;
    }
    for (var i = 0, j = val.length; i < j; i++) {
        result.push({
            name    : key[i],
            value   : val[i],
            checked : true
        });
    }
    return result;
}


/**
 * 项目模式列表
 *
 * @const ProjectName
 * @const ProjectMode
 */
var ProjectName = ['静态页面', '移动应用', '单页程序', '脚本插件', '浏览器插件'];
var ProjectMode = ['static', 'mobile', 'spa', 'js-plugin', 'chrome-extension'];


/**
 * 构建工具列表
 *
 * @const TaskRunnerName
 * @const TaskRunnerData
 */
var TaskRunnerName = ['gulp', 'grunt'];
var TaskRunnerData = ['gulp', 'grunt'];


/**
 * 选择CSS预编译器
 *
 * @const CssProcessorName
 * @const CssProcessorData
 */
var CssProcessorName = ['不使用', 'Less'];
var CssProcessorData = ['css', 'less'];


/**
 * 设置JS模块方案
 *
 * @const JsModuleName
 * @const JsModuleData
 */
var JsModuleName = ['不使用', 'AMD', 'CMD', 'UMD', 'CommonJS'];
var JsModuleData = ['js', 'amd', 'cmd', 'umd', 'commonjs'];


/**
 * 前端模板
 *
 * @const JsTemplateName
 * @const JsTemplateData
 */
var JsTemplateName = ['不使用', 'DoT', 'Mustache', 'Handlebars'];
var JsTemplateData = ['', 'dot', 'mustache', 'handlebars'];


/**
 * 测试框架
 *
 * @const TestFrameworkName
 * @const TestFrameworkData
 */
var TestFrameworkName = ['不使用', 'Mocha', 'QUnit', 'Jasmine'];
var TestFrameworkData = ['', 'mocha', 'qunit', 'jasmine'];


/**
 * 项目协议
 * @detail  http://choosealicense.com/licenses/
 *
 * @const ProjectLicensesName
 * @const ProjectLicensesData
 */
var ProjectLicensesName = [
    '不使用', 'Apache License 2.0', 'GNU General Public License v2.0', 'MIT License',
    'Artistic License 2.0', 'BSD 2-clause "Simplified" License', 'BSD 3-clause "New" or "Revised" License',
    'Creative Commons Zero v1.0 Universal', 'Eclipse Public License 1.0', 'GNU Affero General Public License v3.0',
    'GNU General Public License v3.0', 'GNU Lesser General Public License v2.1',
    'GNU Lesser General Public License v3.0', 'ISC License', 'Mozilla Public License 2.0', 'The Unlicense'
];
var ProjectLicensesData = [
    'no-license', 'Apache-v2', 'GPL-v2', 'MIT',
    'Artistic-v2', 'BSD-2', 'BSD-3',
    'cc0', 'epl-v1', 'agpl-v3',
    'GPL-v3', 'lgpl-v2', 'lgpl-v3',
    'isc', 'mpl-v2', 'unlicense'
];


module.exports = {
    projectModeOptions     : (function() {return mix(ProjectName, ProjectMode);}()),
    taskRunnerOptions      : (function() {return mix(TaskRunnerName, TaskRunnerData);}()),
    cssProcessorOptions    : (function() {return mix(CssProcessorName, CssProcessorData);}()),
    jsModuleOptions        : (function() {return mix(JsModuleName, JsModuleData);}()),
    jsTemplateOptions      : (function() {return mix(JsTemplateName, JsTemplateData);}()),
    testFrameworkOptions   : (function() {return mix(TestFrameworkName, TestFrameworkData);}()),
    projectLicensesOptions : (function() {return mix(ProjectLicensesName, ProjectLicensesData);}()),
    npmRegistry            : npmRegistry,
    updateMsg              : updateMsg,
    updateInterval         : updateInterval
};
