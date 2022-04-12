import { open, popen } from "std";

export function run(command: string): string {
  const output = popen(command, "r");
  return output.readAsString().trim();
}

export function write(path: string, content: string): void {
  const file = open(path, "w");
  file.puts(content);
  file.close();
}

export function read(path: string): string | null {
  const file = open(path, "r");

  if (!file) {
    return null;
  }

  const content = file.readAsString();
  file.close();

  return content;
}
