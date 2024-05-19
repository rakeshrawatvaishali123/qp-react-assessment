import React, { useState } from "react";
import "../src/todo.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Todo() {
    const [val, setVal] = useState("");
    const [data, setData] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [showCompleteTask, setShowCompleteTask] = useState(false);
    const [isChecked, setIsChecked] = useState({});

    const handleAdd = () => {
        if (val.trim()) {
            setData([...data, val]);
            setVal("");
        }
    }

    const handleDelete = (ind) => {
        let newCompleted = completed.filter((val) => val !== data[ind]);
        setCompleted(newCompleted);
        let newData = data.filter((_, index) => index !== ind);
        setData(newData);
    }

    const handleEdit = (ind) => {
        let newCompleted = completed.filter((val) => val !== data[ind]);
        setCompleted(newCompleted);
        setVal(data[ind]);
        let newData = data.filter((_, index) => index !== ind);
        setData(newData);
    }

    const handleChange = (e) => {
        if (e.target.checked) {
            setCompleted([...completed, e.target.name]);
        } else {
            let newData = completed.filter((val) => val !== e.target.name);
            setCompleted(newData);
        }
        setIsChecked((prev) => ({
            ...prev,
            [e.target.name]: e.target.checked
        }));
    }

    const handleShowCompleteTask = () => {
        setShowCompleteTask(!showCompleteTask);
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Add task here!"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                        />
                        <button className="btn btn-primary" style={{marginLeft:"5px"}} onClick={handleAdd}>Add</button>
                    </div>
                    <button className="btn btn-secondary mb-3" onClick={handleShowCompleteTask}>
                        {showCompleteTask ? "Hide" : "Show"} Completed Task List
                    </button>
                    {showCompleteTask && completed.length > 0 && (
                        <div className="completed-tasks mb-3">
                            <h5>Completed Tasks</h5>
                            {completed.map((val, index) => (
                                <p key={index}>{val}</p>
                            ))}
                        </div>
                    )}
                    <div className="task-list">
                        {data.length > 0 ? data.map((value, index) => (
                            <div key={index} className="task-item d-flex align-items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={index}
                                    name={value}
                                    checked={isChecked[value] || false}
                                    onChange={(e) => handleChange(e)}
                                    className="form-check-input me-2"
                                />
                                <p className="task me-3 mb-0">{value}</p>
                                <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(index)}>Delete</button>
                                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(index)}>Edit</button>
                            </div>
                        )) : <p>No tasks added yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
