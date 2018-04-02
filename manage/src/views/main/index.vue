<template>
	<div class="main">
		<bheader></bheader>
		<div class="content container">
			<div class="article-box">
				<article class="artlist-row"  v-for="item in article.open_article_list" :key="item.id" :label="item.title" v-bind:class="{ active: item.id == article.current_article.id }" >
					<router-link :to="'/index/read/'+item.id">
						<figure v-if="item.banner" class="article-banner">
							<img src="item.banner" />
						</figure>
						<div class="title">
							{{item.title}}
						</div>
						<ul class="article-detail">
							<li><i class="fa fa-calendar"></i>
								{{item.create_date}}
							</li>
							<li>
								<i class="fa fa-user" v-if="item.author"></i>
								{{item.author}}
								</li>
						</ul>
					</router-link>
				</article>
			</div>
			<div class="blog-derc">
				<div class="top-brief">最近关注：</div>
				<ul>
					<li class="recently">electrion客户端工具开发</li>
					<li class="recently">https,websocket协议</li>
					<li class="recently">node源码解读</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import * as types from '../../store/types.js'
	import header from '../../components/header.vue'

	const options = {
		language: "zh-cn",
	}
	export default {
		name: 'mainPage',
		data () {
			return {
			}
    },
    computed: mapState({
      article: (state) => {
        return state.article;
      }
    }),
		beforeMount(){
			this.fetchData()
		},
		methods: {
			fetchData() {
        this.$store.dispatch('article/'+types.OPEN_ARTICLE_LIST,{}).then((result) => {
          this.article_list = result;
        })
      }
		},
		components: {
			bheader: header
		}
	}
</script>

<style scoped>
	.main{
		margin: auto;
		background: #f5f7f9;
	}
	.content{
		padding-top: 35px;
		display: flex;
		align-items: flex-start;
	}
	.article-box{
		flex: 1;
		margin: 0 15px 0 0;
	}
	.artlist-row{
		background: #fff;
		border: 20px solid #fff;
		margin-bottom: 1.5rem;
	}
	.article-banner{
		margin: 0;
		height: 500px;
		overflow: hidden;
	}
	.article-banner img{
		height: 500px;
	}
	.article-detail{
		list-style: none;
		padding: 0;
		margin: 0;
		overflow: auto; 
		zoom: 1;
		color: #888;
		font-size: 12px;
	}
	.article-detail li{
		float: left;
		margin-left: 5px;
	}
	.article-detail li:first-child{
		margin-left: 0;
	}
	.article-detail li i{
		color: #37827F
	}
	.title{
		display: inline-block;
		margin-top: 1rem;
		color: #37827F;
		font-size: 24px;
		font-weight: 500;
	}
	.blog-derc{
		width: 250px;
		background-color:#fff;
	}
	.blog-derc .top-brief{
		padding: 7px 15px;
		background: #37827F;
		color: #fff;
	}
</style>