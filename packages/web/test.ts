import { puts } from "std";
import { send, success } from "./index";

const putsMock = (<unknown>puts) as jasmine.Spy<typeof puts>;

describe("send", () => {
  it("should write default headers", () => {
    send("foo", { statusCode: 200, contentType: "application/json" });
    expect(putsMock).toHaveBeenCalledWith("Status: 200 OK\r\n");
    expect(putsMock).toHaveBeenCalledWith(
      "Content-Type: application/json\r\n"
    );
  });
});

describe("success", () => {
  describe("with defaults (no options)", () => {
    it("should set default headers", () => {
      success("foo");
      expect(putsMock).toHaveBeenCalledWith("Status: 200 OK\r\n");
      expect(putsMock).toHaveBeenCalledWith(
        "Content-Type: application/json\r\n"
      );
    });
  });
});
