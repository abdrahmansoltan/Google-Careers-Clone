import getDegrees from "@/api/getDegrees";
import axios from "axios";

// Must be on the same scope as your `import` to be hoisted to the top of the file not the scope
jest.mock("axios"); // mock the axios object and all its methods as jest functions
const axiosGetMock = axios.get as jest.Mock;

describe("getDegrees", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          degree: "Master's",
        },
      ],
    });
  });

  it("fetches all possible degree requirements", async () => {
    await getDegrees();
    expect(axios.get).toHaveBeenCalledWith("http://my-fake-api.com/degrees");
  });

  it("extracts degrees from response", async () => {
    const data = await getDegrees();
    expect(data).toEqual([
      {
        id: 1,
        degree: "Master's",
      },
    ]);
  });
});
