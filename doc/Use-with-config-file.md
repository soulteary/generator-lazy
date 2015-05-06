## 使用配置文件构建项目

工具支持使用配置文件来生成项目。

### 从零开始构建项目

```
## 创建一个名为`example`的目录，并进入目录
mkdir example && cd example
## 创建一个配置文件: `lazy-config.json`
## 当然你也可以下载一份朋友或者团队同事设置好的配置文件
touch lazy-config.json
## 运行工具，工具会根据目录中的配置尝试构建项目
yo lazy
```

如果你不希望在项目中添加此配置文件，那么可以使用绝对路径来加载配置文件。

```
yo lazy --with-profile ~/lazy-config-for-static.json

```

### 配置文件说明

```
{
    "name": "your-project-name",  // 项目名称，命名遵守NPM规范
    "desc": "这里是项目的默认描述信息。",    // 项目描述信息
    "author": "yournickname <yournickname@email.com> (http://website.com)",  // 作者名称
    "build":{
        "mode" : "static",   // 构建模式
        "install" : true     // 项目构建完成后是否自动安装依赖
    },
    "license": {  // 协议配置内的子项如果不设置，默认使用全局配置
        "name": "your-project-name",
        "type": "MIT",
        "year": "2015",
        "author": "yournickname <yournickname@email.com> (http://website.com)",
        "desc": "这里是项目的默认描述信息。"
    },
    "css": {  // css 相关设置
        "type": "less" // 可选`less`|`sass`|`css`, 使用LESS作为预编译工具
    },
    "tasker": { // 项目使用的TASKER
        "type": "gulp"  // 可选`gulp`|`sass`，使用GULP
    },
    "template": { // JS 模板引擎
        "type": "doT"  // 可选`doT`|`lodash`，使用doT
    },
    "js": { // js 相关设置
        "module": "commonjs", // 模块化方法，可选值 false, amd, cmd, umd, commonjs
        "ver"   : "es5",      // 高于es5的版本将会使用降级处理
        "jquery": 1         // 使用jQuery，且使用v1版本，默认v2
    },
    "test": false // 稍后更新测试工具
}
```

### 复制粘贴试用的的配置

```
{
    "name": "your-project-name",
    "desc": "这里是项目的默认描述信息。",
    "author": "yournickname <yournickname@email.com> (http://website.com)",
    "build": {
        "mode": "static",
        "install": true
    },
    "license": {
        "name": "your-project-name",
        "type": "MIT",
        "year": "2015",
        "author": "yournickname <yournickname@email.com> (http://website.com)",
        "desc": "这里是项目的默认描述信息。"
    },
    "css": {
        "type": "less"
    },
    "tasker": {
        "type": "gulp"
    },
    "template": {
        "type": "doT"
    },
    "js": {
        "module": "commonjs",
        "jquery": 1 
    },
    "test": false
}
```