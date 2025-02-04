//  Modèle d'utilisateur
const mongoose = require("mongoose");

//Define the userSchema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "student"], default: "student" },
  },
//    timestamps permet d'ajouter automatiquement deux champs à chaque doc de la collection
//    createdAt et updatedAt
//    Chaque fois qu'un utilisateur est créé ou modifié dans la base de données, Mongoose ajoutera
//    automatiquement les champs createdAt et updatedAt avec les valeurs respectives des dates de création 
//    et de mise à jour. Cela te permet d'avoir une trace du moment où un document a été créé ou modifié sans avoir besoin de les définir toi-même.
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
