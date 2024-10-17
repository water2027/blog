<template>
	<VPLayout>
		<template #nav-bar-content>
			<div class="nav-bar">
				<div class="nav-links">
					<VPNavBar />
				</div>
				<div class="avatar">
					<img
						src="/icon-192x192.png"
						alt="Avatar"
					/>
				</div>
			</div>
		</template>
	</VPLayout>
</template>

<script setup>
import { VPLayout, VPNavBar } from 'vitepress/theme';
</script>

<style>
.nav-bar {
	display: flex;
	align-items: center;
}

.nav-links {
	flex-grow: 1;
}

.avatar img {
	width: 40px;
	height: 40px;
	border-radius: 50%;
}
</style>
