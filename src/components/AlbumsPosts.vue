<template>
    <div class="container mt-5 mb-5">
        <h1 class="d-flex justify-content-center mb-4">{{getName}}'s Albums and Posts</h1>
        <nav aria-label="breadcrumb" class="mt-5 mb-4" style="cursor:pointer">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/" style="text-decoration:none">All Users</a></li>
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
                    <div>
                        <div class="d-flex flex-row align-items-center">
                            <h6 class="flex-grow-1 card-title">{{post.title}}</h6>
                            <button type="button" class="btn actionButton" style="cursor:pointer" @click="postEdit(post)"><i class="fa-regular fa-pen-to-square"></i>Edit Post</button>
                        </div>
                        <p class="card-text">{{post.body}}</p>
                    </div>
                </div>
            </div>
        </div>

        <Popup v-if="showPopup" popupTitle="Edit Post" @toggle-modal="toggleModal">
            <form @submit.prevent="updatePost">
                <label>Title</label>
                <input type="text" class="card-title d-flex w-100 ps-2 pe-2 mb-2" placeholder="Type the title here" v-model="post.title">
                <label>Body</label>
                <textarea type="text" class="card-text d-flex w-100 ps-2 pe-2" placeholder="Type the body here" v-model="post.body"></textarea>
                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-outline-primary mt-4">Update</button>
                </div>
            </form>
        </Popup>        
    </div>
</template>

<script>
import Popup from './Popup.vue'

const BASE_API_URL = 'https://jsonplaceholder.typicode.com'

export default {
    name: 'AlbumsPosts',
    components: {
        Popup
    },
    data: () => ({
        albums: [],
        posts: [],
        showPosts : false,
        showPopup: false,
        post: {
            id: '',
            title: '',
            body: '',
            userId: ''
        },
        updateMessage: ''
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
        },
        toggleModal(){
            this.showPopup = !this.showPopup;  
        },
        postEdit(post){
            this.showPopup = true;
            this.post.id = post.id;
            this.post.title = post.title;
            this.post.body = post.body;
            this.post.userId = post.userId;
        },
        updatePost(){
            try{
                fetch(`${BASE_API_URL}/posts/` + this.post.id, {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: this.post.id,
                        title: this.post.title,
                        body: this.post.body,
                        userId: this.post.userId
                    }),
                    headers: {
                        'Content-type' : 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => {
                        this.showPopup = false;
                        this.updateMessage = response.status;
                        alert('Update status : ' + this.updateMessage)
                        console.log(response);
                        response.json();
                    })
                    .then((json) => console.log(json));
            }catch(err){
                console.log(err)
            }
        }
    }


}
</script>

<style scoped>
.actionButton{
    color: grey;
}
.actionButton:hover{
    color: blue;
}
</style>