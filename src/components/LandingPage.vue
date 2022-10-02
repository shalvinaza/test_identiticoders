<template>
  <div class="container mt-5 mb-5" id="landing">
    <h1 class="d-flex justify-content-center mb-4">All Users</h1>
    <div class="row row-cols-1 row-cols-lg-2 g-2 g-lg-2">
      <!-- looping all users data -->
      <div class="col" v-for="user in users" :key="user.id" style="cursor:pointer">
        <!-- set onclick event to go to 2nd level -->
        <div class="card" @click="goToUserDetail(user.id, user.name)">
          <div class="card-body">
            <div class="d-flex flex-row align-items-center">
                <h6 class="card-title me-2">Name : </h6>
                <p class="card-title">{{user.name}}</p>
            </div>
            <div class="d-flex flex-row align-items-center">
                <h6 class="card-title me-2">Username : </h6>
                <p class="card-title">{{user.username}}</p>
            </div>
            <div class="d-flex flex-row align-items-center">
                <h6 class="card-title me-2">Email : </h6>
                <p class="card-title">{{user.email}}</p>
            </div>
            <div class="d-flex flex-row align-items-center">
                <h6 class="card-title me-2">Address : </h6>
                <p class="card-title">{{user.address.street}}, {{user.address.suite}}, {{user.address.city}}</p>
            </div>
            <div class="d-flex flex-row align-items-center">
                <h6 class="card-title me-2">Phone : </h6>
                <p class="card-title">{{user.phone}}</p>
            </div>
            <div class="d-flex flex-row align-items-center">
                <h6 class="card-title me-2">Website : </h6>
                <p class="card-title">{{user.phone}}</p>
            </div>
            <div class="d-flex flex-row align-items-start">
                <h6 class="card-title me-2">Company : </h6>
                <div class="d-flex flex-column">
                  <p class="m-0">{{user.company.name}}</p>
                  <p class="m-0" style="color:grey">{{user.company.catchPhrase}}</p>
                  <p class="m-0" style="color:grey">{{user.company.bs}}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data: () => ({
    users:[]
  }),
  mounted(){
    this.fetchAllUsers();
  },
  methods: {
    fetchAllUsers(){
      const ALL_USERS_API = 'https://jsonplaceholder.typicode.com/users';

      fetch(ALL_USERS_API)
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          this.users = json
        });
    },
    goToUserDetail(userId, userName){
      // set user's name as localstorage 
      // to be shown on 2nd level page
      localStorage.setItem('user_name', userName)
      // routing to 2nd level page with user id as param
      this.$router.push({name: 'AlbumsPosts', params: {userId: userId}});
    }
  }
}
</script>

<style scoped>
.card:hover{
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);
}
</style>
