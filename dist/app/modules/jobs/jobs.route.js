"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobs_controller_1 = require("./jobs.controller");
const router = express_1.default.Router();
router.post('/create-job', jobs_controller_1.JobController.createJob);
router.get('/', jobs_controller_1.JobController.getAllJobs);
router.delete('/delete/:id', jobs_controller_1.JobController.deleteJob);
router.patch('/update/:id', jobs_controller_1.JobController.updateJob);
exports.default = router;
