import { puts, exit } from "std";
import { error, send, success } from "./index";

const putsMock = (<unknown>puts) as jasmine.Spy<typeof puts>;
const exitMock = (<unknown>exit) as jasmine.Spy<typeof exit>;

describe("send", () => {
  it("should write default headers", () => {
    send("foo", { statusCode: 200, contentType: "application/json" });
    expect(putsMock).toHaveBeenCalledWith("Status: 200 OK\r\n");
    expect(putsMock).toHaveBeenCalledWith("Content-Type: application/json\r\n");
  });
});

describe("success", () => {
  describe("with defaults (no options)", () => {
    beforeEach(() => {
      success("foo");
    });

    it("should set default headers", () => {
      expect(putsMock).toHaveBeenCalledWith("Status: 200 OK\r\n");
      expect(putsMock).toHaveBeenCalledWith(
        "Content-Type: application/json\r\n"
      );
    });

    it("should exit with 0", () => {
      expect(exitMock).toHaveBeenCalledWith(0);
    });
  });
});

describe("error", () => {
  describe("with defaults (no options)", () => {
    beforeEach(() => {
      error("foo");
    });

    it("should set default headers", () => {
      expect(putsMock).toHaveBeenCalledWith(
        "Status: 500 Internal Server Error\r\n"
      );
      expect(putsMock).toHaveBeenCalledWith(
        "Content-Type: application/json\r\n"
      );
    });

    it("should exit with 1", () => {
      expect(exitMock).toHaveBeenCalledWith(1);
    });
  });
});

describe("stringify", () => {
  describe("string", () => {
    it("should", () => {
      success("foo");
      expect(putsMock.calls.mostRecent().args).toEqual(["foo\r\n"]);
    });
  });

  describe("object", () => {
    it("should", () => {
      success({});
      expect(putsMock.calls.mostRecent().args).toEqual(["{}\r\n"]);
    });
  });

  describe("default", () => {
    it("should stringify numbers", () => {
      success(1);
      expect(putsMock.calls.mostRecent().args).toEqual(["1\r\n"]);
    });

    it("should stringify nul", () => {
      success(null);
      expect(putsMock.calls.mostRecent().args).toEqual(["null\r\n"]);
    });
  });
});
