<template>
    <div class="container mt-5 mb-5">
        <h1 class="d-flex justify-content-center mb-4">{{albumTitle}}'s Photos</h1>
        <nav aria-label="breadcrumb" class="mt-5 mb-4" style="cursor:pointer">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href='/' style="text-decoration:none">All Users</a></li>
                <li class="breadcrumb-item"><a :href="'/albums-posts/' + this.$route.params.userId" style="text-decoration:none">Albums and Posts</a></li>
                <li class="breadcrumb-item active" aria-current="page">Album's Photos</li>
            </ol>
        </nav>

        <button class="btn btn-outline-warning mb-4" @click="showPopup = true">Add New Photo</button>

        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-2" id="photos">
            <!-- looping photos sliced for 10 photos per page -->
            <div class="col" v-for="photo in photos.slice((currentPage-1)*perPage, (currentPage-1)*perPage+perPage)" :key="photo.id" :current-page="currentPage">
                <div class="card">
                    <img :src="photo.url" :alt="photo.title">
                    <div class="card-body" style="height:8rem">
                        <p class="card-title text-center">{{photo.title}}</p>
                    </div>

                </div>
            </div>
        </div>

        <div class="mt-4 d-flex justify-content-center">
            <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="photos"
            ></b-pagination>
        </div>

        <!-- popup for when user click on add new photo button -->
        <Popup v-if="showPopup" popupTitle="Add New Photo" @toggle-modal="toggleModal">
            <form @submit.prevent="createNewPhoto"> 
                <label>Title</label>
                <input type="text" class="card-title d-flex w-100 ps-2 pe-2 mb-2" placeholder="Type the title here" v-model="newPhoto.title">
                <label class="d-flex">Photo URL</label>
                <input type="file" @change="addImage">
                <label class="d-flex mt-2">Thumbnail URL</label>
                <input type="file" @change="addThumbnail">
                <img v-if="previewImage" :src="previewImage" class="mt-2 d-flex" alt="Photo Preview" style="width:150px; height:150px">
                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-outline-primary mt-4">Upload</button>
                </div>
            </form>
        </Popup>  
    </div>
</template>

<script>
import Popup from './Popup.vue'

const BASE_API_URL = 'https://jsonplaceholder.typicode.com'

export default {
    name: 'Photos',
    components:{
        Popup
    },
    data: () => ({
        photos:[],
        newPhoto: {
            // // ID is declared because I don't know if it'll 
            // // automatically filled on the backend or not
            // id: '', 
            title: '',
            url: '',
            thumbnailUrl: '' 
        },
        showPopup : false,
        // updateMessage: '',
        previewImage: '',
        perPage: 10,
        currentPage: 1
    }),
    computed:{
        rows(){
            return this.photos.length;
        },
        albumTitle: function(){
            return localStorage.getItem('albumTitle');
        }
        // I decided not to use the totalPhotos function
        // since I found out that ID is automatically filled
        // totalPhotos: function(){
        //     return this.photos.length + 1;
        // }
    },
    mounted(){
        this.fetchAlbumPhotos()
    },
    methods:{
        fetchAlbumPhotos(){
            const albumId = this.$route.params.albumId;
            fetch(`${BASE_API_URL}/albums/`+ albumId + '/photos')
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    this.photos = json
                });
        },
        toggleModal(){
            this.showPopup = !this.showPopup;  
        },
        addImage(event){
            const photoName = event.target.files[0].name;
            //saving url as the pic name instead of url 
            //because pic wont be actually posted to the database
            this.newPhoto.url = photoName;
            this.previewImage = URL.createObjectURL(event.target.files[0]);
        },
        addThumbnail(event){
            const thumbnailName = event.target.files[0].name;
            this.newPhoto.thumbnailUrl = thumbnailName;
        },
        createNewPhoto(){
            try{
                const albumId = this.$route.params.albumId;
                fetch(`${BASE_API_URL}/albums/` + albumId + '/photos', {
                    method: 'POST',
                    body: JSON.stringify({
                        albumId: albumId,
                        title: this.newPhoto.title,
                        url: this.newPhoto.url,
                        thumbnailUrl: this.newPhoto.thumbnailUrl
                    }),
                    headers: {
                        'Content-type' : 'applicaiton/json; charset=UTF-8',
                    },
                })
                    // .then((response) => {
                    //     this.showPopup = false;
                    //     this.updateMessage = response.status;
                    //     alert('Status : ' + this.updateMessage);
                    //     console.log(response);
                    //     response.json();
                    //     this.newPhoto.id = '';
                    //     this.newPhoto.title = '';
                    //     this.newPhoto.url = '';
                    //     this.newPhoto.thumbnailUrl = '';
                    // })
                    // .then((json) => console.log(json));

                    // I changed the .then part because the old .then 
                    // code return undefined when i want to return object on 
                    // the console

                    .then((response) => Promise.all([response.status,response.json()]))
                    .then(([status,json]) => {
                        alert('Status : ' + status)
                        console.log(json)
                        this.showPopup = false;                  
                        this.newPhoto.title = '';
                        this.newPhoto.url = '';
                        this.newPhoto.thumbnailUrl = '';
                    });
            } catch(err){
                this.showPopup = true;
                console.log(err)
            }
        }
    }
}
</script>

<style>

</style>