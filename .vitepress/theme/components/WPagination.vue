<template>
	<div class="t-pagination">
		<button
			@click="changePage(currentPage - 1)"
			:disabled="currentPage === 1"
			class="pageButton"
		>
			{{ '<' }}
		</button>

		<span
			v-for="page in displayedPages"
			:key="page"
		>
			<button
				@click="changePage(page)"
				:class="{ active: page === currentPage }"
			>
				{{ page }}
			</button>
		</span>

		<button
			@click="changePage(currentPage + 1)"
			:disabled="currentPage === totalPages"
			class="pageButton"
		>
			{{ '>' }}
		</button>
	</div>
</template>

<script>
import { computed } from 'vue';

export default {
	name: 't-pagination',
	props: {
		modelValue: { type: Number, required: true },
		pageSize: { type: Number, required: true },
		total: { type: Number, required: true },
		size: { type: String, default: 'medium' },
		showPageSize: { type: Boolean, default: true },
	},
	emits: ['update:modelValue', 'update:pageSize', 'current-change'],
	setup(props, { emit }) {
		const totalPages = computed(() =>
			Math.ceil(props.total / props.pageSize)
		);

		const displayedPages = computed(() => {
			const range = 2;
			let start = Math.max(1, props.modelValue - range);
			let end = Math.min(totalPages.value, props.modelValue + range);

			if (end - start + 1 < range * 2 + 1) {
				if (start === 1) {
					end = Math.min(start + range * 2, totalPages.value);
				} else {
					start = Math.max(end - range * 2, 1);
				}
			}

			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		});

		const changePage = (page) => {
			if (
				page >= 1 &&
				page <= totalPages.value &&
				page !== props.modelValue
			) {
				emit('update:modelValue', page);
				emit('current-change', page);
			}
		};

		return {
			totalPages,
			displayedPages,
			changePage,
			currentPage: computed(() => props.modelValue),
		};
	},
};
</script>

<style scoped>
.t-pagination {
	display: flex;
	align-items: center;
	justify-content: center;
}

button {
	margin: 0 5px;
	padding: 3px 5px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: #d0d0d0;
	color: black;
	cursor: pointer;
}

button:hover{
	background-color:#fff;
}

button:disabled {
	cursor: not-allowed;
	opacity: 0.5;
}

button.active {
	background-color: var(--color-title);
	color: #fff;
}

.pageButton {
	/* 去除背景 */
	background-color: transparent;
	color:#fff;
	/* 去除边框 */
	border: none;
}
</style>
