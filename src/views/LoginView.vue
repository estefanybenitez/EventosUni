<template>
    <v-app class="body">
        <v-container class="card">
            <v-card class="size">
                <v-img class="fondo" src="../assets/4.png" >
                </v-img>
                <v-form ref="form">
                <v-text-field class="fields"
                    placeholder="Myemail@domain.com"
                    variant="underlined"
                    color="#610C9F"
                    :counter="10"
                    label="E-mail"
                    required
                    v-model="usuario"
                ></v-text-field>

                <v-text-field class="fields"
                    variant="underlined"
                    placeholder="**************"
                    color="#610C9F"
                    type="password"
                    label="Password"
                    required
                    v-model="password"
                ></v-text-field>

                
                
                <div class="divboton">
                    <v-btn
                    rounded
                    color="#610C9F"
                    block
                    @click="Acceder"
                    >
                    Log In
                    </v-btn>  
                </div>
                <div class="label">
                <v-label>
                    ¿No tienes cuenta?        
                      
                </v-label>
                
                <a href="/register">Reg&iacute;stare Aqu&iacute;</a>
                </div>

              
                </v-form>

                

                <!--Acceder por redes sociales-->
                <center>
                    
                <v-label>
                    Tambi&eacute;n con 
                </v-label>
                <br>
                <v-btn icon
                @click="WithGoogle"
                color="white"
                >
                <v-icon color="#610C9F">mdi-google</v-icon>
                </v-btn>

                <v-btn icon
                @click="withFB">
                <v-icon color="#610C9F">mdi-facebook</v-icon>
                </v-btn>



                <v-btn icon
                @click="withTwitter">
                <v-icon color="#610C9F">mdi-twitter</v-icon>
                </v-btn>
                </center>

                <br>

            </v-card>
        </v-container>
</v-app>
</template>


<script>

//Importaciones
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider,TwitterAuthProvider ,FacebookAuthProvider, signInWithPopup
        } from 'firebase/auth'

import {getFirestore, doc, collection, query, where, getDocs, setDoc, getDoc} from 'firebase/firestore';
import router from '@/router'; // Importa tu enrutador Vue

