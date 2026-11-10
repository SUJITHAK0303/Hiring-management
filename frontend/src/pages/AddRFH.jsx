import React from "react";
import "../styles/AddRFH.css";

function AddRFH() {
  return (
    <div className="rfh-container">
      <div className="rfh-header">
        <h2>Add Request for Hire</h2>
      </div>

      <form className="rfh-form">

        <h3>Request Details</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Business *</label>
            <select required defaultValue="">
              <option value="">Select Business</option>
            </select>
          </div>

          <div className="form-group">
            <label>Request for Hire *</label>
            <select required defaultValue="">
              <option value="">Select</option>
              <option>HEPL Internal Hiring</option>
              <option>On Client Roll (HEPL Group Companies)</option>
              <option>Manpower Outsourcing to HEPL</option>
            </select>
          </div>

          <div className="form-group">
            <label>Request Raised By *</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <label>Request Date *</label>
            <input type="date" required />
          </div>

          <div className="form-group">
            <label>Request Type *</label>
            <select required defaultValue="">
              <option value="">Select</option>
              <option>New</option>
              <option>Replacement</option>
            </select>
          </div>
        </div>

        <h3>Position Details</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Position Title *</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <label>Work Location *</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <label>Grade / Band *</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <label>Department *</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <label>Designation *</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <label>Function *</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <label>No. of Positions *</label>
            <input type="number" min="1" required />
          </div>
        </div>

        <h3>Job Requirements</h3>

        <div className="form-grid">
          <div className="form-group full-width">
            <label>JD / Roles & Responsibilities *</label>
            <textarea rows="3" required />
          </div>

          <div className="form-group">
            <label>Qualification *</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <label>Essential Skill Sets *</label>
            <textarea rows="2" required />
          </div>

          <div className="form-group">
            <label>Experience (in years) *</label>
            <input type="number" min="0" required />
          </div>
        </div>

        <h3>Compensation Details</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Payroll Category *</label>
            <select required defaultValue="">
              <option value="">Select</option>
            </select>
          </div>

          <div className="form-group">
            <label>Budgeted CTC (per month) *</label>
            <input type="number" min="0" required />
          </div>

          <div className="form-group">
            <label>Budgeted CTC (per annum) *</label>
            <input type="number" min="0" required />
          </div>
        </div>

        <h3>Other Requirements</h3>

        <div className="form-grid">
          

          <div className="form-group">
            <label>Swipe *</label>
            <select required defaultValue="">
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="form-group">
            <label>Shift *</label>
            <select required defaultValue="">
              <option value="">Select</option>
            </select>
          </div>

          <div className="form-group">
            <label>Mail ID Required *</label>
            <select required defaultValue="">
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="form-group">
            <label>Asset Required *</label>
            <select required defaultValue="">
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="form-group">
            <label>Mobile Access *</label>
            <select required defaultValue="">
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="reset" className="reset-btn">Reset</button>
          <button type="submit" className="submit-btn">Submit</button>
        </div>

      </form>
    </div>
  );
}

export default AddRFH;