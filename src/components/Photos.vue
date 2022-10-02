<template>
    <div class="container mt-5 mb-5">
        <h1 class="d-flex justify-content-center mb-4">Photos</h1>
        <nav aria-label="breadcrumb" class="mt-5 mb-4" style="cursor:pointer">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href='/' style="text-decoration:none">Home</a></li>
                <li class="breadcrumb-item"><a :href="'/albums-posts/' + this.$route.params.userId" style="text-decoration:none">Albums and Posts</a></li>
                <li class="breadcrumb-item active" aria-current="page">Album's Photos</li>
            </ol>
        </nav>

        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-2" id="photos">
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
    </div>
</template>

<script>

const BASE_API_URL = 'https://jsonplaceholder.typicode.com'

export default {
    name: 'Photos',
    data: () => ({
        photos:[],
        newPhotos: {
            albumId: '',
            id: '', // ID is declared because I don't know if it'll automatically filled on the backend or not
            title: '',
            url: '',
            thumbnailUrl: ''
        },
        perPage: 10,
        currentPage: 1
    }),
    computed:{
        rows(){
            return this.photos.length;
        }
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
        }
    }
}
</script>

<style>

</style>