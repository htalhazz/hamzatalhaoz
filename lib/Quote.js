import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema(
    {
        service: { type: String, required: true },
        package: { type: String, required: true },
        projectDescription: { type: String, required: true },
        budget: { type: String, required: true },
        timeline: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, default: "" },
        company: { type: String, default: "" },
        status: { type: String, default: "Yeni", enum: ["Yeni", "Okundu", "Yanıtlandı"] },
    },
    { timestamps: true }
);

export default mongoose.models.Quote || mongoose.model("Quote", QuoteSchema);
