import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import FormView from '../views/FormView.vue'


/**Organizadores */

import InicioOrganizador from '../views/Organizadores/InicioOrganizador.vue'
import GestionCrearEvento from '../views/Organizadores/GestionCrearEvento.vue'
import GestionVerEvento from '../views/Organizadores/GestionVerEvento.vue'
import GestionCategoria from '../views/Organizadores/GestionCategoria.vue'
import CrearEvento from '../views/Organizadores/CrearEvento.vue'
import VerEventos from '../views/Organizadores/VerEventos'

/**Asistentes */
import InicioAsistentes from '../views/Asistentes/InicioAsistentes.vue'
import AsistentesEventos from '../views/Asistentes/AsistentesEventos.vue'
import CalendarioView from '../views/Asistentes/CalendarioView.vue'
import EnrollEvento from '../views/Asistentes/EnrollEvento.vue'

import { initializeApp } from 'firebase/app';
import { getAuth,setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, doc, query, where, getDocs, getDoc, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBK79IHAS5zwtUXDfCO4gCMlyIJAEvB7UQ",
  authDomain: "eventtime-694f6.firebaseapp.com",
  projectId: "eventtime-694f6",
  storageBucket: "eventtime-694f6.appspot.com",
  messagingSenderId: "536083129539",
  appId: "1:536083129539:web:4857f9567324758fa62e76",
  measurementId: "G-W84PC4DLYX"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore();

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: FormView
  }
  ,

  //Rutas que requieren autenticacion
  {
    path: '/menu_organizador',
    name: 'menu_organizador',
    component: InicioOrganizador,
    meta: { requiresAuth: true , rol: 'organizador'}
  }
  ,
  {
    path: '/crear_eventos',
    name: 'crear_eventos',
    component: GestionCrearEvento,
    meta: { requiresAuth: true , rol: 'organizador'}
  }
  ,
  {
    path: '/ver_eventos',
    name: 'ver_eventos',
    component: GestionVerEvento,
    meta: { requiresAuth: true , rol: 'organizador'}
  }
  ,
  {
    path: '/categorias',
    name: 'categorias',
    component: GestionCategoria,
    meta: { requiresAuth: true , rol: 'organizador'}
  },
  {
    path: '/crear_evento',
    name: 'crear_evento',
    component: CrearEvento,
    meta: { requiresAuth: true , rol: 'organizador'}
  }
  ,
  {
    path: '/ver_evento',
    name: 'ver_evento',
    component: VerEventos,
    meta: { requiresAuth: true, rol: 'organizador' }
  },
  {
    path: '/menu_asistente',
    name: 'menu_asistente',
    component: InicioAsistentes,
    meta: { requiresAuth: true, rol: 'asistente' }
  },
  {
    path: '/asistente_eventos',
    name: 'asistente_eventos',
    component: AsistentesEventos,
    meta: { requiresAuth: true, rol: 'asistente' }
  }
  ,
  {
    path: '/calendario_eventos',
    name: 'calendario_eventos',
    component: CalendarioView,
    meta: { requiresAuth: true, rol: 'asistente' }
  }
  ,
  {
    path: '/inscribirse',
    name: 'inscribirse',
    component: EnrollEvento,
    meta: { requiresAuth: true, rol: 'asistente' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


//
// here
router.beforeEach(async (to, from, next) => {
  await setPersistence(auth, browserSessionPersistence);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next('/');
    console.log("No autentificado")

  }
  else {
    if (requiresAuth && currentUser) {
      // Obtener el documento del usuario desde Firestore para verificar el rol
      const usuariosCollection = collection(firestore, 'usuario');
      try {
        // buscar gmail en caso que sea lo proporcionado
        const emailQuery = query(usuariosCollection, where('usuario', '==', currentUser.email));
        // buscar un nombre en caso que sea lo proporcionado
        const displayNameQuery = query(usuariosCollection, where('Name', '==', currentUser.displayName));
      
        const emailSnapshot = await getDocs(emailQuery);
        const displayNameSnapshot = await getDocs(displayNameQuery);
      
        let userData = null;
      
        // Verificar si hay coincidencia en el email o en el nombre de usuario
        if (emailSnapshot.size > 0) {
          userData = emailSnapshot.docs[0].data();
          
        } 
        else if (displayNameSnapshot.size > 0) {
          userData = displayNameSnapshot.docs[0].data();
        }
      
        if (userData) {
          const rol = userData.rol;
          // console.log
      
          if (to.meta.rol && rol !== to.meta.rol) {
            // Redirigir a alguna página de error o a una ruta predeterminada si el rol no coincide
            next('/');
            console.log("no se encontro rol")

          } 
          else {
            next();
            console.log("Todo salio bien!")

          }

        // } else {

        //   // Si no se encontró ninguna coincidencia, 
        //   next('/');
        //   console.log("no se encontro")

        }
      }catch (error) {

        console.error('Error al obtener información del usuario:', error.message);
        next('/');
        console.log("algo ocurrio1")

      }

    } else {
      next();
      console.log("algo ocurrio")
    }
  }
});

export default router
