import express from "express";
import { Loan } from "../models/LoanSchema.js";
const router = express.Router();

// GET /loans
router.get("/", async (request, response) => {
  try {
    const loans = await Loan.find({});
    return response.status(200).json(loans);
  } catch (error) {
    console.log(error);
    return response.status(500).send({
      message: "Internal Server Error. Could not fetch loans.",
    });
  }
});

// GET /loans/:id
router.get("/:id", async (request, response) => {
  try {
    const loanId = parseInt(request.params.id, 10);
    if (isNaN(loanId)) {
      return response.status(400).send({
        message: "Invalid ID format",
      });
    }

    const loan = await Loan.find({ id: loanId });
    if (!loan) {
      return response.status(404).send({
        message: `No loan found with ID: ${loanId}`,
      });
    }

    return response.status(200).json(loan);
  } catch (error) {
    console.log(error);
    return response.status(500).send({
      message: "Internal Server Error. Could not fetch loan.",
    });
  }
});

// POST /loans/:id
router.post("/:id", async (request, response) => {
  try {
    const loanId = parseInt(request.params.id, 10);
    if (isNaN(loanId)) {
      return response.status(400).send({
        message: "Invalid loan ID format.",
      });
    }

    if (!request.body.amount || !request.body.term) {
      return response.status(400).send({
        message: "Please provide both 'amount' and 'term'.",
      });
    }

    const newLoan = {
      id: loanId,
      amount: request.body.amount,
      term: request.body.term,
      status: "Pending",
    };

    const loan = await Loan.create(newLoan);

    return response.status(201).json(loan); // Return the created loan with a 201 status
  } catch (error) {
    console.log(error);
    return response.status(500).send({
      message: error.message || "Internal Server Error. Could not create loan.",
    });
  }
});
// PUT /loans/:id/status - Update loan status to "Accepted"
router.put("/:id/status", async (request, response) => {
  try {
    // Use loan's _id, not id (MongoDB's default identifier is _id)
    const loanId = request.params.id;

    // Find the loan by _id
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return response.status(404).send({
        message: `No loan found with ID: ${loanId}`,
      });
    }

    // Only update status if the current status is "Pending"
    if (loan.status === "Pending") {
      loan.status = "Accepted"; // Update status to "Accepted"
      await loan.save(); // Save the updated loan

      return response.status(200).json(loan); // Return the updated loan
    } else {
      return response.status(400).send({
        message: `Loan with ID ${loanId} is already ${loan.status}.`,
      });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).send({
      message: "Internal Server Error. Could not update loan status.",
    });
  }
});


export default router;
