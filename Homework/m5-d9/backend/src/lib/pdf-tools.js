import PdfPrinter from "pdfmake";
import { promisify } from "util";
import { pipeline } from "stream";
import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export const getPDFReadableStream = (data) => {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  };

  // const imgPath = join(
  //   process.cwd(),
  //   `./public/img/blogCover/${data.cover.split("/").pop()}`
  // );
  // console.log(imgPath);

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      // {
      //   image: data.cover,
      //   width: 500,
      // },
      {
        text: `\n\n${data.title}\n\n`,
        style: "header",
      },
      {
        text: data.text,
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
    },
    defaultStyle: {
      font: "Helvetica",
    },
  };

  const options = {
    // ...
  };

  const pdfReadableStream = printer.createPdfKitDocument(
    docDefinition,
    options
  );
  pdfReadableStream.end();

  return pdfReadableStream;
};

export const generatePDFAsync = async (data) => {
  const asyncPipeline = promisify(pipeline); // promisify is a (VERY COOL) tool which transforms a function that uses callbacks(error-first callbacks) into a function that uses Promises (and so Async/Await). Pipeline is a function that works with callbacks to connect 2 or more streams together --> I can promisify a pipeline, getting back an asynchronous pipeline

  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  };

  // const imgPath = join(
  //   process.cwd(),
  //   `./public/img/blogCover/${data.cover.split("/").pop()}`
  // );
  // console.log(imgPath);

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      {
        image: `public/img/blogCover/${data.cover.split("/").pop()}`,
        width: 500,
      },
      {
        text: `\n\n${data.title}\n\n`,
        style: "header",
      },
      {
        text: data.text,
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
    },
    defaultStyle: {
      font: "Helvetica",
    },
  };

  const options = {
    // ...
  };

  const pdfReadableStream = printer.createPdfKitDocument(
    docDefinition,
    options
  );
  pdfReadableStream.end();

  const path = join(dirname(fileURLToPath(import.meta.url)), "example.pdf");

  await asyncPipeline(pdfReadableStream, fs.createWriteStream(path));

  return path;
};

export const createTempPDF = (stream) => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("base64")));
  });
};