//********************************* */

      export default {
        name: 'LoginView',
        data(){
            return{
                password:'',
                usuario: '',
                usuarioAutenticado: false,
                rol:'asistente'
            }
        }, methods:{
             // acceder con correo 
            async Acceder() {

                if(this.usuario=='' && this.password==''){
                    alert("campos vacios");
                }
            try{
                const auth = getAuth()

                const signIn = await signInWithEmailAndPassword(auth, this.usuario, this.password)
                console.log("autentificado")

                // si se ha resgistrado tiene permiso de lectura
                if (signIn) {
                    const firestore = getFirestore();

                    // indicar el nombre de la collecion 
                    const usuariosCollection = collection(firestore, 'usuario');
                    try {
                        // buscar el usuario auntentificado en la bd es igual al ingresado
                        const emailQuery = query(usuariosCollection, where('usuario', '==', this.usuario));
                        const querySnapshot = await getDocs(emailQuery);

                        if (querySnapshot.size > 0) {

                            // Si hay coincidencias, obtén el primer documento
                            const userData = querySnapshot.docs[0].data();
                            const rol = userData.rol; // Obtén el rol del usuario

                            console.log("datos:" , rol)

                            switch (rol) {
                                case 'organizador':
                                router.push('/menu_organizador');
                                break;
                                case 'asistente':
                                router.push('/menu_asistente');
                                break;
                                default:
                                router.push('/');
                            }
                        }else {
                            router.push('/');
                        }
                    }
                    catch (error) {
                        console.error('Error iniciar el usuario:', error);
                        throw error;
                    }
                }
                
               
             
            }
            catch {
                alert('Error al Iniciar sesion:');
                
            }  
            // catch (error) {
            //     console.error('Error al Iniciar sesion:', error);
            //     throw error;
            // }  
        },

        //ACCEDER CON GOOGLE
        async WithGoogle(){
            const googleProvider = new GoogleAuthProvider();
            const auth = getAuth()
    
            //Popup permite iniciar sesion con un proveedor atraves de una ventana emergente
            await signInWithPopup(auth, googleProvider)
            .then( async (result) => {
                //obtener toquen
                const credencial = GoogleAuthProvider.credentialFromResult(result)
                const token = credencial?.accessToken;
                console.log('Success!')
                // Obtener información del usuario autenticado
                const user = result.user;
                const uid = user.uid;
                const usuario = user.email;

                const firestore = getFirestore();

                const usuariosCollection = collection(firestore, 'usuario');
                // Comprobar si el usuario ya existe en Firestore
                const userRef = doc(usuariosCollection, uid);
                const userDoc = await getDoc(userRef);

                router.push('/menu_asistente');

                if (userDoc.exists()) {
                    console.log('El usuario ya existe en Firestore');

                } else {
                    // Si el usuario no existe, guardar información en Firestore
                    await setDoc(userRef, { usuario: usuario, rol: this.rol });
                    console.log('Usuario guardado en Firestore');
                }
                console.log('¡Inicio de sesión exitoso con Google!');
             
            })

            .catch((error)=>{
                console.log('login failed!', error)
                // falta alerta de usuario incorrecto
            })
           
    
        },

        //ACCEDER CON FACEBOOK

        async withFB(){

            const FacebookProvider = new FacebookAuthProvider();
                const auth = getAuth()
                try {
                    const result = await signInWithPopup(auth, FacebookProvider);

                    // Obtener la información del usuario autenticado
                    const user = result.user;
                    const uid = user.uid;
                    let username = user.displayName;

                    const firestore = getFirestore();
                    const userRef = doc(firestore, 'usuario', uid);
                    const userDoc = await getDoc(userRef);
                    router.push('/menu_asistente');

                    if (userDoc.exists()) {
                        console.log('El usuario ya existe en Firestore');

                    } else {
                        // Si el usuario no existe, guardar información en Firestore
                        await setDoc(userRef, { Name: username, rol: this.rol });
                        console.log('Usuario guardado en Firestore');
                    }
                    console.log('¡Inicio de sesión exitoso con Facebook!');

                } catch (error) {
                    console.error('¡Error en el inicio de sesión con Facebook!', error);
                }
    

               

        },

        //ACCEDER CON TWITTER

        async withTwitter(){
                const twitterProvider = new TwitterAuthProvider();
                const auth = getAuth()
                try {
                    const result = await signInWithPopup(auth, twitterProvider);

                    // Obtener la información del usuario autenticado
                    const user = result.user;
                    const uid = user.uid;
                    let username = user.displayName;

                    const firestore = getFirestore();
                    const userRef = doc(firestore, 'usuario', uid);
                    const userDoc = await getDoc(userRef);
                    router.push('/menu_asistente');

                    if (userDoc.exists()) {
                        console.log('El usuario ya existe en Firestore');

                    } else {
                        // Si el usuario no existe, guardar información en Firestore
                        await setDoc(userRef, { Name: username, rol: this.rol });
                        console.log('Usuario guardado en Firestore');
                    }
                    console.log('¡Inicio de sesión exitoso con Twitter!');

                } catch (error) {
                    console.error('¡Error en el inicio de sesión con Twitter!', error);
                }
    
            }

    }
}


</script>

<style scoped>
.body{ 
 background-image: url('../assets/fondo2.png'); 
 position:fixed;
 width: 100%;
 height:100%;
}

.card{
    
    margin-top: 3%;
    margin-bottom: 20%;
    
}

.fondo{

    width: 30%;
    margin: 0 auto;
    padding-bottom: 5%;
}

.fields{
    margin: 0% 10% 5% 10%;
}

.divboton{
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 5%;
    color: blueviolet;
}

.size{
    width: 50%;
    margin-left: 22%;
    background-image: url('../assets/fondocard2.png');   

}

.label{
    text-align: center;
    margin-bottom: 5%;
}
</style>