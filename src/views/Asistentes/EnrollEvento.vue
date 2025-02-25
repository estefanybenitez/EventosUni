<template>
    <MenuAsistente/>
    <v-app class="body">

        <v-btn 
        icon
        outlined
        color="white"
        size="default"
        href="/asistente_eventos">
        <v-icon color="#610C9F">mdi-arrow-left-bold-circle</v-icon>

        </v-btn>

        <v-img class="topic" src="../../assets/enroll.png">

        </v-img>

        <v-container class="card">
            <v-card class="size">
                <v-form ref="form" class="form">
                    <v-label class="label">
                        Informaci&oacute;n Personal
                    </v-label>
                    <hr class="hr">
                    <v-row>
                        <v-col>
                            <v-text-field class="fields"
                                placeholder="Mi nombre es..."
                                variant="underlined"
                                color="#610C9F"
                                label="Nombre"
                                required
                                v-model="Inscripciones.nombre"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field class="fields"
                                variant="underlined"
                                placeholder="Mi apellido es"
                                color="#610C9F"
                                type="text"
                                label="Apellidos"
                                required
                                v-model="Inscripciones.apellido"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field class="fields"
                                variant="underlined"
                                color="#610C9F"
                                label="E-mail:"
                                placeholder="myemail@domain.com"
                                required
                                v-model="Inscripciones.correo"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-select class="select"
                            color="#610C9F"
                            :items="eventos"
                            item-value="id"
                            item-title="titulo"
                            variant="underlined"
                            density="compact"
                            label="Evento"
                            v-model="Inscripciones.fk_evento"
                            >
                            </v-select>

                        </v-col>
                    </v-row>
                
                <div class="divboton">
                    <v-btn
                    rounded
                    color="#610C9F"
                    block
                    @click="Enroll"
                    >
                    Asistir
                    </v-btn>  
                </div>
                </v-form>
            </v-card>

            <!--Alerta para inscribirse a evento-->
            <v-snackbar v-model="alertaEstado" color="#c5a9ff" timeout="2000">
            {{ mensaje }}
            </v-snackbar>
        </v-container>

        <!--MODALES-->

       
    </v-app>



</template>

<script>
import { getAuth } from 'firebase/auth';

import MenuAsistente from '@/components/MenuAsistente.vue';

import axios from 'axios'


export default{
    name: 'EnrollEvento',
    components: { MenuAsistente },
    data(){
        return{
            eventos:[],
            alertaEstado:false,
            mensaje :'',
            Inscripciones:{},
            usuario:null

        }
    },
    methods:{

        //Poder ver los eventos
        verEventos(){
            
            axios.get('http://127.0.0.1:8000/api/eventos/select')
            .then( response => {
                    
                    if (response.data.code==200) {
                        let res = response.data
                        this.eventos = res.data

                    }
                }
            )
            .catch(error=>console.log("Ha ocurrido un error: " +error))
        },

         //Agregar Evento
         Enroll(){
            axios.post('http://127.0.0.1:8000/api/asistentes/store', this.Inscripciones)
            .then(response =>{
                this.Inscripciones={}

                if(response.data.code==200){
                    // condicion para agregar alerta
                    this.alertaEstado = true
                    this.mensaje = response.data.data
                }
            })
            .catch(error => console.log('Ha ocurrido un error' + error)) 
        },
        async findNameUser(){
            
            const auth = getAuth();
            
            auth.onAuthStateChanged(user => {
                if (user.email) {
                    const email = user.email;
                    this.usuario = email
                    this.Inscripciones.username=email
                    console.log('Usuario autenticado:', email);
                } 
                if (user.displayName) {
                    const name = user.displayName;
                    this.usuario = name
                    this.asistir.username= name
                    console.log('Usuario autenticado:', name);
                } 
            });
        }


    }, mounted(){
        this.verEventos()
        this.findNameUser()
    }
  
}
</script>

<style scoped>
.body{
    background-color: hsl(270, 100%, 96%) 
}

.topic{
    width: 75%;
    margin: auto;
}

.sticker{
    width: 50%;
    margin: auto;
    margin-top: 10%;
   }
   
   .card{
       
       margin-top: 0%;
       margin-bottom: 40%;
       
       
   }
   
   
   .fields{
       margin: 0% 10% 5% 10%;
   }
   
   .divboton{
       margin-left: 10%;
       margin-right: 10%;
       margin-bottom: 5%;
       color: blueviolet;
       margin-top: 5%;
   }
   
   .size{
       width: 55%;
       margin-left: 22%;
       background-image: url('../../assets/fondocard2.png');   

   }
   
   .label{
       color: #610C9F;
       font-weight: bold;
   }
   .hr{
    border-color: #610C9F;
    border-style: double;
   }

   .form{
    margin: 5%;
    
   }

   .select{
    margin-top: 5%;
   }
</style>