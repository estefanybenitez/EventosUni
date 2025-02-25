 <template>
    <MenuComponente/>

     <v-app class="body">
        <v-btn 
        icon
        outlined
        color="white"
        size="default"
        href="/ver_eventos">
        <v-icon color="#610C9F">mdi-arrow-left-bold-circle</v-icon>

        </v-btn>
        <div>
            <v-img class="gestionimg2" src="../../assets/ongoing.png">
            </v-img>
        </div>

        <v-card class="card">
            <v-card-text>
                <v-img class="gestionimg1" src="../../assets/lista.png">

                </v-img>
                <v-list class="colores">
                <v-list-item v-for="(evento, i) in respuesta" :key="i">
                    <v-label>{{ evento.titulo }}</v-label>
                <template v-slot:append>
                    <v-btn-toggle
                    v-model="toggle_exclusive"
                    multiple
                    >           
                    <v-btn class="btns" @click="obtenerEventos(evento.id, 1)">
                        <v-icon color="green" >mdi-eye</v-icon>
                    </v-btn>
                    <v-btn class="btns" @click="obtenerEventos(evento.id, 2)">
                        <v-icon color="blue" >mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn class="btns" @click="verAsistentes(evento.id, 3)">
                        <v-icon color="yellow" >mdi-account-group</v-icon>
                    </v-btn>
                    <v-btn class="btns" @click="deleteEvento(evento.id)">
                        <v-icon color="red">mdi-trash-can-outline</v-icon>
                    </v-btn>
                    
                    </v-btn-toggle>
                </template>

                </v-list-item>
                </v-list>
            </v-card-text>
           
        </v-card>

        <!--MODALES-->

        <!--Modal para Ver Eventos-->
        <v-dialog
        v-model="dialogOne"
        transition="dialog-top-transition"
        width="500"
        >
            <v-card title="Ver Eventos">
                <v-card-text>
            <v-list>
                <v-list-item title="Titulo">
                    <v-label>{{ evento.titulo }}</v-label>
                </v-list-item>
                <v-list-item>
                    <v-img :src="evento.imagen" alt="foto"></v-img>
                </v-list-item>
                <v-list-item title="Hora:">
                    <v-label>{{ evento.hora }}</v-label>
                </v-list-item>
                <v-list-item title="Fecha:">
                    <v-label>{{ evento.fecha }}</v-label>
                </v-list-item>
                <v-list-item title="Ubicacion:">
                    <v-label>{{ evento.ubicacion }}</v-label>
                </v-list-item>
                
                <v-list-item title="Descripcion:">
                    <v-label>{{ evento.descripcion }}</v-label>
                </v-list-item>
                <v-list-item title="Categoría:">
                    <v-label>{{ evento.categoria }}</v-label>
                </v-list-item>
               
            </v-list>
        </v-card-text>
        </v-card>
        </v-dialog>

        <!--Modal para Editar Eventos-->

        <v-dialog
        v-model="dialogTwo"
        transition="dialog-top-transition"
        width="500"
        >
            <v-card title="Editar Evento">
                <v-card-text>
                    <v-text-field
                    placeholder="Nombre Evento"
                    variant="underlined"
                    color="#610C9F"
                    label="Nombre del Evento:"
                    v-model="evento.titulo"
                    >
                    </v-text-field>

                    <v-text-field
                    placeholder="Descripcion Evento"
                    variant="underlined"
                    color="#610C9F"
                    label="Descripcion Evento:"
                    v-model="evento.descripcion"
                    >
                    </v-text-field>

                    <v-text-field
                    variant="underlined"
                    color="#610C9F"
                    label="Fecha:"
                    type="date"
                    v-model="evento.fecha"
                    >
                    </v-text-field>

                    <v-text-field
                    variant="underlined"
                    color="#610C9F"
                    label="Hora:"
                    type="time"
                    v-model="evento.hora"
                    >
                    </v-text-field>

                    <v-img :src="evento.imagen" alt="foto"></v-img>

                    <v-text-field
                    variant="underlined"
                    color="#610C9F"
                    label="Imagen del Evento:"
                    type="file"
                    clear-input="true"
                    @change="cargarArchivo"
                    >
                    </v-text-field>

                    <v-select class="select"
                            color="#610C9F"
                            :items="categorias"
                            item-value="id"
                            item-title="nombre_categoria"
                            variant="underlined"
                            density="compact"
                            label="Categoria"
                            v-model="evento.fk_categoria"
                            >
                    </v-select>
                    <div class="divboton">
                    <v-btn
                    rounded
                    color="#610C9F"
                    block
                    @click="modicarEvent(evento.id)"
                    >
                    Actualizar Evento
                    </v-btn>  
                </div>
                </v-card-text> 
            </v-card>
        </v-dialog>
        <!--Modal para Ver Asistentes-->

        <v-dialog
        v-model="dialogThree"
        transition="dialog-top-transition"
        width="500"
        >
            <v-card title="Ver Asistentes">
                <v-card-text>
            <v-list>
                <v-list-item v-for="asistente in asistentes" :key="asistente.id">
                    <v-label>Nombre: {{ asistente.nombre }} {{ asistente.apellido }}  </v-label>
                </v-list-item>
            </v-list>
        </v-card-text>
        </v-card>
        </v-dialog>



        <!--Alerta para Eliminar Evento-->
        <v-snackbar v-model="alertaEstado" color="#c5a9ff" timeout="2000">
            {{ mensaje }}
        </v-snackbar>
        
   </v-app>



