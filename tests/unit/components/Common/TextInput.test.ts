import TextInput from "@/components/Common/TextInput.vue";
import { mount } from "@vue/test-utils";

describe("TextInput", () => {
  it("communicates that user has entered character", () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: "",
      },
    });
    const input = wrapper.find("input");
    input.setValue("Engi");
    input.setValue("eer");
    const message = wrapper.emitted()["update:modelValue"]; // array of arrays with all emitted values from the key: "update:modelValue"
    expect(message).toEqual([["Engi"], ["eer"]]);
  });
});
