const mockStd = {
  puts: jest.fn(),
  getenv: jest.fn(),
  exit: jest.fn(),
};

jest.mock("std", () => mockStd, { virtual: true });

import { send, success } from "./index";

describe("send", () => {
  it("should write default headers", () => {
    send("foo", { statusCode: 200, contentType: "application/json" });
    expect(mockStd.puts).toHaveBeenCalledWith("Status: 200 OK\r\n");
    expect(mockStd.puts).toHaveBeenCalledWith(
      "Content-Type: application/json\r\n"
    );
  });
});

describe("success", () => {
  describe("with defaults (no options)", () => {
    it("should set default headers", () => {
      success("foo");
      expect(mockStd.puts).toHaveBeenCalledWith("Status: 200 OK\r\n");
      expect(mockStd.puts).toHaveBeenCalledWith(
        "Content-Type: application/json\r\n"
      );
    });
  });
});
