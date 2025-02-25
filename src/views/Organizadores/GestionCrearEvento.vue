<template>
   <MenuComponente/>
   <v-app class="body">
        <v-img class="topic" src="../../assets/event22.png"></v-img>
            <h2>AQU&Iacute; PUEDES CREAR EVENTOS!!</h2>
            <v-img class="gestionimg1" src="../../assets/crear.png"></v-img>
            <v-btn
            class="btn1"
            prepend-icon="mdi-arrow-right"
            rounded="x1"
            align-center justify-center
            to="/crear_evento">
            Crear
        </v-btn>
   </v-app>
       


</template>

<script>
import MenuComponente from '@/components/MenuComponente.vue';
export default{
    name: 'GestionCrearEvento',
    components: {MenuComponente },
}
</script>

<style scoped>
.body{
    background-image: url('../../assets/fondocard2.png'); 
}
.topic{
    margin: auto;
    width: 30%;
}

h2{
    font-family: Century Gothic;
    text-align: center;
    color: hsl(275, 86%, 34%);
    margin-top: 0%;
}

.gestionimg1{
    width: 25%;
    margin: auto;
}

.btn1{
    background-color:hsl(275, 86%, 34%) ;
    color: aliceblue;
    margin: auto;
    margin-bottom:5%  ;


}

.btn2{
    background-color:hsl(275, 86%, 34%) ;
    color: aliceblue;
    margin: auto;
    margin-bottom:5%;
    margin-top:0%  ;


}


</style>