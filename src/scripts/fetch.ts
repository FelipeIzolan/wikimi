import https from "https";

function fetch(url: string): Promise<any> {
  return new Promise((res, rej) => {
    https.get(url, response => {
      let data = "";
      try {
        response.on("data", chunk => data += chunk);
        response.on("end", () => res(JSON.parse(data)));
      } catch (err) { rej(err); }
    })
  })
}

export default fetch
