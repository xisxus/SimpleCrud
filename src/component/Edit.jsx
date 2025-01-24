import React, { useEffect, useState } from 'react';
import MemberService from '../services/MemberService';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const [type, setType] = useState([]); // For member types dropdown
  const navigate = useNavigate();
  const { id } = useParams(); // Captures the member ID from the route
  const [formData, setFormData] = useState({
    MemberId: 0,
    MemberName: '',
    MemberAddress: '',
    MemberTypeId: 0,
    MemberPhoto: null,
    MemberSignature: null,
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Handles input changes (text, dropdown, and file inputs)
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'file' ? (files.length > 0 ? files[0] : null) : value,
    }));
  };

  // Fetch all member types
  const getAllTypes = async () => {
    try {
      const data = await MemberService.getAllMemberType();
      setType(data);
    } catch (err) {
      console.error('Error fetching member types:', err);
      setError('Failed to fetch member types.');
    }
  };

  // Fetch member details by ID
  const getMemberDetails = async (memberId) => {
    try {
      const data = await MemberService.getAllMemberById(memberId);
      setFormData({
        MemberId : data.memberId,
        MemberName: data.memberName,
        MemberAddress: data.memberAddress,
        MemberTypeId: data.memberTypeId,
        MemberPhoto: null, // File inputs cannot be pre-filled
        MemberSignature: null,
      });
      setLoading(false); // Data is ready
    } catch (err) {
      console.error('Error fetching member details:', err);
      setError('Failed to fetch member details.');
    }
  };

  // Trigger data loading on component mount
  useEffect(() => {
    setLoading(true); // Set loading state
    getAllTypes(); // Fetch member types
    getMemberDetails(id); // Fetch specific member details
  }, [id]);

  // Handle form submission to update member
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('MemberId', formData.MemberId);
    data.append('MemberName', formData.MemberName);
    data.append('MemberAddress', formData.MemberAddress);
    data.append('MemberTypeId', formData.MemberTypeId);
    if (formData.MemberPhoto) {
      data.append('MemberPhoto', formData.MemberPhoto);
    }
    if (formData.MemberSignature) {
      data.append('MemberSignature', formData.MemberSignature);
    }

    // Debugging FormData contents
    for (const [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      console.log('sub', data);
      
      await MemberService.update(id, data); // Update member by ID
      console.log('Member updated successfully');
      navigate('/member'); // Redirect to member list
    } catch (err) {
      console.error('Error updating member:', err);
      setError('Failed to update member.');
    }
  };

  // Display error if fetching data failed
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Show loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Member</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Member Name:</label>
          <input
            type="text"
            name="MemberName"
            value={formData.MemberName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Member Address:</label>
          <input
            type="text"
            name="MemberAddress"
            value={formData.MemberAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Member Type:</label>
          <select
            name="MemberTypeId"
            value={formData.MemberTypeId}
            onChange={handleChange}
            required
          >
            <option value={0} disabled>
              Select a Member Type
            </option>
            {type.map((t) => (
              <option key={t.memberTypeId} value={t.memberTypeId}>
                {t.memberTypeName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Member Photo:</label>
          <input
            type="file"
            name="MemberPhoto"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Member Signature:</label>
          <input
            type="file"
            name="MemberSignature"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Edit;
