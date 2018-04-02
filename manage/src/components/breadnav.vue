<template>
	<div class="breadnav">
        <span class="breaditem" v-for="(item) in paths" :key="item.path">
            <router-link :to="{ path: item.path}">
                <span class="breaditem_text" v-text="item.meta.title"></span>
            </router-link>
            <span class="breaditem_separator">/</span>
        </span>
    </div>
</template>

<script>
    import { allRouters } from '../router/config.js'

    export default {
        beforeMount(){
            this.routerChange();
            this.$router.afterEach(route => {
                this.currentRoute =route;
            })
        },
        data(){
            return {
                paths:  [{
                        path: '/',
                        meta:{
                            title: '首页'
                        }
                    }],
                currentRoute: this.$router.currentRoute
            }
        },
        methods: {
            routerChange(){
                let path = this.currentRoute.path,
                    paths = path.split('/'),
                    letPath = [{
                        path: '/',
                        meta:{
                            title: '首页'
                        }
                    }],
                    pathAdd = '';
                for(let one of paths){
                    if( one !== ''){
                        pathAdd = pathAdd+"/"+one;
                        let findRoute = this.findRouter(pathAdd);
                        if( findRoute ){
                            let pa = findRoute.path;
                            findRoute.path = pa.startsWith("/") ? pa : "/"+pa;
                            letPath.push(findRoute);
                        }
                    }
                }
                this.paths.length = 0;
                this.paths = letPath;
                
                return this.paths;
            },
            findRouter( str ){
                for( let route of allRouters ){
                    let onePath = route.path;
                    if( !onePath.startsWith('/') ){
                        onePath = "/"+onePath;
                    }

                    if( str  === onePath ){
                        return route;
                    }
                }
                return;
            }
        },
        watch:{
            currentRoute(){
                this.currentRoute =this.$router.currentRoute;
                return this.routerChange();
            }
        }
    }
</script>

<style scoped>
    .breadnav{
        float: left;
        line-height: 63px;
        font-size: 14px;
    }
    .breadnav .breaditem_separator{
        color: #bfcbd9;
        padding: 0px 10px 0px 8px;
    }
    .breadnav .breaditem:last-child .breaditem_separator{
        display: none;
    }
    .breadnav .breaditem a{
        color: #fff;
        text-decoration: none;
    }
    .breadnav .breaditem a:hover{
        text-decoration: underline;
    }
</style>