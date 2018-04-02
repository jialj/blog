<template>
  <div class="article">
    <div class="addbtn" @click="addArticle()">
      <i class="el-icon-circle-plus-outline"></i>新建文章
    </div>
    <ul class="artlist">
      <li class="artlist-row"  v-for="item in article.article_list" :key="item.id" :label="item.title" v-bind:class="{ active: item.id == article.current_article.id }" @click="changeArticle(item)">
        <span class="article-title">
          <i class="el-icon-document"></i>
          {{item.title}}
        </span>
        <i v-if="item.id == article.current_article.id" class="article-delete-switch el-icon-delete" @click="deleteArticle()"></i>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import * as types from '../../store/types.js'
const root = 'article/';
export default {
	name: 't_article',
  data() {
    return {
      article_list: []
    }
  },
  computed: mapState({
    article: (state) => {
      return state.article;
    },
    current_collect(state) {
      return state.collect.current_collect
    }
  }),
  watch: {
    current_collect(){
      this.fetchList()
    }
  },
  mounted(){
    this.fetchList( this.$route.query )
  },
  methods: {
    onSubmit() {

    },
    fetchList(params) {
      const query = Object.assign({},params || {}, {collect_id:this.current_collect.id});
      this.fetchData(query)
    },
    fetchData(query) {
      this.$store.dispatch(root + types.ARTICLE_LIST,query).then((result) => {
        this.article_list = result;
      })
    },
    changeArticle(item) {
      this.$store.dispatch(root + types.CURRENT_ARTICLE,item)
    },
    addArticle(){
      let newArticle = {
        title: '无题',
        content: '',
        collect_id: this.current_collect.id      
      }
      this.$store.dispatch(root + types.ADD_ARTICLE,newArticle)
    },
    deleteArticle(){
      this.$confirm('确定删除此文章么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = Object.assign({},this.article.current_article)
        this.$store.dispatch(root + types.DELETE_ARTICLE,obj).then((result) => {
          if(result.status === 0){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else{
            this.$message({
              type: 'error',
              message: result.msg
            });
          }
        })
      }).catch(() => {
      });
      
    }
  },
}
</script>
<style scoped>
  ol, ul {
    list-style: none;
    margin: 0;  
    padding: 0; 
    border: 0;  
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  } 
  .brand{
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #4E96F7;
  }
  .addbtn{
    cursor: pointer;
    padding: 20px 0 20px 25px;
    border-bottom: 1px solid #d9d9d9;
  }
  .artlist-row{
    line-height: 75px;
    display: flex;
    justify-content: space-between; 
    border-left: 3px solid #fff;
    padding:0 10px 0 25px;
    cursor: pointer;
    border-bottom: 1px solid #d9d9d9;
  }
  .article-title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .artlist-row.active{
    background-color: #e6e6e6;
    border-left: 3px solid rgb(62, 145, 253);
  }
  .article-delete-switch{
    padding: 0 20px;
    line-height: 75px;
    font-size: 18px;
  }
  .article-delete-switch:hover{
    background-color: #fff;
  }
</style>
