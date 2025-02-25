<template>

        <v-app-bar
          color="#610C9F"
          prominent
        >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
          <v-toolbar-title><v-img class="imagen"  src="/src/assets/4.png">
  
          </v-img></v-toolbar-title>
          <v-spacer></v-spacer>
              <!-- <v-btn variant="text" icon="mdi-logout"></v-btn> -->
        </v-app-bar>
  
  
        <!-- <v-card> -->
      <!-- <v-layout> -->
        <v-navigation-drawer
          class="bg-deep-purple"
          theme="dark"
          v-model="drawer"
          location="left"
          temporary     
        >
        
          <v-list density="compact"
            nav>
            <!-- asistente  -->
            <v-list-item link to="/menu_asistente" title="My Home"></v-list-item>
            <v-list-item link to="/asistente_eventos" title="Eventos"></v-list-item>
            <v-list-item link to="/calendario_eventos" title="Calendario"></v-list-item>

          </v-list>
  
          <template v-slot:append>
            <div class="pa-2">
              <v-btn block @click="logout">
                Logout
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        
  </template>

<script>
import { getAuth, signOut, } from 'firebase/auth';
import router from '@/router'; 
export default {
  name: 'MenuAsistente',
  components: {
    
  },
  data(){
    return{
        usuarioRol:'',
        sidebarOptions: [],
        drawer: false,

    }
    },
    methods:{
      async logout(){
            // Obtén la instancia de autenticación
            const auth = getAuth();
            signOut(auth)
                .then(() => {
                    // Cierre de sesión exitoso
                    console.log('Sesión cerrada');
                    // Puedes redirigir a la página de inicio o realizar otras acciones después de cerrar sesión
                    router.push('/');
                })
                .catch((error) => {
                // Manejo de errores en el cierre de sesión
                console.error('Error al cerrar sesión:', error.message);
            });
            

        }
        
      },
      
      
  
    created() {
     
    },
  }
</script>
