import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [chapters, setChapters] = useState(["Task 1"]);
  const [newChapter, setNewChapter] = useState("");

  const addChapter = () => {
    if (newChapter.trim() !== "") {
      setChapters([...chapters, newChapter]);
      setNewChapter("");
    }
  };

  const removeChapter = (index) => {
    const updated = chapters.filter((_, i) => i !== index);
    setChapters(updated);
  };

  const editChapter = (index, updatedName) => {
    const updated = [...chapters];
    updated[index] = updatedName;
    setChapters(updated);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">To-Do-List</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="/">Features</a></li>
              <li className="nav-item"><a className="nav-link" href="/">Pricing</a></li>
              <li className="nav-item"><a className="nav-link disabled" href="/">Disabled</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Task Name"
                  value={newChapter}
                  onChange={(e) => setNewChapter(e.target.value)}
                />
                <button className="btn btn-success" onClick={addChapter}>Add</button>
              </div>

              <ul className="list-group">
                {chapters.length === 0 ? (
                  <h3 className="emptyMsg">No task added yet.</h3>
                ) : (
                  chapters.map((chapter, index) => (
                    <ChapterItem
                      key={index}
                      chapter={chapter}
                      onRemove={() => removeChapter(index)}
                      onEdit={(newName) => editChapter(index, newName)}
                    />
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ChapterItem({ chapter, onRemove, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(chapter);

  const toggleEdit = () => {
    if (isEditing) {
      onEdit(tempName);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {isEditing ? (
        <input
          type="text"
          className="form-control flex-grow-1 me-2"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
        />
      ) : (
        <h5 className="flex-grow-1 mb-0">{chapter}</h5>
      )}
      <button className="btn btn-warning me-2" onClick={toggleEdit}>
        {isEditing ? "Done" : "Edit"}
      </button>
      <button className="btn btn-danger" onClick={onRemove}>Remove</button>
    </li>
  );
}

export default App;
