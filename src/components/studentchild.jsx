import React from 'react';

const StudentChild = ({ student, color, onEdit, onDelete }) => {
  return (
    // <div className={`border border-gray-300 rounded-lg p-4 m-2 w-64 ${color}`}>
    <div className="border border-gray-300 rounded-lg p-4 m-2 w-64" style={{ backgroundColor: color }}>

      <h3 className='font-semibold'>Name: {student.name}</h3>
      <p>Roll No: {student.rollNo}</p>
      <p>Department: {student.department}</p>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(student)}
          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(student.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentChild;
