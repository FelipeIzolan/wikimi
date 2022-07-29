import readline from "readline";
import { stdin, stdout } from "process";

import type { Interface } from "readline";

type inputQuestion = string;
type inputAnswer = string;

function input(query: inputQuestion): Promise<inputAnswer> {
  return new Promise((res, rej) => {
    try {
      let rl: Interface = readline.createInterface(stdin, stdout);
      rl.question(query, answer => { 
        rl.close();
        res(answer);
      })
    } catch (err) { 
      rej(err); 
    }
  })
}

export default input;
export type {
  inputQuestion,
  inputAnswer
};
