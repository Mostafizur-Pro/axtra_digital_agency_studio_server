"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jobs_model_1 = require("./jobs.model");
const getAllJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobs_model_1.Job.find();
    return result;
});
const createJob = (job) => __awaiter(void 0, void 0, void 0, function* () {
    const createUser = yield jobs_model_1.Job.create(job);
    if (!createUser) {
        throw new ApiError_1.default(400, 'Failed to create job');
    }
    return createUser;
});
const deleteJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobs_model_1.Job.findByIdAndDelete(id);
    return result;
});
const updateJob = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobs_model_1.Job.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.JobService = {
    createJob,
    getAllJobs,
    deleteJob,
    updateJob,
};
