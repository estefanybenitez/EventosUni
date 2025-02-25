<template>
    <MenuComponente/>
    <v-app class="body">
        <v-btn 
        icon
        outlined
        color="white"
        size="default"
        href="/crear_eventos">
        <v-icon color="#610C9F">mdi-arrow-left-bold-circle</v-icon>

        </v-btn>
        
        <div>
            <v-img class="sticker" src="../../assets/topiccreate.png">

            </v-img>
        </div>
        <v-container class="card">
            <v-card class="size">
                <v-form ref="form" class="form">
                    <v-row>
                        <v-col>
                            <v-text-field class="fields"
                                placeholder="Nombre Evento"
                                variant="underlined"
                                color="#610C9F"
                                label="Nombre del Evento:"
                                required
                                v-model="InputEventos.titulo"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field class="fields"
                                placeholder="Descripción Evento"
                                variant="underlined"
                                color="#610C9F"
                                label="Descripción del Evento:"
                                required
                                v-model="InputEventos.descripcion"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field class="fields"
                                type="date"
                                variant="underlined"
                                color="#610C9F"
                                label="Fecha del Evento"
                                required
                                v-model="InputEventos.fecha"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field class="fields"
                                type="time"
                                variant="underlined"
                                color="#610C9F"
                                label="Hora del Evento"
                                required
                                v-model="InputEventos.hora"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field class="fields"
                                placeholder="Ubicación Evento"
                                variant="underlined"
                                color="#610C9F"
                                label="Ubicación del Evento:"
                                required
                                v-model="InputEventos.ubicacion"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field class="fields"
                                type="file"
                                variant="underlined"
                                color="#610C9F"
                                label="Imagen del Evento:"
                                clear-input="true"
                                required
                                @change="cargarArchivo"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select class="select"
                            color="#610C9F"
                            :items="categorias"
                            item-value="id"
                            item-title="nombre_categoria"
                            variant="underlined"
                            density="compact"
                            label="Categoria"
                            v-model="InputEventos.fk_categoria"
                            >
                            </v-select>

                        </v-col>
                    </v-row>
                
                <div class="divboton">
                    <v-btn
                    rounded
                    color="#610C9F"
                    block
                    @click="addEvento"
                    >
                    Crear Evento
                    </v-btn>  
                </div>
                </v-form>
            </v-card>

            <!--Alerta para agregar Evento-->
         <v-snackbar v-model="alertaEstado" color="#c5a9ff" timeout="2000">
            {{ mensaje }}
        </v-snackbar>
        </v-container>

         
    </v-app>



</template>

<script>
import MenuComponente from '@/components/MenuComponente.vue';
import axios from 'axios'

export default{
    name: 'CrearEvento',
    components: {MenuComponente},
    data() {
        return {
            categorias: [],
            alertaEstado: false,
            mensaje: '',
            InputEventos: {},
        };
    },
    methods: {
        //Poder ver las categorias
        verCategory() {
            axios.get('http://127.0.0.1:8000/api/categoria/select')
                .then(response => {
                if (response.data.code == 200) {
                    let res = response.data;
                    this.categorias = res.data;
                }
            })
                .catch(error => console.log("Ha ocurrido un error: " + error));
        },
        //Cargar el archivo seleccionado y convertirlo a una cadena base64
        cargarArchivo(event) {
            const archivoSeleccionado = event.target.files[0];
            if (archivoSeleccionado) {
                // permite leer contenido de archivos seleccionados
                const reader = new FileReader();
                reader.onload = () => {
                    // Al cargar el archivo, obtenemos su contenido en base64
                    this.InputEventos.imagen = reader.result;
                };
                reader.readAsDataURL(archivoSeleccionado);
            }
        },
        //Agregar Evento
        addEvento() {
            axios.post('http://127.0.0.1:8000/api/eventos/store', this.InputEventos)
                .then(response => {
                if (response.data.code == 200) {
                    // condicion para agregar alerta
                    this.alertaEstado = true;
                    this.mensaje = response.data.data;
                    this.InputEventos = {};
                }
            })
                .catch(error => console.log('Ha ocurrido un error' + error));
        },
    }, created() {
        this.verCategory();
    },
}
</script>

<style scoped>
.body{ 
    background-color: hsl(270, 100%, 96%);   
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