import SignUpController from "./SignUpController";

jest.mock("undici", () => ({}));

describe("SignUpController", () => {
  let signUpController;

  beforeEach(() => {
    signUpController = new SignUpController();
  });

  it("should register a new user correctly", async () => {
    jest.setTimeout(1000000); // Increase timeout for this test

    const timestamp = Date.now();
    const mockData = {
      email: `test${timestamp}@gmail.com`,
      userName: `testUser${timestamp}`,
      password: "password@1223",
      profilePic: "",
      licenses: "",
      phone: "1234567890",
      userType: "buyer",
    };

    try {
      const response = await signUpController.registerUser(mockData);

      expect(response).toEqual("Successfully registered user");
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  it("should verify username correctly", async () => {
    const mockData = {
      userName: "testUser",
    };

    const errors = await signUpController.usernameVerify({}, mockData);

    expect(errors).toEqual({});
  });

  it("should verify password correctly", async () => {
    const mockData = {
      password: "testPassword@",
    };

    const errors = await signUpController.passwordVerify({}, mockData);

    expect(errors).toEqual({});
  });

  it("should verify email correctly", async () => {
    const mockData = {
      email: "test@test.com",
    };

    const errors = await signUpController.emailVerify({}, mockData);

    expect(errors).toEqual({});
  });

  it("should check if user exists correctly", async () => {
    const userName = "testUser";

    const userExists = await signUpController.checkIfUserExists(userName);

    expect(userExists).toEqual(false);
  });

  it("should check if email exists correctly", async () => {
    const email = "test@test.com";

    const emailExists = await signUpController.checkIfEmailExists(email);

    expect(emailExists).toEqual(false);
  });
});
