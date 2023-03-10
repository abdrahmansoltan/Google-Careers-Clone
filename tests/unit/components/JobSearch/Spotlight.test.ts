import Spotlight from "@/components/JobSearch/Spotlight.vue";
import { flushPromises, mount } from "@vue/test-utils";
import axios from "axios";

jest.mock("axios");
const axiosGetMock = axios.get as jest.Mock;

describe("Spotlight", () => {
  const mockSpotlightResponse = (data = {}) => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          img: "some image",
          title: "some title",
          description: "some description",
          ...data,
        },
      ],
    });
  };

  it("provides img attribute to parent component", async () => {
    const data = { img: "some imgae" };
    mockSpotlightResponse({ data });
    const wrapper = mount(Spotlight, {
      slots: {
        default: `
        <template #default="slotProps">
          <h1>{{slotProps.img}}</h1>
        </template>
        `,
      },
    });
    await flushPromises(); // for axios
    expect(wrapper.text()).toMatch("some image");
  });

  it("provides title attribute to parent component", async () => {
    const data = { title: "some title" };
    mockSpotlightResponse({ data });
    const wrapper = mount(Spotlight, {
      slots: {
        default: `
        <template #default="slotProps">
          <h1>{{slotProps.title}}</h1>
        </template>
        `,
      },
    });
    await flushPromises(); // for axios
    expect(wrapper.text()).toMatch("some title");
  });

  it("provides description attribute to parent component", async () => {
    const data = { description: "some description" };
    mockSpotlightResponse({ data });
    const wrapper = mount(Spotlight, {
      slots: {
        default: `
        <template #default="slotProps">
          <h1>{{slotProps.description}}</h1>
        </template>
        `,
      },
    });
    await flushPromises(); // for axios
    expect(wrapper.text()).toMatch("some description");
  });
});
