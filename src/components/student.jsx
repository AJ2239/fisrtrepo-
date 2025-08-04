import React, { useEffect, useState } from 'react';
import StudentChild from './studentchild';
import { useNavigate } from "react-router-dom";
import user from "./studentlogin.png";
import { db } from "../firebase";
import {
  collection, addDoc, getDocs, query, doc, updateDoc, deleteDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Student = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    department: '',
  });
  const [selectedColor, setSelectedColor] = useState('bg-blue-200');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInEmail");
    localStorage.removeItem("loggedinname");
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({ ...prev, [name]: value }));
  };

  const addStudent = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in!");
      return;
    }

    if (!newStudent.name || !newStudent.rollNo || !newStudent.department) {
      alert("Please fill all fields.");
      return;
    }

    const studentData = {
      ...newStudent,
      color: selectedColor,
      uid: user.uid,
      timestamp: new Date(),
    };

    try {
      if (editId) {
        const docRef = doc(db, "users", user.uid, "students", editId);
        await updateDoc(docRef, studentData);
        setStudents(prev =>
          prev.map(s => (s.id === editId ? { ...s, ...studentData } : s))
        );
        setEditId(null);
      } else {
        const docRef = await addDoc(collection(db, "users", user.uid, "students"), studentData);
        setStudents(prev => [...prev, { ...studentData, id: docRef.id }]);
      }
      setNewStudent({ name: '', rollNo: '', department: '' });
    } catch (error) {
      console.error("Error adding/updating student:", error);
      alert("Failed to save student!");
    }
  };

  const fetchStudents = async (uid) => {
    try {
      const q = query(collection(db, "users", uid, "students"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleEdit = (student) => {
    setNewStudent({
      name: student.name,
      rollNo: student.rollNo,
      department: student.department,
    });
    setSelectedColor(student.color || 'bg-blue-200');
    setEditId(student.id);
  };

  const handleDelete = async (id) => {
    const user = auth.currentUser;
    if (!user) return;
     
     const confirmDelete = window.confirm("Are you sure you want to delete this student?");
  if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "students", id));
      setStudents(prev => prev.filter(s => s.id !== id));
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete!");
    }
  };

  //  New useEffect to load after refresh
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchStudents(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className='h-screen flex bg-teal-900 pt-3'>
      {/* User dropdown */}
      <div className="absolute top-4 right-6 z-50 bg-red-200">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-white text-cyan-900 px-4 py-2 rounded hover:bg-gray-200 shadow flex items-center gap-2"
        >
          <img src={user} alt="user" className='size-8' />
          {auth.currentUser?.displayName || ''}
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

      {/* Main Section */}
      <div className="flex-1">
        <h1 className='text-center text-6xl font-bold text-white'>Student Records</h1>

        <div className='p-12 mx-10 mb-8 flex items-center gap-5 flex-wrap'>

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={handleInputChange}
            className='p-3 rounded-md border border-gray-300 w-52 focus:outline-none focus:ring-2 focus:ring-cyan-700'
          />

          <input
            type="text"
            name="rollNo"
            placeholder="Roll No"
            value={newStudent.rollNo}
            onChange={handleInputChange}
            className='p-3 rounded-md border border-gray-300 w-40 focus:outline-none focus:ring-2 focus:ring-cyan-700'
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={newStudent.department}
            onChange={handleInputChange}
            className='p-3 rounded-md border border-gray-300 w-48 focus:outline-none focus:ring-2 focus:ring-cyan-700'
          />

          <div className='flex items-center gap-2'>
            <label htmlFor="color" className='text-white font-semibold whitespace-nowrap'>Choose Color:</label>
            <input
              type="color"
              id="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-gray-400"
            />
          </div>

          <button
            onClick={addStudent}
            className='bg-white text-cyan-900 px-6 py-3 rounded-md whitespace-nowrap'
          >
            {editId ? 'Update Student' : 'Add Student'}
          </button>

        </div>

        <div className='flex flex-wrap'>
          {students
            .filter(student => student.name && student.rollNo && student.department)
            .map(student => (
              <StudentChild
                key={student.id}
                student={student}
                color={student.color}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          }

          <ToastContainer position="bottom-center" autoClose={2000} />

        </div>
      </div>
    </div>
  );
};

export default Student;
 