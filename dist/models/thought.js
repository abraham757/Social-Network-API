import { Schema, model } from 'mongoose';
// Esquema de las reacciones
const reactionSchema = new Schema({
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, { _id: false } // No crear un _id automático para las reacciones
);
// Esquema del pensamiento (Thought)
const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    reactions: [reactionSchema], // Array de reacciones
}, {
    toJSON: { virtuals: true }, // Permitir virtuals en la conversión a JSON
    id: false, // No generar automáticamente el campo `id`
});
// Virtual para contar las reacciones
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});
// Modelo de Mongoose
const Thought = model("Thought", thoughtSchema);
export default Thought;
