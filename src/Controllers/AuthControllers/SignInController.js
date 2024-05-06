import UserEntity from "../../Backend/Entity/UserEntity";

class SignInController {
  constructor() {
    this.userEntity = new UserEntity();
  }

  async signInUser(email, password) {
    try {
      // Call the UserEntity method to sign in the user
      await this.userEntity.signInUser(email, password);

      // Return user information if needed
      return Promise.resolve("Successfully Logged In!");
    } catch (error) {
      console.error("Error signing in user:", error);
      return Promise.reject({
        error: "Could not register user. Please try again.",
      });
    }
  }
}

export default SignInController;
