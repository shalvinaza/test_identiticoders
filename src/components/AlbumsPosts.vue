<template>
    <div class="container mt-5 mb-5">
        <h1 class="d-flex justify-content-center mb-4">{{getName}}'s Albums and Posts</h1>
        <nav aria-label="breadcrumb" class="mt-5 mb-4" style="cursor:pointer">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/" style="text-decoration:none">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Albums and Posts</li>
            </ol>
        </nav>

        <div class="d-flex flex-row align-items-center">
            <button class="btn btn-outline-warning me-2" @click="showPosts = false; fetchUserAlbum()">Show Album</button>
            <button class="btn btn-outline-warning" @click="showPosts =  true; fetchUserPosts()">Show Post</button>
        </div>
        <div v-show="!showPosts">
            <h5 class="mt-4">{{getName}}'s Albums</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="album in albums" :key="album.id">
                        <td>{{album.id}}</td>
                        <td>{{album.title}}</td>
                        <td style="cursor:pointer" @click="goToPhotos(album.id)"><a class="actionButton" style="text-decoration:none">Show Photos</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-show="showPosts">
            <h5 class="mt-4">{{getName}}'s Posts</h5>
            <div class="card mb-2" v-for="post in posts" :key="post.id">
                <div class="card-body">
                    <h6 class="card-title">{{post.title}}</h6>
                    <p class="card-text">{{post.body}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

const BASE_API_URL = 'https://jsonplaceholder.typicode.com'

export default {
    name: 'AlbumsPosts',
    data: () => ({
        albums: [],
        posts: [],
        showPosts : false
    }),
    computed:{
        getName: function(){
            return localStorage.getItem('user_name')
        }
    },
    mounted(){
        this.fetchUserAlbum();
    },
    methods: {
        fetchUserAlbum(){
            const userId = this.$route.params.userId;
            fetch(`${BASE_API_URL}/users/` + userId + '/albums')
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    this.albums = json
                });
        },
        fetchUserPosts(){
            const userId = this.$route.params.userId;
            fetch(`${BASE_API_URL}/users/` + userId + '/posts')
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    this.posts = json
                });
        },
        goToPhotos(albumId){
            const userId = this.$route.params.userId;
            this.$router.push({name: 'AlbumPhotos', params: {userId: userId, albumId: albumId}})
        }
    }


}
</script>

<style scoped>
.actionButton{
    color: blue;
}
.actionButton:hover{
    color: rgb(66, 66, 171);
}
</style>