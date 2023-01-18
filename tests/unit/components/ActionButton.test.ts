import ActionButton from "@/components/Common/ActionButton.vue";
import { mount } from "@vue/test-utils";

describe("ActionButton", () => {
  it("renders text", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "I'm clickable",
        type: "primary",
      },
    });
    expect(wrapper.text()).toMatch("I'm clickable");
  });

  it("applyies one of several styles to button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "I'm clickable",
        type: "primary",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("primary")).toBe(true);
  });
});
