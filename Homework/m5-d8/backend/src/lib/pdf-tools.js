import PdfPrinter from "pdfmake";
import { join } from "path";

export const getPDFReadableStream = (data) => {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  };

  const imgPath = join(
    process.cwd(),
    `./public/img/blogCover/${data.cover.split("/").pop()}`
  );
  console.log(imgPath);

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

  return pdfReadableStream;
};
