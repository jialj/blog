<template>
	<div class="main">
		<template v-if="!loginDialogVisible">
			<div class="collect-list">
				<collect></collect>
			</div>	
			<div class="article-list">
				<articleList></articleList>
			</div>	
			<div class="article-box">
				<button class="save-btn" type="button" @click="saveArticle()">保存</button>
				<input class="art-title" type="text" v-model="cur_article.title"  />
				<editor :content="cur_article.content" :z-index="1000" :auto-height="true" :show-module-name="false" @change="updateArticleContent"></editor>
			</div>
		</template>
		<el-dialog
			title="登录"
			:visible.sync="loginDialogVisible"
			width="35%"
			:close-on-click-modal = false
			:close-on-press-escape = false
			:show-close = false
			:before-close="handleClose" class="login-dialog">
			<p :class="['login-text',{ 'success': loginSuccess},{'danger': !loginSuccess }]">{{this.form.msg}}</p>
			<el-form ref="form" :model="form" >
				<el-form-item>
					<el-input v-model="form.user_name" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="form.password" placeholder="密码"></el-input>
				</el-form-item>
				<el-button :loading="isLogining" :disabled="isLogining" class="login-submit" type="primary" @click="login()">登录</el-button>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import fetch from '../../helpers/api.js'
	import * as types from '../../store/types.js'
	import {extend} from '../../helpers/utils'
	import { pager } from '../../helpers/config.js'
	import collect from './collect'
	import articleList from './articleList'
	import VueHtml5Editor from 'vue-html5-editor'

	const options = {
		language: "zh-cn",
	}
	const editor = new VueHtml5Editor(options)
	const root = 'article/';
	export default {
		name: 'myarticle',
		data () {
			return {
				cur_article: {},
				loginDialogVisible: true,
				form: {
					user_name:'',
					password:'',
					msg: ''
				},
				loginSuccess: false,
				isLogining: false
			}
		},
		mounted () {
			this.fetchData()	
		},
		computed: mapState({
			article(state){
				return state.article;
			},
			current_article(state){
				return state.article.current_article
			}
		}),
		watch: {
			current_article(){
				this.cur_article = Object.assign({},this.current_article)
			}
		},
		beforeMount(){
			this.validateLogin().then((login) => {
				if(login){
					this.fetchList( this.$route.query );
				}
			})
		},
		methods: {
			handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
			login() {
				console.log('this.form-- ', this.form)
				this.isLogining = true
				this.$store.dispatch('login/' + types.LOGIN,this.form).then((result) => {
					this.isLogining = false
					let login = result.data && result.data.login
					this.form.msg = result.msg
					this.loginSuccess = login
					this.loginDialogVisible = !login
					return login
				})
			},
			validateLogin(){
				return this.$store.dispatch('login/' + types.LOGIN_INDEX,{}).then((result) => {
					let login = result && result.data && result.data.login
					this.loginDialogVisible = !login
					return login
				})
			},
			fetchList(params) {
				const query = Object.assign({},this.$route.query,params || {});
				this.fetchData(query)
			},
			fetchData(query){
				this.$store.dispatch(root + types.ARTICLE_LIST,query).then((result) => {
					this.cur_article = Object.assign({},this.current_article)
				})
			},
			saveArticle(){
				let obj = Object.assign({},this.cur_article)
				this.$store.dispatch(root + types.UPDATE_ARTICLE,obj).then((result) => {
					if(result.status === 0){
						this.$message({
							message: '恭喜你，保存成功',
							type: 'success'
						});
					}else{
						this.$message({
							message: result.msg,
							type: 'warning'
						});
					}
				})
			},
			updateArticleContent: function (data) {
				this.cur_article.content = data
      },
		},
		components: {
			collect: collect,
			articleList: articleList,
			editor: editor
		}
	}
</script>

<style scoped>
.main{
	width: 100%;
	min-height: 100%;
	display: flex;
	align-items: stretch;
	color: #595959;
}
.collect-list{
	min-width: 200px;
	min-height: 100%;
  background-color: rgb(242, 240, 238);
}
.article-list{
	min-width: 250px;
	min-height: 100%;
	border-left: 1px solid rgb(219,219,219);
	border-right: 1px solid rgb(219,219,219)
}
.article-box{
	width: 100%;
	position: relative;
}
.save-btn{
	position: absolute;
	right: 20px;
	top: 20px;
	padding: 4px 12px;
	transition: all .2s cubic-bezier(.645,.045,.355,1);
	color: #ec7259;
	border: 1px solid #ec7259;
	border-radius: 15px;
	cursor: pointer;
}
.art-title{
	width: 100%;
	margin-top: 20px;
	padding: 0 80px 10px 40px;
	font-size: 30px;
	font-weight: 400;
	line-height: 30px;
	color: #595959;
}
.art-content{
	margin-top:20px;
	width: 100%;
	height: calc(100% - 90px);
	border: 1px solid #ccc;
	padding: 20px 80px 20px 40px;
	font-size: 18px;
}
.login-dialog{
	padding: 28px;
}
.login-submit{
	width: 100%;
}
.login-text{
	margin-top:-20px;
}
.login-text.success{
	color:#67C23A;
}
.login-text.danger{
	color: #F56C6C;
}
</style>