import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import { mount } from "@vue/test-utils";

describe("ProfileImage", () => {
  it("should render correctly", () => {
    const wrapper = mount(ProfileImage);
    expect(wrapper.exists()).toBe(true);
  });
});
