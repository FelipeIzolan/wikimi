const searchURL = (query: string) => 
`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}`;

const contentURL = (query: string) => 
`https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&explaintext&titles=${query}&format=json`;

export {
  searchURL,
  contentURL
};
