<template>
    <MenuAsistente/>
    <v-app class="body">
        <v-btn
            class="btn1"
            prepend-icon="mdi-plus-circle-outline"
            rounded="x1"
            align-center justify-center
            to="/inscribirse">
            INCRIBIRSE A UN EVENTO
        </v-btn>
        <div>
            <v-img class="gestionimg2"  src="../../assets/ourevent2.png">

            </v-img>
        </div>
        <div  class="searchbar">
                <v-toolbar
                    dense
                    floating
                    class="bar">
                    
                    <v-text-field
                        v-if="seleccionado === 'null' || seleccionado === 'Categoria' || seleccionado === 'Ubicacion'"
                        hide-details
                        prepend-icon="mdi-magnify"
                        single-line
                        placeholder="Buscar"
                        v-model="parametroBusqueda"
                    ></v-text-field>

                    <!--Cuando es por fecha-->
                    <v-text-field 
                        v-if="seleccionado === 'Fecha'"
                        type="date"
                        hide-details
                        prepend-icon="mdi-magnify"
                        single-line
                        label="Fecha del Evento"  
                        v-model="parametroBusqueda"                      
                    ></v-text-field>

                    <v-btn icon
                        @click="ObtenerFiltro(1)">
                        <v-icon>mdi-filter-variant</v-icon>
                    </v-btn>

                </v-toolbar>

                <v-btn 
                    class="searchButton bgColorBtn"
                    block
                    size="large"
                    type="submit"
                    variant="elevated"
                    @click="filtrarEventosPorParametro()"
                > 
                    Search
                </v-btn>
                <br>
        </div>

        <!--Cards para ver Eventos-->
        <div class="card2">

        
        <v-card class="card" v-for="(evento, i) in respuesta" :key="i">
            <v-card-text>
                <v-row>
                    <v-col>
                        <v-img class="imagentopic" :src="evento.imagen">

                        </v-img>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <h2>Evento: {{ evento.titulo }}</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <h4>Descripci&oacute;n: {{ evento.descripcion }}</h4>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <p>Lugar: {{ evento.ubicacion }}</p>
                        <p>Fecha: {{ evento.fecha }}</p>
                        <p>Hora: {{ evento.hora }}</p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn icon color="red" >
                            <v-icon>mdi-heart-plus-outline</v-icon>
                        </v-btn>
                        <v-btn icon color="green" @click="addComentario( evento.id, 2)">
                            <v-icon>mdi-chat-plus-outline</v-icon>
                        </v-btn>
                        <v-btn icon color="yellow" @click="verComentarios(evento.id, 3)">
                            <v-icon>mdi-chat-processing-outline</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>

     <!--Filtraje-->
     <v-dialog
        v-model="dialogOne"
        transition="dialog-top-transition"
        width="500"
        >
            <v-card :title="titleCard">
                <v-card-text>
                    <div>
                        <v-select
                            v-model="seleccionado"
                            :items="['Categoria', 'Fecha', 'Ubicacion']"
                            variant="underlined"
                            density="compact"
                            color="#610C9F"
                            label="Selecciona una opcion"
                            >
                        </v-select>
                    </div>               
                    <div class="divboton">
                        <v-btn
                            rounded
                            color="#610C9F"
                            block
                            @click= "filtrarEventos()"
                        >
                            Seleccionar
                        </v-btn>  
                    </div>
                </v-card-text> 
            </v-card>
        </v-dialog>

    <!--Agregar Comentario-->

    <v-dialog
        v-model="dialogTwo"
        transition="dialog-top-transition"
        width="500">
            <v-card title="Agregar Comentario">
                <v-card-text>
                
                    <v-text-field
                    v-model="comentInput.comentario"
                    variant="underlined"
                    color="#610C9F"
                    label="Comentar:"
                    placeholder="Escribe un comentario"
                    type="text"
                    >
                    </v-text-field>
                    <div class="divboton">
                    <v-btn
                    rounded
                    color="#610C9F"
                    block
                    @click="Comentar">
                    Postear!
                    </v-btn>  
                </div>
                </v-card-text> 
            </v-card>
        </v-dialog>

    <!--Ver Comentarios-->
    <v-dialog
        v-model="mostrarDialogoComentarios"
        transition="dialog-top-transition"
        width="500"
        >
            <v-card title="Comentarios">
                <v-card-text>
            <v-list>
                <v-list-item v-for="coment in comentarios" :key="coment.id">
                    <v-label>{{ coment.username }}:</v-label>
                    <v-label>{{ coment.comentario }}</v-label>
                </v-list-item>
            </v-list>
        </v-card-text>
        </v-card>
        </v-dialog>
    <!--NOTIFICACION DE FAVORITOS-->

    <!--Alerta-->
    <v-snackbar v-model="alertaEstado" color="#c5a9ff" timeout="2000">
            {{ mensaje }}
        </v-snackbar>
    </v-app>



