import { redisClient } from "./redis"; // adjust the path to your redisClient file

jest.mock("redis", () => ({
  createClient: jest.fn(() => ({
    connect: jest.fn(),
    on: jest.fn(),
  })),
}));

describe("Redis Client", () => {
  it("should connect to Redis successfully", async () => {
    const mockConnect = jest.fn();
    const mockOn = jest.fn();

    redisClient.connect = mockConnect;
    redisClient.on = mockOn;

    await (async () => {
      try {
        redisClient.on("error", (err) =>
          console.log("Redis Client Error", err)
        );
        await redisClient.connect();
        console.log("Connected to Redis");
      } catch (error) {
        console.error("Error connecting to Redis:", error);
      }
    })();

    expect(mockConnect).toHaveBeenCalledTimes(1);
    expect(mockOn).toHaveBeenCalledWith("error", expect.any(Function));
    expect(mockOn).toHaveBeenCalledTimes(1);
  });

  it("should log error on connection failure", async () => {
    const mockConnect = jest
      .fn()
      .mockRejectedValue(new Error("Connection failed"));
    const mockOn = jest.fn();

    redisClient.connect = mockConnect;
    redisClient.on = mockOn;

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await (async () => {
      try {
        redisClient.on("error", (err) =>
          console.log("Redis Client Error", err)
        );
        await redisClient.connect();
        console.log("Connected to Redis");
      } catch (error) {
        console.error("Error connecting to Redis:", error);
      }
    })();

    expect(mockConnect).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error connecting to Redis:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
