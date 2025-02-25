<template>
    <MenuAsistente/>
    <v-app class="body"> 
    <v-img class="topic" src="../../assets/WELCOME.png"></v-img>

    <v-card class="welcomeimg">
        <v-img src="../../assets/cardtime23.png">
            
        </v-img>
    </v-card>

    <br>
    <br>
    <v-img class="img" src="../../assets/decano23.png">
            
    </v-img>
</v-app>  

</template>

<script>
import MenuAsistente from '@/components/MenuAsistente.vue';
export default{
    name: 'IncioAsistentes',
    components: {MenuAsistente},
}
</script>

<style scoped>
.topic{
    margin: auto;
    width: 50%;
}


.welcomeimg{
    width: 60%;
    margin:  auto;
    margin-bottom: 5%;
}

.img{

    width: 40%;
    margin: auto;
}

.body{
    background-image: url('../../assets/fondocard2.png'); 
}
</style>