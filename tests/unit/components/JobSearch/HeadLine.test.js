import HeadLine from "@/components/JobSearch/HeadLine.vue";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

describe("HeadLine", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // it finds any of js-timer-functions calls and replace them with the jest-mock function
  });
  afterEach(() => {
    jest.useRealTimers(); // to undo using the fake timers from jest and returning to the native js-timers
  });

  it("displays intorductory action verb", () => {
    const wrapper = mount(HeadLine);
    const actionPhrase = wrapper.find("[data-test='action-phrase']");
    expect(actionPhrase.text()).toBe("Build for everyone");
  });

  it("changing action verb at a consistent interval", () => {
    jest.spyOn(global, "setInterval"); // as we just want to spy on the function and not use it
    mount(HeadLine);
    expect(setInterval).toHaveBeenCalled();
  });

  it("swaps action verb after first interval", async () => {
    const wrapper = mount(HeadLine);
    // move forward to the next interval
    jest.runOnlyPendingTimers(); // Executes only the macro-tasks that are currently pending (only the tasks that have been queued by setTimeout() or setInterval() up to this point)

    // now we have to tell the component (wrapper.vm) to refresh the DOM
    await nextTick(); // wait for the DOM updates
    const actionPhrase = wrapper.find("[data-test='action-phrase']");
    expect(actionPhrase.text()).toBe("Create for everyone");
  });

  it("removes interval when component disappear", () => {
    jest.spyOn(global, "clearInterval");
    const wrapper = mount(HeadLine);
    wrapper.unmount();
    expect(clearInterval).toHaveBeenCalled();
  });
});
