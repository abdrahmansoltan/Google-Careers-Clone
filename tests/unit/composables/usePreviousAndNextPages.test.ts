import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";

xdescribe("usePreviousAndNextPages", () => {
  it("calculates page before current one", () => {
    const currentPage = { value: 8 };
    const maxPage = { value: 10 };
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(previousPage).toBe(7);
  });

  describe("when current page is the first page", () => {
    it("doesn't provide previous page", () => {
      const currentPage = { value: 1 };
      const maxPage = { value: 10 };
      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(previousPage).toBeUndefined;
    });
  });

  it("calculates page after current one", () => {
    const currentPage = { value: 8 };
    const maxPage = { value: 10 };
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(nextPage).toBe(9);
  });

  describe("when current page is the last page", () => {
    it("doesn't provide next page", () => {
      const currentPage = { value: 1 };
      const maxPage = { value: 10 };
      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(nextPage).toBeUndefined;
    });
  });
});
