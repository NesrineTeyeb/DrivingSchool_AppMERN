const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Quiz = require("./models/Quiz");
const Course= require("./models/Course")

dotenv.config();

// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const courses = [
    {
      title: "Introduction au Code de la Route",
      description: "Découvrez les bases du code de la route.",
      videoURL: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Les panneaux de signalisation",
      description: "Comprendre la signification des panneaux.",
      videoURL: "https://www.youtube.com/embed/5qap5aO4i9A",
    },
  ];
const quizzes = [
  {
    title: "Code de la route - Niveau débutant",
    questions: [
      {
        questionText: "Quelle est la vitesse maximale autorisée en ville ?",
        options: ["30 km/h", "50 km/h", "70 km/h"],
        correctAnswer: "50 km/h",
      },
      {
        questionText: "Quel panneau indique une priorité à droite ?",
        options: [
          "Panneau stop",
          "Panneau cédez-le-passage",
          "Panneau priorité à droite",
        ],
        correctAnswer: "Panneau priorité à droite",
      },
    ],
  },
  {
    title: "Code de la route - Niveau avancé",
    questions: [
      {
        questionText: "Dans quel cas doit-on allumer les feux de croisement ?",
        options: ["De nuit seulement", "Par temps de pluie", "Toujours"],
        correctAnswer: "Par temps de pluie",
      },
      {
        questionText: "Quelle est la signification d'une ligne continue ?",
        options: [
          "Dépassement interdit",
          "Zone de stationnement",
          "Route à sens unique",
        ],
        correctAnswer: "Dépassement interdit",
      },
    ],
  },
];

const seederDatabase = async () => {
  try {
    await Quiz.deleteMany(); // Supprime les anciens quiz
    await Quiz.insertMany(quizzes); // Insère les nouveaux quiz
    await Course.deleteMany();
    await Course.insertMany(courses);
    console.log("✅ Base de données peuplée avec succès !");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Erreur lors de l'insertion :", error);
    mongoose.connection.close();
  }
};

seederDatabase();
