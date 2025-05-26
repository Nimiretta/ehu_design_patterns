export function prettifyOutput(data: Array<any>): string {
  return data.map((shape) => `${JSON.stringify(shape)}\n`).join('');
}
