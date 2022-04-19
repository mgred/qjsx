import { popen, open } from "std";
import { run, write, read } from "./index";

const popenMock = (<unknown>popen) as jasmine.Spy<typeof popen>;
const openMock = (<unknown>open) as jasmine.Spy<typeof open>;

function createFileMock(content: string) {
  return jasmine.createSpyObj({
    puts: null,
    close: null,
    readAsString: content,
  });
}

describe("run", () => {
  const command = "bar";
  const outputStream = createFileMock("   foo    ");
  let output = "";

  beforeAll(() => {
    popenMock.and.returnValue(outputStream);
    output = run(command);
  });

  it("should call popen with `command` and 'r' flag", () => {
    expect(popenMock).toHaveBeenCalledWith(command, "r");
  });

  it("should read output as string", () => {
    expect(outputStream.readAsString).toHaveBeenCalledTimes(1);
  });

  it("should return trimmed output", () => {
    expect(output).toBe("foo");
  });
});

describe("write", () => {
  const path = "./file.js";
  const content = "foo";
  const file = createFileMock(content);

  beforeAll(() => {
    openMock.and.returnValue(file);
    write(path, content);
  });

  it("should call open with `path` and 'w' flag", () => {
    expect(openMock).toHaveBeenCalledWith(path, "w");
  });

  it("should put content to file", () => {
    expect(file.puts).toHaveBeenCalledWith(content);
  });

  it("should `close` the written file", () => {
    expect(file.close).toHaveBeenCalledTimes(1);
  });
});

describe("read", () => {
  it("should call open with `path` and 'r' flag", () => {
    const path = "./file.js";
    read(path);
    expect(openMock).toHaveBeenCalledWith(path, "r");
  });

  describe("when file cannot be read (e.g. does not exist)", () => {
    it("should return `null`", () => {
      openMock.and.returnValue(null);
      expect(read("this-file-does-not-exist")).toBe(null);
    });
  });

  describe("when file can be read", () => {
    const fileContent = "foo";
    const file = createFileMock(fileContent);
    let content = "";

    beforeAll(() => {
      openMock.and.returnValue(file);
      content = read("this-file-does-exist");
    });

    it("should read content as string", () => {
      expect(file.readAsString).toHaveBeenCalledTimes(1);
    });

    it("should `close` the read file", () => {
      expect(file.close).toHaveBeenCalledTimes(1);
    });

    it("should return content of the file", () => {
      expect(content).toBe(fileContent);
    });
  });
});
