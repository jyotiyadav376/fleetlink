// ✅ imports must be at the top
import { jest } from "@jest/globals";

const mockVehicleModel = { findById: jest.fn() };
const mockBookingModel = {
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
};

jest.unstable_mockModule("../../models/Vehicle.js", () => ({ default: mockVehicleModel }));
jest.unstable_mockModule("../../models/Booking.js", () => ({ default: mockBookingModel }));

// ✅ top-level await allowed in ESM
const { createBooking, getAllBookings, deleteBooking } = await import("../../services/bookingService.js");
const { default: AppError } = await import("../../utils/AppError.js");

describe("bookingService", () => {
  afterEach(() => jest.clearAllMocks());

  const mockVehicle = { _id: "vehicle123" };

  it("should create booking successfully", async () => {
    mockVehicleModel.findById.mockReturnValue({ lean: jest.fn().mockResolvedValue(mockVehicle) });
    mockBookingModel.findOne.mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });
    mockBookingModel.create.mockResolvedValue({ toObject: () => ({ _id: "b1" }) });

    const result = await createBooking({
      vehicleId: "vehicle123",
      fromPincode: "110001",
      toPincode: "110045",
      startTime: new Date(),
      endTime: new Date(),
      customerId: "cust1",
    });

    expect(result).toEqual({ _id: "b1" });
  });

  it("should throw error if vehicle not found", async () => {
    mockVehicleModel.findById.mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });

    await expect(
      createBooking({
        vehicleId: "invalid",
        startTime: new Date(),
        endTime: new Date(),
      })
    ).rejects.toThrow(AppError);
  });

  it("should throw conflict error if overlapping booking exists", async () => {
    mockVehicleModel.findById.mockReturnValue({ lean: jest.fn().mockResolvedValue(mockVehicle) });
    mockBookingModel.findOne.mockReturnValue({ lean: jest.fn().mockResolvedValue({ _id: "existing" }) });

    await expect(
      createBooking({
        vehicleId: "vehicle123",
        startTime: new Date(),
        endTime: new Date(),
      })
    ).rejects.toThrow(/already booked/);
  });

  it("should return all bookings", async () => {
    const mockBookings = [{ _id: "b1" }];
    mockBookingModel.find.mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValue(mockBookings),
    });

    const result = await getAllBookings();
    expect(result).toEqual(mockBookings);
  });

  it("should delete booking if exists", async () => {
    const mockBooking = { deleteOne: jest.fn() };
    mockBookingModel.findById.mockResolvedValue(mockBooking);

    await deleteBooking("b1");
    expect(mockBooking.deleteOne).toHaveBeenCalled();
  });

  it("should throw 404 if booking not found", async () => {
    mockBookingModel.findById.mockResolvedValue(null);
    await expect(deleteBooking("b1")).rejects.toThrow(/Booking not found/);
  });
});
