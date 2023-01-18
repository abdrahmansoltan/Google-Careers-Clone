import HeaderContainer from "@/components/Common/HeaderContainer.vue";
import { mount } from "@vue/test-utils";

describe("HeaderContainer", () => {
  const createConfig = (config = {}) => ({
    slots: {
      title: "<h2>Some Title</h2>",
    },
    ...config,
  });

  it("allows parent component to provide title content", () => {
    const wrapper = mount(HeaderContainer, createConfig());
    expect(wrapper.text()).toMatch("Some Title");
  });

  it("allows parent component to provide subtitle content", () => {
    const slots = { subtitle: "<h2>Some SubTitle</h2>" };
    const config = { slots };
    const wrapper = mount(HeaderContainer, createConfig(config));
    expect(wrapper.text()).toMatch("Some SubTitle");
  });
});
