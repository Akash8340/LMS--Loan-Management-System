// controllers/adminController.ts

import { Request, Response } from "express";
import User from "../models/User";
import Loan, { LoanStatus } from "../models/Loan";

export const getDashboardStats = async (
    req: Request,
    res: Response
) => {

    try {

        const totalUsers =
            await User.countDocuments();

        const totalLoans =
            await Loan.countDocuments();

        const applied =
            await Loan.countDocuments({
                status: LoanStatus.APPLIED
            });

        const sanctioned =
            await Loan.countDocuments({
                status: LoanStatus.SANCTIONED
            });

        const disbursed =
            await Loan.countDocuments({
                status: LoanStatus.DISBURSED
            });

        const closed =
            await Loan.countDocuments({
                status: LoanStatus.CLOSED
            });

        res.status(200).json({
            totalUsers,
            totalLoans,
            applied,
            sanctioned,
            disbursed,
            closed
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }
};