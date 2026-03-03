import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: "" },
    tag: { type: String, required: true },
    tech: [String],
    featured: { type: Boolean, default: false },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    features: [String],
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
