import PdfPrinter from "pdfmake";
import { promisify } from "util";
import { pipeline } from "stream";

export const getPDFReadableStream = (profile, experiences) => {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  };

  const printer = new PdfPrinter(fonts);

  const docExperiences = [
    {
      text: `\n\n\nExperience: `,
      style: "header",
    },
  ].concat(
    ...experiences.map((exp) => [
      {
        text: `\n\n${exp.role}, ${exp.company}`,
        style: "subheader",
      },
      {
        text: `${exp.startDate.slice(0, 10)} - ${
          exp.startDate ? exp.startDate.slice(0, 10) : "Present"
        }`,
      },
    ])
  );

  const docDefinition = {
    content: [
      {
        text: `\n\n${profile.name} ${profile.surname}\n\n`,
        style: "header",
      },
      {
        text: `${profile.title}\n\n`,
        style: "subheader",
      },
      {
        text: `Email: ${profile.email}`,
      },
      {
        text: `Area: ${profile.area}`,
      },
      {
        text: `\n\nBio: ${profile.bio}`,
      },
    ].concat(docExperiences.length > 0 ? docExperiences : []),
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 15,
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
