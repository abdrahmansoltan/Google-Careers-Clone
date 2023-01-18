import { computed } from "vue";
import { useRoute } from "vue-router";

const currentPage = () => {
  const route = useRoute();
  return computed(() => Number.parseInt((route.query.page as string) || "1"));
};

export default currentPage;
