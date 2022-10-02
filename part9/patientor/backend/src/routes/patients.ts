import express from "express";
import patientsService from "../services/patientsService";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPublicPatientData());
});

router.get("/:id", (req, res) => {
  res.send(patientsService.getPatient(req.params.id));
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

// router.post("/", (_req, res) => {
//   res.send("Saving a diagnosis!");
// });

export default router;
