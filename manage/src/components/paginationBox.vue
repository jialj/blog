<template>
	<div class="paginationbox">
	  <slot>
		  	<el-pagination
				@size-change="(pagenum) => handleChangePage({pagenum})"
				@current-change="(page) => handleChangePage({page})"
				:current-page="currentPage"
				:page-sizes="pageSizes"
				:page-size="pageSize"
				:total="total" layout="total, sizes, prev, pager, next, jumper">
			</el-pagination>
	  </slot> 
	</div>
</template>

<script>
	import {pager} from '../helpers/config.js'
	export default {
		props: ['total'],
		data(){
			return {
				pageSizes: pager.sizes
			};
		},
		computed: {
			currentPage(){
				const query = this.$route.query || {};
				return parseInt(query.page || 1, 10);
			},
			pageSize(){
				const query = this.$router.query || {};
				return parseInt(query.pagenum || pager.size,10);
			}
		},
		methods: {
			handleChangePage(pager){
				this.$router.push({
					query: Object.assign({},this.$route.query,pager)
				});
				this.$emit('changePage',pager);
			}
		}
	}
</script>

<style scoped>
    .paginationbox{
        padding: 12px;
        text-align: right;
    }
</style>