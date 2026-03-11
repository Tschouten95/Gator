"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUser = setUser;
exports.readConfig = readConfig;
var fs_1 = require("fs");
var os_1 = require("os");
var path_1 = require("path");
console.log("config.ts is loading...");
function setUser(username) {
    var config = readConfig();
    config.currentUserName = username;
    writeConfig(config);
}
function readConfig() {
    var filePath = getConfigFilePath();
    var data = fs_1.default.readFileSync(filePath, "utf-8");
    var rawConfig = JSON.parse(data);
    return validateConfig(rawConfig);
}
function getConfigFilePath() {
    return path_1.default.join(os_1.default.homedir(), ".gatorconfig.json");
}
function writeConfig(cfg) {
    var rawConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName,
    };
    var data = JSON.stringify(rawConfig);
    var filePath = getConfigFilePath();
    fs_1.default.writeFileSync(filePath, data);
}
function validateConfig(rawConfig) {
    var config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name
    };
    return config;
}
