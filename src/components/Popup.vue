<template>
    <div class="popup">
        <div class="d-flex flex-column col-md-6 popup-inner p-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h5>{{popupTitle}}</h5>
              <span  @click.prevent="close"><i class="fa-regular fa-circle-xmark"></i></span>
            </div>
            <div class="p-0">
                <div class="">
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        popupTitle: {
            type: String
        },

    },
    methods:{
        close(){
            this.$emit('toggle-modal');
        }
    }
}
</script>

<style scoped>
.popup{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    min-height: 100vh;
    background-color: rgba(0,0,0,0.2);

    display: flex;
    align-items: center;
    justify-content: center;
}
.popup-inner{
    margin: auto;
    background: white;
    border-radius: 10px;
}
</style>