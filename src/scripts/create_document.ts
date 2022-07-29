import fs from "fs";
import docx from "docx";
import type { contentFragment } from "./format_content.js";

type documentTitle = string;
type documentContent = contentFragment[];

const { Document, Paragraph, TextRun, Packer, AlignmentType } = docx;

function createDocument(docTitle: documentTitle, docContent: documentContent): void {
	var title = new Paragraph({
    children: [ new TextRun({ text: docTitle.toUpperCase(), bold: true, size: 72 }) ],
    alignment: AlignmentType.CENTER
  })

	var content = []

	for (let i in docContent) {
		const fragment = docContent[i];
		const query = fragment.title.slice(0, fragment.title.indexOf(" "));
		let title = new TextRun({ text: "" });
		let text = new TextRun({ text: "\n" + fragment.text + "\n", size: 18 });

		switch(query) {
			case "====": title = new TextRun({ text: fragment.title.replaceAll("=", ""), size: 28 }); break
			case "===": title = new TextRun({ text: fragment.title.replaceAll("=", ""), size: 36 }); break
			case "==": title = new TextRun({ text: fragment.title.replaceAll("=", ""), size: 42 }); break
		}

		let paragraph = new Paragraph({
			children: [title, text],
			alignment: AlignmentType.CENTER
		});

		content.push(paragraph);
	}

  const document = new Document({ sections: [{ children: [title, ...content] }] });

  Packer.toBuffer(document)
    .then(buffer => fs.writeFileSync(`./src/${docTitle}.docx`, buffer))
}

export default createDocument;
export type {
  documentTitle,
  documentContent
};