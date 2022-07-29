import input from "./src/scripts/input.js";
import fetch from "./src/scripts/fetch.js";
import createDocument from "./src/scripts/create_document.js";
import { searchURL, contentURL } from "./src/scripts/wikipedia_api.js";
import { formatContent } from "./src/scripts/format_content.js";
import type { documentTitle, documentContent } from "./src/scripts/create_document.js";

async function main(): Promise<void> {
	console.log(`
██╗    ██╗██╗██╗  ██╗██╗███╗   ███╗██╗
██║    ██║██║██║ ██╔╝██║████╗ ████║██║
██║ █╗ ██║██║█████╔╝ ██║██╔████╔██║██║
██║███╗██║██║██╔═██╗ ██║██║╚██╔╝██║██║
╚███╔███╔╝██║██║  ██╗██║██║ ╚═╝ ██║██║
╚══╝╚══╝ ╚═╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═╝
	`)

	var term: string = await input("Type a search term: ");
  var options: string[] = (await fetch(searchURL(term)))[1];
  
  if (options.length === 0) return console.log("No results found.");

	console.table(options)
  var optionIndex = Number(await input("Choose by index: "));
  var option = options[optionIndex];

  if (!option) return console.log("Invalid option.");

  fetch(contentURL(option))
    .then(data => {
      let page = data.query.pages;
      let pageId = Object.keys(page)[0];

      let title: documentTitle = page[pageId]["title"];
      let content: documentContent = formatContent(page[pageId]["extract"]);

      createDocument(title, content);
    })
};

main();
