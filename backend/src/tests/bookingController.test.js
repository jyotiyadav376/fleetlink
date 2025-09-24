import { jest } from "@jest/globals";

const mockBookingService = {
  createBooking: jest.fn(),
  getAllBookings: jest.fn(),
  deleteBooking: jest.fn(),
};

jest.unstable_mockModule("../services/bookingService.js", () => mockBookingService);

const bookingController = await import("../controllers/bookingController.js");

describe("bookingController", () => {
  afterEach(() => jest.clearAllMocks());

it("should call createBooking and return response", async () => {
  const mockReq = { body: { vehicleId: "1" } };
  const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  mockBookingService.createBooking.mockResolvedValue({ _id: "b1" });

  await bookingController.bookVehicle(mockReq, mockRes);

  expect(mockBookingService.createBooking).toHaveBeenCalled();
  expect(mockRes.json).toHaveBeenCalledWith({
    success: true,
    data: { _id: "b1" },
  });
});

});
