/// 调试desktop程序
var fs = require('fs');
const child_process = require('child_process');
var deleteFolder = require('./shared/hook-fs').deleteFolder;
var copyFile = require('./shared/hook-fs').copyFile;

// 删除www文件 ， 创建www文件夹 ，拷贝index.html到www文件夹
console.log('*** 清理缓存 ***');
let www_folder = 'www';
if (fs.existsSync(www_folder)) {
    deleteFolder(www_folder);
}
fs.mkdirSync(www_folder);
copyFile("src/index.html", "www/index.html");

try {
    var cdvResult = child_process.execSync('cordova platform').toString();
    if (/electron[\s\S]*Available/ig.test(cdvResult)) {
        console.log('*** 已经安装 electron ***');
    } else {
        console.log('*** 正在安装 electron ***');
        child_process.execSync('cordova platform add electron', { stdio: [0, 1, 2] });
    }
} catch (error) {
    console.log(error);
}

// 编译angular ng build
console.log('*** 执行编译 ng build ***');
child_process.execSync('ng run app:build --output-path=www', { stdio: [0, 1, 2] });

// 编译cordova
console.log('*** 启动调试 cordova run electron --nobuild ***');
try {
    child_process.execSync('cordova run electron --debug --verbose', { stdio: [0, 1, 2] });
} catch (error) {
    console.log('');
    console.info("\033[31m *** 运行失败，请查看错误描述信息 *** \033[0m");
    console.info("\033[31m *** 请确认你的安卓手机通过USB连接电脑，并已开启调试模式 *** \033[0m");
}
