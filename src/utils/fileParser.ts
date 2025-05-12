import * as fs from 'fs';

export interface LineData {
  type: string;
  id: string;
  tokens: string[];
}

const LINE_FEED_REGEX = /\r?\n/;
const WHITESPACE_REGEX = /\s+/;

export class FileParser {
  static parseFile(path: string): LineData[] {
    const content = fs.readFileSync(path, 'utf-8');
    return content
      .split(LINE_FEED_REGEX)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('//'))
      .map((line) => {
        const codePart = line.split('//')[0].trim();
        return codePart;
      })
      .filter((l) => l)
      .map((line) => {
        const [type, id, ...tokens] = line.split(WHITESPACE_REGEX);
        return { type, id, tokens };
      });
  }
}
