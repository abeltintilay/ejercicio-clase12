// estan las funciones que interactuan con firestore


import { db } from "../data/data.js";
import { doc, getDoc, collection, getDocs, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";


//import { obtenerProductos } from "./products.models.js";

export function obtenerProducto(id) {

      // armando la estructura de una promesa
      return new Promise(async(res,rej)=> {
        try{

            const docRef = doc(db, "products", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              console.log("Snap data: ", docSnap)
              console.log("Document ID: ", docSnap.id)
              console.log("Document data:", docSnap.data());
              res(docSnap.data())
            } else {
            // docSnap.data() will be undefined in this case
              console.log("No such document!");
              res()
            }

        } catch(error){
            console.log("El error es :",error)
            rej(error)
        }
        })
      }

// obtenerProducto()


export function obtenerProductos() {
  return(
    new Promise(async(res, rej)=>{
      try{
            const querySnapshot = await getDocs(collection(db, "products"));
            console.log("Snap completa: ", querySnapshot)
            const productos= []

            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            productos.push({...doc.data(), id: doc.id})
          });
          console.log(productos)
          res(productos)
      }catch(error){
        console.log("el error es: ",error)
        rej(error)
      }
    })
  ) 
}

// obtenerProductos()


export function agregarProducto(producto) {
  // await setDoc(doc(db, "cities", "LA") donde LA es el id de la base de datos, pero
  // en este caso firebase lo crea automaticamente, no lo usamos
  // por eso LA lo borramos
  return(
    new Promise (async (res,rej)=>{
      try{
      
      const docRef=  await addDoc(collection(db, "products"),producto);
      console.log("Doc Id : ", docRef.id, "Producto: ",docRef )
      res({...producto, id:docRef.id})
       }catch(error){
      console.log(error)
      rej(error)
      }
    })
  )
}


  

// agregarProducto({nombre: "yerba", categoria: "infusion", precio: 11222})


export function actualizarProducto(id, producto){
  return(
    new Promise(async(res,rej) => {
      try{
          await updateDoc(doc(db, "products", id), {producto})
          console.log("PRODUCTO ACTUALIZADO")
          res({})

      }catch(error){
          console.log(error)
          rej(error)
      }
    })
  )
}


// actualizarProducto({id: "OlFUYq6AEmVMPxhDiT72", precio: 56789102222223})

export function eliminarProducto(id) {

    return (
      new Promise( async(res,rej)=>{
          try {
            await deleteDoc(doc(db, "products", id));
            console.log("PRODUCTO ELIMINADO")
            res()
          }catch(error){
            console.log(error)
            rej(error)
          }

      })
    )
}

// eliminarProducto("OlFUYq6AEmVMPxhDiT72")
// ahora ver el tema de envolver cada funcion dentro de una proemesa, mas que nada
// para poder manejar los errores del servidor
// por que sino, se puede romper
// recuerda que estas funciones estan sueltas y funcionan por si solas
// pero integradas en las capas, debemos capturar todos los errores posibles