</template>

<script>
import MenuComponente from '@/components/MenuComponente.vue';
import axios from 'axios'

export default{
    name: 'VerEventos',
    components: {MenuComponente},
    data(){
        return{
            dialogOne: false,
            dialogTwo: false,
            dialogThree: false, 
            alertaEstado:false,
            mensaje:'',
            respuesta:[],
            evento:{},
            categorias:[],
            asistentes:[],

        }
    },methods:{
        //Cargar info de eventos
        loadData(){
            axios.get('http://127.0.0.1:8000/api/eventos/select', this.evento)
            .then( response => {
                    if (response.data.code==200) {
                        let res = response.data
                        this.respuesta=res.data
                    }
                }
            )
            .catch(error=>console.log("Ha ocurrido un error: " +error))
        },
        
        //Ver eventos
        obtenerEventos(id, action){
            if(action==1){
                this.dialogOne = true
            }else if (action == 2) {
                this.dialogTwo = true
            }

            axios.get(`http://127.0.0.1:8000/api/eventos/find/${id}`)
            .then( response => {
                    if (response.data.code==200) {
                        let res = response.data
                        this.evento=res.data
                    }
                }
            )
            .catch(error=>console.log("Ha ocurrido un error: " +error))


           
        }, //Cargar el archivo seleccionado y convertirlo a una cadena base64
        cargarArchivo(event) {
            const archivoSeleccionado = event.target.files[0];
            if (archivoSeleccionado) {
            // permite leer contenido de archivos seleccionados
            const reader = new FileReader();
            reader.onload = () => {
                // Al cargar el archivo, obtenemos su contenido en base64
                this.evento.imagen = reader.result;
            };
            reader.readAsDataURL(archivoSeleccionado);
            }
        },

        //ACTUALIZAR DATOS DEL EVENTO
        modicarEvent(id){
            
            axios.put(`http://127.0.0.1:8000/api/eventos/update/${id}`, this.evento)
            .then( response => {
                    if (response.data.code==200) {

                        //Cambiar mesaje y visibilidad de la alerta
                        this.alertaEstado= true,
                        this.mensaje= response.data.data

                        //Ocultar cuadro de dialogo
                        this.dialogTwo=false
                        this.loadData()
                    }
                }
            )
            .catch(error=>console.log("Ha ocurrido un error: " +error))

        },
        //Poder ver las categorias
        verCategory(){
            axios.get('http://127.0.0.1:8000/api/categoria/select')
            .then( response => {
                    
                    if (response.data.code==200) {
                        let res = response.data
                        this.categorias = res.data
                    }
                }
            )
            .catch(error=>console.log("Ha ocurrido un error: " +error))
        },
        //Ver Asistentes --NO FUNCIONA
        verAsistentes(id, action){

            if(action==3) {
                this.dialogThree = true
            }

            axios.get(`http://127.0.0.1:8000/api/eventLista/find/${id}`)
            .then( response => {
                    
                    if (response.data.code==200) {
                        let res = response.data
                        this.asistentes=res.data
                    }
                }
            )
            .catch(error=>console.log("Ha ocurrido un error: " +error))
        },

        deleteEvento(id){
            axios.delete(`http://127.0.0.1:8000/api/eventos/delete/${id}`)
                .then( response => {
                    if (response.data.code==200) {
                       //Cambiar mesaje y visibilidad de la alerta
                        this.alertaEstado= true,
                        this.mensaje= response.data.data

                        //Ocultar cuadro de dialogo
                        this.loadData()
                        }
                    })
                            
                    .catch(error=>console.log("Ha ocurrido un error: " +error))     
        },
        
    }, created(){
        this.loadData()
        this.verCategory()
        
    }
}
</script>

<style scoped>
.body{
    background-image: url('../../assets/fondocard2.png'); 
}

.gestionimg1{
    width: 50%;
    margin-left: 1%;
    margin-bottom: 3%;
}

.btn1{
    background-color:hsl(275, 86%, 34%) ;
    color: aliceblue;
    margin: auto;
    margin-top: 3%;
    margin-left: 10%;
    margin-bottom: 5%;

}

.gestionimg2{
    width: 50%;
    margin: 0 auto;
}

.btns{
    background-color:hsl(275, 86%, 34%) ;


}


.card{
    background-color: #35155D;
    margin: auto;
    margin-top: 1%;
    width: 60%;
}

.colores{
    background-color: #c5a9ff;
    color: #35155D;
    font-weight: bold;
}


</style>