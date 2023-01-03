import MainNav from "@/components/MainNav.vue";
import { mount } from "@vue/test-utils";

describe("MainNav", () => {
  it("displays company name", () => {
    const wrapper = mount(MainNav);
    expect(wrapper.text()).toMatch("Google Careers"); // check if this text is anywhere in the wrapper
  });

  it("displays menu items for navigation", () => {
    const wrapper = mount(MainNav);
    const navigationMenuItem = wrapper.findAll(
      "[data-test='main-nav-list-item']"
    );
    const navigationMenuTexts = navigationMenuItem.map((item) => item.text());
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Google Corp",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when user is logged out", () => {
    it("prompts user to sign in", () => {
      const wrapper = mount(MainNav);
      const loginButton = wrapper.find("[data-test='login-button'");
      expect(loginButton.exists()).toBe(true);
    });
  });

  describe("when user logs in", () => {
    it("displays user profile picture", async () => {
      const wrapper = mount(MainNav);
      let profileImage = wrapper.find("[data-test='profile-image'");
      expect(profileImage.exists()).toBe(false);

      const loginButton = wrapper.find("[data-test='login-button'");
      // this click action is asynchronous so we make it "async"
      await loginButton.trigger("click");

      // we must search for the element again as the wrapper was updated so that we won't ge the old reference
      profileImage = wrapper.find("[data-test='profile-image'");
      expect(profileImage.exists()).toBe(true);
    });
  });
});
