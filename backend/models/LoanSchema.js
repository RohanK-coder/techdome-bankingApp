import mongoose from "mongoose";

const LoanSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    term: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now, // Defaults to the current date if not provided
    }
  }
);

export const Loan = mongoose.model('Loan', LoanSchema);
