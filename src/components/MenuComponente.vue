<template>
        <v-app-bar
          color="#610C9F"
          prominent
        >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
          <v-toolbar-title><v-img class="imagen"  src="../assets/4.png">
  
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
            <v-list-item link to="/menu_organizador" title="Home"></v-list-item>
            <v-list-item link to="/crear_eventos" title="Crear Evento"></v-list-item>
            <v-list-item link to="/ver_evento" title="Ver Evento"></v-list-item>
            <v-list-item link to="/categorias" title="Categorias"></v-list-item>
           
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
  name: 'MenuComponente',
  components: {
    
  },
  data(){
    return{
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

<style scoped>
.imagen{
  width: 20%;
}

</style>