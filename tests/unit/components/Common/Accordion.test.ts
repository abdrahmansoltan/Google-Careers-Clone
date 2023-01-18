import Accordion from "@/components/Common/Accordion.vue";
import { mount } from "@vue/test-utils";

describe("Accordion", () => {
  const createConfig = (config = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: "Test Header",
    },
    slots: {
      default: "<h3>My nested child</h3>",
    },
    ...config,
  });
  it("renders child in slot", async () => {
    const wrapper = mount(Accordion, createConfig());

    expect(wrapper.text()).not.toMatch("My nested child");
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    expect(wrapper.text()).toMatch("My nested child");
  });

  describe("when we don't provide custom child component", () => {
    it("renders default content", async () => {
      const slots = {};
      const config = { slots };
      const wrapper = mount(Accordion, createConfig(config));

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      expect(wrapper.text()).toMatch("Whoops, somebody forgot to populate me!");
    });
  });
});
