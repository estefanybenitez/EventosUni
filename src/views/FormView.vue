<template>
    <v-app class="body">

        <v-btn 
        icon
        outlined
        color="white"
        size="default"
        href="/">
        <v-icon color="#610C9F">mdi-arrow-left-bold-circle</v-icon>

        </v-btn>

        <div>
            <v-img class="sticker" src="../assets/create2.png">

            </v-img>
        </div>
        <v-container class="card">
            <v-card class="size">
                <v-form ref="form" class="form">
                    
                    <v-row>
                        <v-col>
                            <v-text-field class="fields"
                                placeholder="myemail@domain.com"
                                variant="underlined"
                                color="#610C9F"
                                label="Email"
                                required
                                v-model="email"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field class="fields"
                                variant="underlined"
                                placeholder="****************"
                                color="#610C9F"
                                type="password"
                                label="Password"
                                required
                                v-model="contraseña"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                
                <div class="divboton">
                    <v-btn
                    rounded
                    color="#610C9F"
                    block
                    @click="CrearCuenta"
                    >
                    Registrarme
                    </v-btn>  
                </div>
                </v-form>
            </v-card>
        </v-container>
</v-app>


</template>

<script>

//Importaciones

import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getFirestore, addDoc, collection} from 'firebase/firestore';
import router from '@/router'; // Importa tu enrutador Vue


export default{
     name: 'FormView',
     data(){
        return{ 
                email:'',
                contraseña:'',
                // predefinda  solo el propio usuario crea su cuenta
                rol:'organizador'
        }
     }, methods:{


        // crear una cuenta en Firebase 
        async CrearCuenta(){
                const auth = getAuth()
                const usuario = this.email
                const password = this.contraseña
                const rol = this.rol
                try{
                    // crear usuario 
                    const infoUsuario = await createUserWithEmailAndPassword(auth,usuario,password);
                    // ver la info que procesa
                    console.log('Usuario creado:', infoUsuario);
                    // console.log(infoUsuario.user.uid)

                    // si el usuario esta creado
                    if (infoUsuario) {
                        console.log("Exito al crear usuario")
                        const firestore = getFirestore()
                        // indico cual es la collecion a la quiero mandar los datos
                        const usuariosCollection = collection(firestore, 'usuario');
                        // addDoc para indicar lo que agregare y cuales serán los cambios
                        await addDoc(usuariosCollection, { usuario: usuario, rol: rol }); 

                        router.push('/menu_asistente');
                        return infoUsuario;
                    }
                }
                catch (error) {
                    console.error('Error al crear usuario:', error.message);
                    throw error;
                }        
            }

     }
    }


</script>

<style scoped>
.body{ 
    background-image: url('../assets/fondo2.png');   
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
       background-image: url('../assets/fondocard2.png');   

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

