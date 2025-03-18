
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../../src/redux/Actions/mentalhealthActions"; // Import Redux action

const UserInfoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    enroll: "",
    name: "",
    phone: "",
    email: "",
    emergencyContact: "",
    courseYear: "",
    residency: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    if (!formData.enroll.trim()) newErrors.enroll = "Enrollment number is required.";
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Valid phone number is required (10 digits).";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.emergencyContact.trim() || !/^\d{10}$/.test(formData.emergencyContact))
      newErrors.emergencyContact = "Valid emergency contact number is required (10 digits).";
    if (!formData.courseYear) newErrors.courseYear = "Course year is required.";
    if (!formData.residency.trim()) newErrors.residency = "Place of residency is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("📩 User Data Submitted:", formData);

      // Save data to Redux store
      dispatch(setUserDetails(formData));

      navigate("/assessment", { state: { userData: formData } });
    } else {
      alert("⚠️ Please fill in all required fields before proceeding!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <div className="max-w-2xl w-full p-8 bg-white shadow-lg rounded-lg animate-fadeIn">
        <h1 className="text-3xl font-bold text-blue-700 text-center">
          JECRC Mental Health Campaign
        </h1>
        <p className="text-gray-700 mt-2 text-center">
          Please fill in your details to proceed with the assessment.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Enrollment Number */}
          <div>
            <label className="block text-gray-700 font-semibold">Enrollment Number</label>
            <input
              type="text"
              name="enroll"
              value={formData.enroll}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your enrollment number"
            />
            {errors.enroll && <p className="text-red-500 text-sm">{errors.enroll}</p>}
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-semibold">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block text-gray-700 font-semibold">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter emergency contact number"
            />
            {errors.emergencyContact && <p className="text-red-500 text-sm">{errors.emergencyContact}</p>}
          </div>

          {/* Course Year */}
          <div>
            <label className="block text-gray-700 font-semibold">Course Year</label>
            <select
              name="courseYear"
              value={formData.courseYear}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your course year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
            {errors.courseYear && <p className="text-red-500 text-sm">{errors.courseYear}</p>}
          </div>

          {/* Place of Residency */}
          <div>
            <label className="block text-gray-700 font-semibold">Place of Residency</label>
            <input
              type="text"
              name="residency"
              value={formData.residency}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your place of residency"
            />
            {errors.residency && <p className="text-red-500 text-sm">{errors.residency}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Submit & Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfoForm;
