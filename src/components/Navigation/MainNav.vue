<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex items-center h-full text-xl"
        >
          {{ company }}
        </router-link>
        <nav class="h-full ml-12">
          <ul class="flex h-full p-0 m-0 list-none">
            <li
              v-for="(menuItem, index) in menuItems"
              :key="index"
              class="h-full ml-9 first:ml-0"
              data-test="main-nav-list-item"
            >
              <router-link
                :to="menuItem.url"
                class="flex items-center h-full py-2.5"
              >
                {{ menuItem.text }}
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="flex items-center h-full ml-auto">
          <profile-image v-if="isLoggedIn" data-test="profile-image" />
          <action-button
            v-else
            data-test="login-button"
            text="Sign In"
            @click="
              // NOTE: here we invoke it to fix failing test
              LOGIN_USER()
            "
          />
        </div>
      </div>
      <sub-nav v-if="isLoggedIn" data-test="subnav" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ActionButton from "@/components/Common/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import SubNav from "@/components/Navigation/SubNav.vue";
import { LOGIN_USER } from "@/store/constants";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "MainNav",
  components: { ActionButton, ProfileImage, SubNav },
  data() {
    return {
      company: "Google Careers",
      menuItems: [
        { text: "Teams", url: "/teams" },
        { text: "Locations", url: "/" },
        { text: "Life at Google Corp", url: "/" },
        { text: "How we hire", url: "/" },
        { text: "Students", url: "/" },
        { text: "Jobs", url: "/jobs/results" },
      ],
    };
  },
  computed: {
    headerHeightClass() {
      // to create separation from Hero section(component)
      return {
        "h-16": !this.isLoggedIn,
        "h-32": this.isLoggedIn,
      };
    },
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    ...mapMutations([LOGIN_USER]),
  },
});
</script>
