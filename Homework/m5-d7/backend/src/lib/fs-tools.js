import fs from "fs-extra"; // 3rd party module
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

const filesJSONPath = join(dataFolderPath, "files.json");

export const getFiles = () => readJSON(filesJSONPath);
export const writeFiles = (content) => writeJSON(filesJSONPath, content);
