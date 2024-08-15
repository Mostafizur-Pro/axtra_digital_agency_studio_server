import { Model, Schema, model } from 'mongoose'
import { IJob } from './jobs.interface'

const jobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  user_id: { type: String, required: true },
  salary: { type: String, required: true },
})

export const Job = model<IJob>('Job', jobSchema)
