import React from 'react';

const StudentChild = ({ student, color }) => {
    return (
        <div className={`border border-gray-300 rounded-lg p-4 m-2 w-64 ${color}`}>
            <h3 className='font-semibold'>Name: {student.name}</h3>
            <p>Roll No: {student.rollNo}</p>
            <p>Department: {student.department}</p>
        </div>
    );
};

export default StudentChild;