import SignInController from "./SignInController";
import UserEntity from "../../Backend/Entity/UserEntity";
describe("SignInController", () => {
  let signInController;
  let mockSignInUser;

  beforeEach(() => {
    // Create a new mock function for the signInUser method
    mockSignInUser = jest.fn();
    UserEntity.prototype.signInUser = mockSignInUser;

    signInController = new SignInController();
  });

  it("should sign in Admin User correctly", async () => {
    const mockEmail = "firstAdmin@gmail.com";
    const mockPassword = "admin123@";

    // Set the mock implementation of the signInUser method
    mockSignInUser.mockResolvedValue({
      email: mockEmail,
    });

    const response = await signInController.signInUser(mockEmail, mockPassword);

    // Check if the signInUser method was called
    expect(mockSignInUser).toHaveBeenCalledWith(mockEmail, mockPassword);
  });

  it("should sign in Seller User correctly", async () => {
    const mockEmail = "secondSeller@gmail.com";
    const mockPassword = "aaaaaaaaa@";

    // Set the mock implementation of the signInUser method
    mockSignInUser.mockResolvedValue({
      email: mockEmail,
    });

    const response = await signInController.signInUser(mockEmail, mockPassword);

    // Check if the signInUser method was called
    expect(mockSignInUser).toHaveBeenCalledWith(mockEmail, mockPassword);
  });

  it("should sign in Buyer User correctly", async () => {
    const mockEmail = "secondBuyer@gmail.com";
    const mockPassword = "aaaaaaaa@";

    // Set the mock implementation of the signInUser method
    mockSignInUser.mockResolvedValue({
      email: mockEmail,
    });

    const response = await signInController.signInUser(mockEmail, mockPassword);

    // Check if the signInUser method was called
    expect(mockSignInUser).toHaveBeenCalledWith(mockEmail, mockPassword);
  });

  it("should sign in Real Estate Agent User correctly", async () => {
    const mockEmail = "thirdAgent@gmail.com";
    const mockPassword = "aaaaaaaa@";

    // Set the mock implementation of the signInUser method
    mockSignInUser.mockResolvedValue({
      email: mockEmail,
    });

    const response = await signInController.signInUser(mockEmail, mockPassword);

    // Check if the signInUser method was called
    expect(mockSignInUser).toHaveBeenCalledWith(mockEmail, mockPassword);
  });

  it("should throw an error when sign in fails", async () => {
    const mockEmail = "firstAdmi12n@gmail.com";
    const mockPassword = "admin12123@";

    // Set the mock implementation of the signInUser method
    mockSignInUser.mockRejectedValue(
      new Error("Could not register user. Please try again.")
    );

    await expect(
      signInController.signInUser(mockEmail, mockPassword)
    ).rejects.toEqual({
      error: "Could not register user. Please try again.",
    });
  });
});
