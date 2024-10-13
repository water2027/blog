<template></template>
<script setup>
import { useRouter } from "vitepress";

import { createSideBar } from "../utils/createSideBar";

const router = useRouter();

const sideBar = createSideBar();

const prefix = '/notes/';
const firstItemLink = sideBar[prefix][0].items[0].link;
router.go(firstItemLink);
</script>
<style scoped></style>