</template>

<script>
import MenuAsistente from '@/components/MenuAsistente.vue';

import axios from 'axios'
import { getAuth } from 'firebase/auth';
export default{
    name: 'AsistentesEventos',
    components:{MenuAsistente},
    data(){
        return{
            //dialogOne es para el modal del filtro que se aplicará
            dialogOne: false,
            mostrarDialogoComentarios: false,

            dialogTwo: false,
            dialogThree: false,
            //Aqui guardamos la info de los eventos
            respuesta:[],

            seleccionado: null,
            titleCard: "Filtrar por",
            //tipo de filtro
            filterByDate: false,
            filterByCategory: false,
            filterByLocation: false,

            parametroBusqueda: null,
            //Alerta
            alertaEstado:false,
            mensaje :'',
              //agregar nuevo comentario
            comentInput:{},
            eventosid:[],
            usuario: null ,
            comentarios:[]
        }
    }, methods:{
        ObtenerFiltro(action){
            if(action ==1){
                this.dialogOne = true
            }
        },
        //Cargar info de eventos
        loadData(){
            axios.get('http://127.0.0.1:8000/api/eventos/select')
            .then( response => {
                    if (response.data.code==200) {
                        let res = response.data
                        this.respuesta=res.data
                    }
                }
            )
            .catch(error=>console.log("Ha ocurrido un error: " +error))
            console.log(this.respuesta)
        },
        filtrarEventos()
        {
            console.log(this.seleccionado);
            if(this.seleccionado === "Categoria")
            {
                this.filterByCategory = true;
            }
            else if(this.seleccionado === "Ubicacion")
            {
                this.filterByLocation = true;
            }
            else if(this.seleccionado === "Fecha")
            {
                this.filterByDate = true;
            }
            this.dialogOne=false;
        },
        filtrarEventosPorParametro()
        {
            console.log(this.parametroBusqueda)
            if(this.parametroBusqueda === null || this.parametroBusqueda === "")
            {
                this.loadData();
            }
            else if(this.filterByCategory) //Si esta buscando por categoria
            {
                let objetosFiltrados = this.respuesta.filter(objeto => objeto.fk_categoria == this.parametroBusqueda);
                console.log(objetosFiltrados); // Muestra los objetos con fk_categoria = al parametro (se busca por texto no ID)
                if(objetosFiltrados.length > 0)
                {
                    this.respuesta = objetosFiltrados
                }
                else
                {
                    this.alertaEstado = true,
                    this.mensaje = 'No existen eventos con la informacion buscada'
                }
            }
            else if(this.filterByLocation)
            {
                let objetosFiltrados = this.respuesta.filter(objeto => objeto.ubicacion == this.parametroBusqueda);
                console.log(objetosFiltrados); // Muestra los objetos con ubicacion = al parametro
                if(objetosFiltrados.length > 0)
                {
                    this.respuesta = objetosFiltrados
                }
                else
                {
                    this.alertaEstado = true,
                    this.mensaje = 'No existen eventos en la informacion buscada'
                }
                
            }
            else if(this.filterByDate)
            {
                let objetosFiltrados = this.respuesta.filter(objeto => objeto.fecha == this.parametroBusqueda);
                console.log(objetosFiltrados); // Muestra los objetos con fecha = al parametro
                if(objetosFiltrados.length > 0)
                {
                    this.respuesta = objetosFiltrados
                }
                else
                {
                    this.mensaje = 'No existen eventos en la informacion buscada',
                    this.alertaEstado = true
                }
            }
        },
        // agregados
        Comentar(){
            //es para ejecutar el boton de postear y agregar un comentario
            axios.post('http://127.0.0.1:8000/api/comentarios/store', this.comentInput)
            .then( response => {
                    let res = response.data
                    this.comentInput={}                    

                    if (res.code==200) {
                        this.dialogTwo = false;
                       
                    }
                }
            )
            .catch((error)=>{
                console.log("Ha ocurrido un error: " +error)
            })
        },

        findAsistentes(){
            axios.get('http://127.0.0.1:8000/api/asistentes/select')
            .then( response => {
                    let res = response.data
                    if (res.code==200) {
                        
                        this.asistentes = res.data
                        let asistentedata = this.asistentes

                        const auth = getAuth();
                        // verificar que este activo el usuario para acceder a la informacion
                        auth.onAuthStateChanged(user => {
                            // El usuario puede tener un displayName o un email en su registro
                            if (user) {
                                const username = user.email || user.displayName;
                                this.usuario = username;

                                console.log('Usuario autenticado:', username);
                                // verificar si el usuario logueado coincide con el campo username de la tab asistente
                                const asistenteEncontrado = asistentedata.find(asistente => asistente.username == username);
                                if (asistenteEncontrado) {
                                    // Si se encuentra el asistente, obtén su ID
                                    const idAsistente = asistenteEncontrado.id;
                                    // Asigno el id automaticamente en el fk de comentario sobre el id_usuario
                                    this.comentInput.id_asistente = idAsistente;

                                    console.log('ID del asistente:', idAsistente);
                                } 
                                else {
                                    console.log('Asistente no encontrado.');
                                }
                                                 
                            } 
                        });
                    }
                }
            )
            .catch(error=>
            console.log("Ha ocurrido un error: " +error))
        },
        verComentarios(id, action){
            
            if (action == 3) {
                this.mostrarDialogoComentarios = true;
            } 
            axios.get(`http://127.0.0.1:8000/api/comentarios/find/${id}`)
            .then( response => {
                    let res = response.data
                    if (res.code==200) {
                        this.comentarios=res.data
                    }
                }
            )
            .catch(error=>console.log("Ha ocurrido un error: " +error))
        },
        addComentario(id, action){
            if (action == 2) {
                this.dialogTwo=true
            } 

            //espeficamente para obtener el id del envento
            axios.get(`http://127.0.0.1:8000/api/eventosasistente/find/${id}`)
            .then( response => {
                    let res = response.data
                    if (res.code==200) {
                        this.eventosid=res.data
                        let eventodata = this.eventosid
     
                        const eventoEncontrado = eventodata.find(evento => evento.id);

                        if (eventoEncontrado) {
                            // Si se encuentra el evento, obtén su ID
                            const idEvento = eventoEncontrado.id;
                            // Se asigna el ID al valor de la fk
                            this.comentInput.id_evento = idEvento;

                            console.log('ID del evento :', idEvento);
                        } 
                        else {
                            console.log('Error no encontrado.');
                        }
                        
                    }
                }
            )
            .catch(error=>console.log("Ha ocurrido un error: " + error))

            //mostrar comentarios en agregar comentario
            axios.get(`http://127.0.0.1:8000/api/comentarios/find/${id}`)
            .then( response => {
                    let res = response.data
                    if (res.code==200) {
                        this.comentarios=res.data 
                        
                    }
                }
            )
            .catch(error=>console.log("Ha ocurrido un error: " +error))  
        },

        
    },
    created(){
        this.loadData()
        this.findAsistentes()
    }
    
}
</script>

<style scoped>
.body{
    background-image: url('../../assets/fondocard2.png'); 
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

.searchbar{
    margin-left: 20%;
    margin-right: 20%;
}
.searchbar2{
    width: 150%;
}

.bar{
    background-color:hsl(275, 86%, 34%) ;
    color: aliceblue;
    margin-bottom: 10%;

}

.card{
    background-color: #451952;
    color: aliceblue;
    font-family: Century Gothic;
    margin-left: 2%;
    margin-right: 2%;
    margin-bottom: 2%;
    
}

.imagentopic{
    width: 75%;
    margin: auto;
}

.card2{
    margin: auto;
    width: 60%;
}

.bgColorBtn{
    background-color:hsl(275, 86%, 34%) ;
    color: aliceblue;
}
</style>