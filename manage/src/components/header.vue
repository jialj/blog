<template>
	<div class="header-box">
		<header class="header container">
			<div class="logo">奔跑的蜗牛</div>
			<ul class="nav">
				<li class="bread">
					<router-link :to="'/index/main'">
					首页
					</router-link>
				</li>
			</ul>
		</header>
	</div>
</template>

<script>
	export default {
		name: 'theader',
		data: function() {
			return {
			}
		},
		methods:{
		},
		components:{
		}
	}
</script>
<style scoped>
	.header-box{
		width: 100%;
		background-color: #fff;
	}
	.header{
		display: flex;
		justify-content: space-between;
		color: #37827F;
		padding-bottom: 10px;
	}
	.logo{
		padding-top: 1.4rem;
		font-size: 32px;
	}
	.nav{
		list-style: none;
		margin: 0px;
	}
	.nav .bread{
		display: inline-block;
	}
	.nav .bread a{
		display: inline-block;
		padding: 35px 25px;
		color: #37827F;
		text-decoration: none;
}
	.nav .bread a.router-link-active{
		background-color: #37827f;
		color: #fff;
	}

	
</style>
