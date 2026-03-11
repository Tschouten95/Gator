import fs, { read, write } from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl: string,
    currentUserName?: string
}

export function setUser(username: string) {
    const config = readConfig();

    config.currentUserName = username;

    writeConfig(config)
}

export function readConfig(): Config {
    const filePath = getConfigFilePath();
    const data = fs.readFileSync(filePath, "utf-8")

    const rawConfig = JSON.parse(data);

    return validateConfig(rawConfig);
}

function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
    const rawConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName,
    }

    const data = JSON.stringify(rawConfig);
    const filePath = getConfigFilePath();

    fs.writeFileSync(filePath,data);
}

function validateConfig(rawConfig: any): Config {
    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name
    }

    return config
}