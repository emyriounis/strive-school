import fs from "fs-extra"; // 3rd party module
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile, createReadStream } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const authorsPublicFolderPath = join(
  process.cwd(),
  "./public/img/authorAvatar"
);
const blogPostsPublicFolderPath = join(process.cwd(), "./public/img/blogCover");

const authorsJSONPath = join(dataFolderPath, "authors.json");
const blogPostsJSONPath = join(dataFolderPath, "blogPosts.json");
const commentsJSONPath = join(dataFolderPath, "comments.json");

export const getAuthors = () => readJSON(authorsJSONPath);
export const writeAuthors = (content) => writeJSON(authorsJSONPath, content);
export const getBlogPosts = () => readJSON(blogPostsJSONPath);
export const writeBlogPosts = (content) =>
  writeJSON(blogPostsJSONPath, content);
export const getComments = () => readJSON(commentsJSONPath);
export const writeComments = (content) => writeJSON(commentsJSONPath, content);

export const saveAuthorsAvatars = (fileName, contentAsABuffer) =>
  writeFile(join(authorsPublicFolderPath, fileName), contentAsABuffer);
export const saveBlogPostsCover = (fileName, contentAsABuffer) =>
  writeFile(join(blogPostsPublicFolderPath, fileName), contentAsABuffer);

export const getBooksReadableStream = () => createReadStream(booksJSONPath);
