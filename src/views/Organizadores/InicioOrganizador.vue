<template>
    <MenuComponente/>
    <v-img class="topic" src="../../assets/WELCOME.png"></v-img>
    
    <v-card class="welcomeimg">
        <v-img src="../../assets/portadaorga.png">
            
        </v-img>
    </v-card>

    <br>
    <br>
    <v-img class="img" src="../../assets/decano.png">
            
    </v-img>
    



</template>

<!-- lit03@outlook.es -->
<script>

import MenuComponente from '@/components/MenuComponente.vue';

export default{
    name: 'InicioOrganizador',
    components: { MenuComponente }
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
</style>