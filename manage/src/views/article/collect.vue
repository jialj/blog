<template>
  <div class="collect">
    <div class="brand">
      博客logo
    </div>
    <div class="addbtn" @click="showAddBtn()">
      <i class="el-icon-plus"></i>新建文集
    </div>
    <form v-bind:class="[{show_add_btn: show_add_btn},'add-collect-form']">
      <input class="add-collect-val" placeholder="请输入文集名" type="text" v-model="new_collect_name" />
      <button type="button" class="submit-collect" @click="addCollect()">确定</button>
      <button type="button" class="cancel-collect"  @click="cancelCollect()">收起</button>
    </form>
    <ul class="colist">
      <li class="colist-row" @click="changeCollect(item)" v-for="item in collect.collect_list" :key="item.id" :label="item.collect_name"  v-bind:class="{ active: item.id == cur_collect.id }" >
        <span class="colist-row-title" title="item.collect_name" >{{item.collect_name}}</span>
        <div  class="collect-set-switch" v-if="item.id == cur_collect.id" >
          <ul class="collect-setting">
            <li class="collect-setting-row" @click="editCollect()">
              <i class="el-icon-edit"></i>
            </li>
            <li class="collect-setting-row" @click="deleteCollect()">
              <i class="el-icon-delete"></i>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import * as types from '../../store/types.js'
const root = 'collect/';
export default {
	name: 't_collect',
  data() {
    return {
      show_add_btn: false,
      new_collect_name: '',
      cur_collect: {}
    }
  },
  computed: mapState({
    collect: (state) => {
      return state.collect;
    },
    current_collect: (state) => {
      return state.collect.current_collect;
    }
  }),
  watch: {
    current_collect(){
      this.cur_collect = Object.assign({},this.current_collect)
    }
  },
  beforeMount(){
    this.fetchList( this.$route.query );
  },
  methods: {
    showAddBtn(){
      this.show_add_btn = true
    },
    addCollect(){
      this.$store.dispatch(root + types.ADD_COLLECT,{collect_name: this.new_collect_name}).then((result) => {
        this.new_collect_name = ''
      })
    },
    cancelCollect(){
      this.show_add_btn = false
      this.new_collect_name = ''
    },
    changeCollect(item){
      this.$store.dispatch(root + types.CURRENT_COLLECT,item)
    },
    onSubmit() {
    },
    fetchList(params) {
      const query = Object.assign({},this.$route.query,params || {});
      this.fetchData(query)
    },
    fetchData(query){
      this.$store.dispatch(root + types.COLLECT_LIST,query).then((result) => {
        this.cur_collect = Object.assign({},this.current_collect)
      })
    },
    editCollect(){
      this.$prompt('请输入新名字', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[^\s]*$/,
        inputErrorMessage: '名称不能包含空格',
        inputValidator(value){
          return !!value
        },
      }).then(({ value }) => {
        let obj = Object.assign({},this.collect.current_collect)
        obj.collect_name = value
        this.$store.dispatch(root + types.UPDATE_COLLECT,obj)
        return true
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '修改失败'
        });       
      });
    },
    deleteCollect(){
      this.$confirm('文集下面的文章也会删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = this.collect.current_collect
        this.$store.dispatch(root+ types.DELETE_COLLECT, obj).then((result) => {
          if(result.state === 0){
            this.$message({
              type: 'success',
              message: '删除成功!'
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
    padding: 15px 0px 15px 15px;
  }
  .add-collect-form{
    display: none;
    padding: 0px 0px 15px 15px;
  }
  .show_add_btn{
    display: block;
  }
  .add-collect-val{
    width: 130px;
    padding: 8px;
    margin-bottom: 10px;
    display: block;
  }
  .submit-collect{
    padding: 4px 12px;
    transition: all .2s cubic-bezier(.645,.045,.355,1);
    color: #ec7259;
    border: 1px solid #ec7259;
    border-radius: 15px;
    cursor: pointer;
  }
  .cancel-collect{
    margin-left: 8px;
    padding: 4px 12px;
    color: #595959;
    border: 1px solid #595959;
    border-radius: 15px;
    cursor: pointer;
  }
  .colist-row{
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    font-size: 15px;
    border-left: 3px solid rgb(242, 240, 238);
  }
  .colist-row-title{
    height: 40px;
    line-height: 40px;
  }
  .collect-set-switch{
    line-height: 40px;
    padding: 0 8px;
    font-size: 18px;
  }
  .colist-row.active{
    background-color: #ccc;
    border-left: 3px solid #4E96F7;
  }
  .collect-setting-row{
    float: right;
    padding: 0 10px;
  }
  .collect-setting-row:hover{
    background-color: #fff;
  }
</style>
