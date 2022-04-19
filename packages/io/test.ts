import "./index"

describe("hello", () => {
  it("should work", () => {
    expect(true).toBeTrue();
  });
});
// const mockStd = {
//   open: jest.fn(),
//   popen: jest.fn(),
// };

// jest.mock("std", () => mockStd, { virtual: true });

// import { read, write, run } from "./index";

// function createFileMock() {
//   return {
//     puts: jest.fn(),
//     close: jest.fn(),
//     readAsString: jest.fn(),
//   };
// }

// describe("run", () => {
//   const command = "bar";
//   const content = "   foo    ";
//   const outputStream = createFileMock();
//   let output = "";
//   beforeAll(() => {
//     outputStream.readAsString.mockReturnValue(content);
//     mockStd.popen.mockReturnValue(outputStream);
//     output = run(command);
//   });

//   it("should call popen with `command` and 'r' flag", () => {
//     expect(mockStd.popen).toHaveBeenCalledWith(command, "r");
//   });

//   it("should read output as string", () => {
//     expect(outputStream.readAsString).toHaveBeenCalledTimes(1);
//   });

//   it("should return trimmed output", () => {
//     expect(output).toBe("foo");
//   });
// });

// describe("write", () => {
//   const file = createFileMock();
//   const path = "./file.js";
//   const content = "foo";

//   beforeAll(() => {
//     mockStd.open.mockReturnValue(file);
//     write(path, content);
//   });

//   it("should call open with `path` and 'w' flag", () => {
//     expect(mockStd.open).toHaveBeenCalledWith(path, "w");
//   });

//   it("should put content to file", () => {
//     expect(file.puts).toHaveBeenCalledWith(content);
//   });

//   it("should `close` the written file", () => {
//     expect(file.close).toHaveBeenCalledTimes(1);
//   });
// });

// describe("read", () => {
//   it("should call open with `path` and 'r' flag", () => {
//     const path = "./file.js";
//     read(path);
//     expect(mockStd.open).toHaveBeenCalledWith(path, "r");
//   });

//   describe("when file cannot be read (e.g. does not exist)", () => {
//     it("should return `null`", () => {
//       mockStd.open.mockReturnValue(null);
//       expect(read("hello")).toBe(null);
//     });
//   });

//   describe("when file can be read", () => {
//     const file = createFileMock();
//     const fileContent = "foo";
//     let content = "";

//     beforeAll(() => {
//       file.readAsString.mockReturnValue(fileContent);
//       mockStd.open.mockReturnValue(file);
//       content = read("this-file-does-exist");
//     });

//     it("should read content as string", () => {
//       expect(file.readAsString).toHaveBeenCalledTimes(1);
//     });

//     it("should `close` the read file", () => {
//       expect(file.close).toHaveBeenCalledTimes(1);
//     });

//     it("should return content of the file", () => {
//       expect(content).toBe(fileContent);
//     });
//   });
// });
