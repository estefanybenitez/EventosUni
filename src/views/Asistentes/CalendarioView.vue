<template>
    <MenuAsistente/>
    <v-app class="body">

        <v-img  src="../../assets/shine.png" class="img">

        </v-img>

    </v-app>



</template>

<script>
import MenuAsistente from '@/components/MenuAsistente.vue';

export default{
    name: 'CalendarioView',
    components: {MenuAsistente}
}
</script>

<style scoped>
.body{
    background-image: url('../../assets/fondocard2.png');
}

.img{
    width: 50%;
    margin: auto;
}
</style>