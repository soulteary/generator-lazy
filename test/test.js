/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('构建项目测试', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                done(err);
                return;
            }

            this.webapp = helpers.createGenerator('lazy:app', [
                '../../app', [
                    helpers.createDummyGenerator(),
                    'mocha:app'
                ]
            ]);
            this.webapp.options['skip-install'] = true;

            done();
        }.bind(this));
    });

    it('generator 允许被外部引用', function () {
        // not testing the actual run of generators yet
        this.app = require('../app');
    });

    it('项目通用文件', function (done) {
        var expected = [
            '.editorconfig',
            '.gitignore',
            '.jscsrc',
            '.jshintrc',
            'LICENSE',
            'package.json',
            'README.md'
        ];

        helpers.mockPrompt(this.webapp, {
            'projectName'       : 'test',
            'projectAuthor'     : 'yournickname <yournickname@email.com> (http://website.com)',
            'projectDescription' : '这里是项目的默认描述信息',
            'projectMode'       : 'static',
            'taskRunner'        : 'gulp',
            'cssProcessor'      : 'css',
            'jsModule'          : 'js',
            'testFramework'     : 'mocha',
            'projectLicenses'   : 'MIT'
        });

        // todo!
        this.webapp.run(function () {
            console.log(expected);
            //assert.file(expected);
            done();
        });
    });
});
