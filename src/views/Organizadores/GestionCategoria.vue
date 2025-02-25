<template>
    <MenuComponente/>
       <v-app class="body">
            <v-btn
            class="btn1"
            prepend-icon="mdi-plus-circle-outline"
            rounded="x1"
            align-center justify-center
            @click="addCat(1)">
            AGREGAR CATEGOR&Iacute;A
        </v-btn>

        <v-card class="card">
            <v-card-text>
                <v-img class="gestionimg1" src="../../assets/listacat.png">

                </v-img>
                <v-list class="colores">
                <v-list-item v-for="(categoriax, i) in respuesta" :key="i">
                    <v-label>{{ categoriax.nombre_categoria }}</v-label>
                    <template v-slot:append>
                    <v-btn-toggle
                    v-model="toggle_exclusive"
                    multiple
        >
                    <v-btn class="btnpencil" @click="obtenerCat(categoriax.id, 2)">
                        <v-icon color="blue" >mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn class="btntrash" @click="deleteCat(categoriax.id)">
                        <v-icon color="red">mdi-trash-can-outline</v-icon>
                    </v-btn>
                    </v-btn-toggle>
                </template>

                </v-list-item>
                </v-list>
            </v-card-text>
           
        </v-card>

        <!--Modal para Crear Categorias-->
        <v-dialog
        v-model="dialogOne"
        transition="dialog-top-transition"
        width="500"
        >
            <v-card title="Crear Categoria">
                <v-card-text>
                    <v-text-field
                    placeholder="Categoría"
                    variant="underlined"
                    color="#610C9F"
                    label="Categoría:"
                    v-model="categoria.nombre_categoria"
                    >
                    </v-text-field>

                    <div class="divboton">
                    <v-btn
                    rounded
                    color="#610C9F"
                    block
                    @click="addCat"
                    >
                    Crear Categoría
                    </v-btn>  
                </div>
                </v-card-text> 
            </v-card>
        </v-dialog>


         <!--Modal para Editar Categorias-->

         <v-dialog
        v-model="dialogTwo"
        transition="dialog-top-transition"
        width="500"
        >
            <v-card title="Editar Categoría">
                <v-card-text>
                    <v-text-field
                    placeholder="Categoría"
                    variant="underlined"
                    color="#610C9F"
                    label="Categoría:"
                    v-model="categoria.nombre_categoria"
                    >
                    </v-text-field>

                    <div class="divboton">
                    <v-btn
                    rounded
                    color="#610C9F"
                    block
                    @click="modificarCat(categoria.id)"
                    >
                    Actualizar Categoría
                    </v-btn>  
                </div>
                </v-card-text> 
            </v-card>
        </v-dialog>

                <!--Alerta-->
                <v-snackbar v-model="alertaEstado" color="#c5a9ff" timeout="2000">
                {{ mensaje }}
                </v-snackbar>
   </v-app>



</template>

<script>
import MenuComponente from '@/components/MenuComponente.vue';
import axios from 'axios'
export default{
    
    name: 'GestionCategoria', 
    components: {MenuComponente},
    data(){
        return{
            toggle_exclusive: [],
            dialogOne: false,
            dialogTwo: false,
            alertaEstado:false,
            mensaje:'',
            respuesta:[],
            categoria:{}
            
        }
    }, methods:{

        loadCategoria(){
            axios.get('http://127.0.0.1:8000/api/categoria/select', this.categoria)
            .then( response => {
                    if (response.data.code==200) {
                        let res = response.data
                        this.respuesta=res.data
                    }
                }
            )
            .catch(error=>console.log("Ha ocurrido un error: " +error))
        },
            

        //Ver categoria por ID

        obtenerCat(id, action){
            if(action==2){
                this.dialogTwo = true
            }

            axios.get(`http://127.0.0.1:8000/api/categoria/find/${id}`)
            .then( response => {
                    if (response.data.code==200) {
                        let res = response.data
                        this.categoria=res.data
                    }
                }
            )
            .catch(error=>console.log("Ha ocurrido un error: " +error))


           
        },

        //Actualizar categoria

        modificarCat(id){
            
            axios.put(`http://127.0.0.1:8000/api/categoria/update/${id}`, this.categoria)
            .then( response => {
                    if (response.data.code==200) {

                        //Cambiar mesaje y visibilidad de la alerta
                        this.alertaEstado= true,
                        this.mensaje= response.data.data
                        this.dialogTwo=false
                        this.loadCategoria()
                    }
                }
            )
            .catch(error=>console.log("Ha ocurrido un error: " +error))

        },
        deleteCat(id){
            axios.delete(`http://127.0.0.1:8000/api/categoria/delete/${id}`)
                .then( response => {
                    if (response.data.code==200) {
                       //Cambiar mesaje y visibilidad de la alerta
                        this.alertaEstado= true,
                        this.mensaje= response.data.data

                        //Ocultar cuadro de dialogo
                        this.loadCategoria()
                        }
                    })
                            
                    .catch(error=>console.log("Ha ocurrido un error: " +error))     
        },

        //Agregar Evento
        addCat(action){
            if(action==1){
                this.dialogOne = true
            }

    
            axios.post('http://127.0.0.1:8000/api/categoria/store', this.categoria)
            .then(response =>{

                if(response.data.code==200){
                    // condicion para agregar alerta
                    this.alertaEstado = true
                    this.mensaje = response.data.data
                    this.dialogOne=false
                    this.categoria={}
                    this.loadCategoria()
                }
            })
            .catch(error => console.log('Ha ocurrido un error' + error)) 
        },
    }, 
    created(){
        this.loadCategoria()
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

.btnpencil{
    background-color:hsl(275, 86%, 34%) ;


}

.btntrash{
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