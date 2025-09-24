import { jest } from "@jest/globals";

// mock vehicleService module first
const mockVehicleService = {
  addVehicle: jest.fn(),
  findAvailableVehicles: jest.fn(),
};

jest.unstable_mockModule("../services/vehicleService.js", () => mockVehicleService);

// import after mocks
const vehicleController = await import("../controllers/vehicleController.js");

describe("vehicleController", () => {
  afterEach(() => jest.clearAllMocks());

it("should call addVehicle and return response", async () => {
  const mockReq = { body: { name: "Truck" } };
  const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  mockVehicleService.addVehicle.mockResolvedValue({ _id: "1", name: "Truck" });

  await vehicleController.addVehicle(mockReq, mockRes);

  expect(mockVehicleService.addVehicle).toHaveBeenCalledWith({ name: "Truck" });
  expect(mockRes.json).toHaveBeenCalledWith({
    success: true,
    data: { _id: "1", name: "Truck" },
  });
});

});
