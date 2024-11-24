import React, { useState, useRef  } from 'react';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';
import FaDownload from 'react-icons/lib/fa/download';
import FaLock from 'react-icons/lib/fa/lock';

const Note = ({ children, index, onChange, onRemove }) => {
  const [editing, setEditing] = useState(false);
  const [locked, setLocked] = useState(false);
  const newText = useRef(null);

  const edit = () => {
    if (!locked) {
      setEditing(true);
    }
  };

  const remove = () => {
    onRemove(index);
  };

  const save = (e) => {
    e.preventDefault();
    if (newText.current) {
      onChange(newText.current.value, index);
    }
    setEditing(false);
  };

  const downloadNote = () => {
    const element = document.createElement('a');
    const file = new Blob([children], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `note-${index}.txt`; // File name
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element); // Clean up
  };

  const toggleLock = () => {
    setLocked((prevLocked) => !prevLocked);
  };

  const renderForm = () => (
    <div className="note">
      <form onSubmit={save}>
        <textarea ref={newText} defaultValue={children} />
        <button id="save">
          <FaFloppyO />
        </button>
      </form>
    </div>
  );

  const renderDisplay = () => (
    <div className="note">
      <p>{children}</p>
      <span>
        <button onClick={edit} id="edit">
          <FaPencil />
        </button>
        <button onClick={remove} id="remove">
          <FaTrash />
        </button>
        <button onClick={downloadNote} id="download">
          <FaDownload />
        </button>
        <button onClick={toggleLock} id="lock">
          <FaLock color={locked ? 'red' : 'black'} />
        </button>
      </span>
    </div>
  );

  return editing ? renderForm() : renderDisplay();
};

export default Note;
