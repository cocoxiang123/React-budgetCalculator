import React from 'react'
import { MdSend } from "react-icons/md"


function ExpenseForm({ charge, amount, handleCharge, handleAmount, handleSubmit, edit }) {

    return (
        <form onSubmit={handleSubmit} >
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="charge">Charge</label>
                    <input value={charge} type="text" className="form-control" onChange={handleCharge} placeholder="e.g rent" id="charge" name="charge" />
                </div>
                <div className="form-group">
                    <label htmlFor="Amount">Amount</label>
                    <input value={amount} onChange={handleAmount} type="text" className="form-control" placeholder="e.g $100" id="amount" name="amount" />
                </div>
            </div>
            <button type="submit" className="btn">
                {edit ? "Edit" : "Submit"}
                <MdSend className="btn-icon" /></button>
        </form>
    )
}

export default ExpenseForm
