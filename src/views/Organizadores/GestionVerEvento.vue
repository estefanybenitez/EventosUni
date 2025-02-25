<template>
    <MenuComponente/>
    <v-app class="body">
        <v-img class="topic" src="../../assets/wanna.png"></v-img>
            <h2>AQU&Iacute; PUEDES VER TODOS LOS EVENTOS!! Y OTRAS COSAS M&Aacute;S</h2>
            <v-img class="gestionimg1" src="../../assets/eventosicon.png"></v-img>
            <v-btn
            class="btn1"
            prepend-icon="mdi-eye"
            rounded="x1"
            align-center justify-center
            to="/ver_evento">
            Ver
        </v-btn>
   </v-app>



</template>

<script>
import MenuComponente from '@/components/MenuComponente.vue';
export default{
    name: 'GestionVerEvento',
    components: {MenuComponente},
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

.card{
    margin-top: 10%;
    width: 100%;
}
.v-card{
    background-image: url('../../assets/fondocardx.png');
    width: 30%;
    height: 20%;
    margin: auto;
    margin-bottom: 1%;
    
}

</style>