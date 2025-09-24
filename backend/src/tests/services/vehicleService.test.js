import { jest } from "@jest/globals";

// Mock Vehicle model
const mockVehicleModel = {
  find: jest.fn(),
  create: jest.fn(),
};

// Mock Booking model
const mockBookingModel = {
  aggregate: jest.fn(),
};

jest.unstable_mockModule("../../models/Vehicle.js", () => ({ default: mockVehicleModel }));
jest.unstable_mockModule("../../models/Booking.js", () => ({ default: mockBookingModel }));

const { findAvailableVehicles, addVehicle } = await import("../../services/vehicleService.js");

describe("vehicleService", () => {
  afterEach(() => jest.clearAllMocks());

  it("should create a new vehicle", async () => {
    mockVehicleModel.create.mockResolvedValue({ toObject: () => ({ _id: "v1", name: "Truck" }) });

    const result = await addVehicle({ name: "Truck" });
    expect(result).toEqual({ _id: "v1", name: "Truck" });
    expect(mockVehicleModel.create).toHaveBeenCalledWith({ name: "Truck" });
  });

  it("should return available vehicles if no overlaps", async () => {
    const mockVehicles = [{ _id: "1" }, { _id: "2" }];
    mockVehicleModel.find.mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockVehicles),
    });
    mockBookingModel.aggregate.mockResolvedValue([]);

    const result = await findAvailableVehicles({
      capacityRequired: 500,
      startTime: new Date(),
      endTime: new Date(),
    });

    expect(result).toEqual(mockVehicles);
  });

  it("should filter out vehicles with overlapping bookings", async () => {
    const mockVehicles = [{ _id: "1" }, { _id: "2" }];
    mockVehicleModel.find.mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockVehicles),
    });
    mockBookingModel.aggregate.mockResolvedValue([{ _id: "1" }]);

    const result = await findAvailableVehicles({
      capacityRequired: 500,
      startTime: new Date(),
      endTime: new Date(),
    });

    expect(result).toEqual([{ _id: "2" }]);
  });

  it("should return empty array if no vehicles match capacity", async () => {
    mockVehicleModel.find.mockReturnValue({
      lean: jest.fn().mockResolvedValue([]),
    });

    const result = await findAvailableVehicles({
      capacityRequired: 9999,
      startTime: new Date(),
      endTime: new Date(),
    });

    expect(result).toEqual([]);
  });
});
