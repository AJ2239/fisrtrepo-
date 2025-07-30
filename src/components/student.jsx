import React, { useState } from 'react';
import StudentChild from './studentchild';
import { useNavigate } from "react-router-dom";
import user from "./studentlogin.png"



const Student = () => {
     const navigate = useNavigate();
     const email = localStorage.getItem("loggedInEmail");
    const name = localStorage.getItem("loggedinname");

 const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };  

    // const [students, setStudents] = useState([]);
    const [students, setStudents] = useState(() => {
  const saved = localStorage.getItem(`students_${email}`);
  return saved ? JSON.parse(saved) : [];
});

    const [newStudent, setNewStudent] = useState({
        name: '',
        rollNo: '',
        department: '',
    });
    const [selectedColor, setSelectedColor] = useState('bg-blue-200');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const colorOptions = [
        'bg-blue-200',
        'bg-green-200',
        'bg-yellow-200',
        'bg-pink-200',
        'bg-purple-200',
        'bg-indigo-200',
        'bg-red-200',
        'bg-gray-200',
        'bg-teal-200',
        'bg-orange-200'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent(prev => ({ ...prev, [name]: value }));
    };

    const addStudent = () => {
  if (newStudent.name && newStudent.rollNo && newStudent.department) {
    const updatedStudents = [...students, { ...newStudent, color: selectedColor }];
    setStudents(updatedStudents);
    localStorage.setItem(`students_${email}`, JSON.stringify(updatedStudents));
    setNewStudent({ 
      name: '', 
      rollNo: '', 
      department: '',
    });
  }
};


    return (
        <div className='h-screen flex bg-teal-900 pt-3'>
            {/* <button
      onClick={logout}
      className="absolute top-4 right-6 bg-white text-cyan-900 px-4 py-2 rounded hover:bg-red-300 z-50"
    >
      Logout
    </button> */}
    <div className="absolute top-4 right-6 z-50">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-white text-cyan-900 px-4 py-2 rounded hover:bg-gray-200 shadow flex"
        ><img src={user} className='size-8'></img>
          {name}
        </button>

        {dropdownOpen && (
          <div className="mt-2 bg-white border rounded shadow w-40 absolute right-0">
            <button
              onClick={logout}
              className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
            {/* Color Selection Panel */}
            <div className='w-24 mr-8 pl-4'>
                
                <h3 className='text-white mb-4 text-md font-bold  '>Choose Color</h3>
                <div className='grid grid-cols-1 gap-2'>
                    {colorOptions.map((color, index) => (
                        <div 
                            key={index}
                            className={`h-10 w-20 rounded-md cursor-pointer border-2 ${color} ${
                                selectedColor === color ? 'border-white' : 'border-transparent'
                            }`}
                            onClick={() => setSelectedColor(color)}
                            
                        />
                    ))}
                </div>
            </div>

            
            <div >
                <h1 className='text-center text-6xl font-bold text-white'>Student Records</h1>
               
 
                <div className='m-10'>
                    <input
                        type="text"
                        name="name"
                        placeholder="Student Name"
                        value={newStudent.name}
                        onChange={handleInputChange}
                        className='p-3 mr-5 rounded-md '
                    />
                    <input
                        type="text"
                        name="rollNo"
                        placeholder="Roll No"
                        value={newStudent.rollNo}
                        onChange={handleInputChange}
                        className='p-3 mr-5 rounded-md '
                    />
                    <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={newStudent.department}
                        onChange={handleInputChange}
                        className='p-3 mr-5 rounded-md '
                    />
                    <button 
                        onClick={addStudent} 
                        className='bg-white p-3 rounded-md text-cyan-900 mt-2'
                    >
                        Add Student
                    </button>
                </div>
                
                <div className='flex flex-wrap'>
                    {students.map((student, index) => (
                        <StudentChild 
                            key={index} 
                            student={student}
                            color={student.color}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Student;