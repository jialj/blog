<template>
	<div class="main">
    <bheader></bheader>
    <div class="content-box">
      <h1 class="title" v-html="cur_article.title">
      </h1>
      <div class="author">
        <img class="head-img" :src="cur_article.photo" width="38" height="38">
        <span v-text="'作者：'+cur_article.author"></span>
      </div>
      <article class="content" v-html="cur_article.content">
      </article>
    </div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import * as types from '../../store/types.js'
  import header from '../../components/header.vue'

	export default {
		name: 'readPage',
		data () {
			return {
        cur_article:{
          content:'',
          title:'',
          date:'',
          time:''
        }
			}
    },
    computed: mapState({
      article: (state) => {
        return state.article;
      }
    }),
		mounted(){
			this.initData()
		},
		methods: {
			initData() {
        let curId = this.$route.params.id
        this.$store.dispatch('article/'+ types.OPEN_CUR_ARTICLE, {id:curId}).then((data) => {
          this.cur_article = data
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
    background: #f5f7f9;
  }
  .content-box{
    margin: 15px auto;
    padding: 20px;
    width: 60%;
    max-width: 900px;
    background: #fff;
  }
  .title{
    margin: 20px 0 0;
    font-size: 34px;
    font-weight: 700;
    line-height: 1.3;
  }
  .author{
    margin: 30px 0 40px;
    line-height: 38px;
  }
  .head-img{
    margin-right: 10px;
    vertical-align: middle;
  }
  .content{
    line-height: 1.9;
    font-size: 16px;
    font-weight: 400;
    color: #2f2f2f;
    text-rendering: optimizeLegibility;
  }
</style>