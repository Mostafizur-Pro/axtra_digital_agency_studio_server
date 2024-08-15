import httpStatus from 'http-status'
import mongoose from 'mongoose'
import ApiError from '../../../errors/ApiError'

import { IJob } from './jobs.interface'
import { Job } from './jobs.model'

const getAllJobs = async (): Promise<IJob[] | null> => {
  const result = await Job.find()
  return result
}

const createJob = async (job: IJob): Promise<IJob | null> => {
  const createUser = await Job.create(job)
  if (!createUser) {
    throw new ApiError(400, 'Failed to create job')
  }

  return createUser
}

const deleteJob = async (id: string): Promise<IJob | null> => {
  const result = await Job.findByIdAndDelete(id)
  return result
}
const updateJob = async (
  id: string,
  payload: Partial<IJob>
): Promise<IJob | null> => {
  const result = await Job.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const JobService = {
  createJob,
  getAllJobs,
  deleteJob,
  updateJob,
}
