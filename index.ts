import mongoose, { Document, ObjectId, Schema, model } from "mongoose";

import { connectDB } from "./config/mongo";

connectDB();

// Interfaz
interface DatosLibro {
    titulo: string;
    autor: string;
    anio: number;
    genero: string;
}

interface Libro extends Document, DatosLibro {}

// Esquema

const libroSchema: Schema = new Schema<Libro>({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    anio: { type: Number, required: true },
    genero: { type: String, required: true },
});


libroSchema.set("strict", true);
const Libros = model<Libro>("Libro", libroSchema);

//Crear 

const crearLibro = async (newLibro: DatosLibro) => {
    try {
        const nuevoLibro = new Libros(newLibro)         
        await nuevoLibro.save();
        console.log("Libro creado:", nuevoLibro);
    } catch (error) {
        console.log("Error al registrar un libro");
    }
};

//Buscar

const buscarLibros = async () => {
    try {
        const libros = await Libros.find()
        console.log(libros)
    } catch (error) {
        console.log("Error al recuperar los libros")
    }
}


//Buscar por ID

const buscarLibrosById = async (id: string) => {
    try {
        const libro = await Libros.findById(id);
        console.log(libro);
    } catch (error) {
        console.log("Error al recuperar el libro");
    }
};


// Actualizar

const actualizarLibro = async (id: string, body: object) => {
    try {
        const libroActualizado = await Libros.findByIdAndUpdate(id, body, { new: true });
        if (!libroActualizado) {
            console.log ("No se encuentra el libro")
        } else {console.log(actualizarLibro)
        }
            
            console.log("Libro actualizado");
    } catch (error) {
        console.log("Error al actualizar el libro");
    }
};


//Borrar

const eliminarLibro = async (id: string) => {
    try {
        const libroEliminado = await Libros.findByIdAndDelete(id);
        if (!libroEliminado) {
            console.log ("No se encuentra el libro")
        } else {console.log(eliminarLibro)
        }
    } catch (error) {
        console.log("Error al eliminar el libro");
    }
};
