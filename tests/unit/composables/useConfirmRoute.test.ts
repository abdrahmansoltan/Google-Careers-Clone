import useConfirmRoute from "@/composables/useConfirmRoute";
import { useRoute } from "vue-router";

// mock out libraries to mock functions from them
jest.mock("vue-router");

const useRouteMock = useRoute as jest.Mock;

describe("ueConfirmRoute", () => {
  it("determines if page route matches specified route", () => {
    useRouteMock.mockReturnValue({ name: "Home" });
    const routeName = "Home";
    const result = useConfirmRoute(routeName);
    expect(result.value).toBe(true);
  });
});
