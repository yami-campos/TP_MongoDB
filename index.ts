import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { connectDB } from "./config/mongo";

connectDB();

// Interfaz
interface Libro extends Document {
    titulo: string;
    autor: string;
    anio: number;
    genero: string;
}


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

const crearLibro = async () => {
    try {
        const nuevoLibro = new Libros({
            titulo: "Harry Potter y la piedra filosofal",
            autor: "J.K. Rowling",
            anio: 1997,
            genero: "Fantasía",
        });

        await nuevoLibro.save();
        console.log("Libro creado");
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

const updateLibroById = async (id: string, data: Partial<Libro>) => {
    try {
        const libroActualizado = await Libros.findByIdAndUpdate(id, data, { new: true });
        console.log("Libro actualizado");
    } catch (error) {
        console.log("Error al actualizar el libro");
    }
};


//Borrar

const deleteLibroById = async (id: string) => {
    try {
        const libroEliminado = await Libros.findByIdAndDelete(id);
        console.log("Libro eliminado");
    } catch (error) {
        console.log("Error al eliminar el libro");
    }
};
