import React, { useState, useEffect } from 'react';
import mermaid from 'mermaid';
import styles from '../analyze.module.css';

function Analyze() {
  // Initialize mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'monospace'
    });
  }, []);

  // State for managing files and currently selected file
  const [files, setFiles] = useState([
    { id: 1, name: 'Flowchart Example', content: 'graph TD\n    A[Start] --> B{Is it working?}\n    B -->|Yes| C[Great!]\n    B -->|No| D[Debug]\n    D --> B' },
    { id: 2, name: 'Sequence Diagram', content: 'sequenceDiagram\n    participant User\n    participant System\n    User->>System: Request Data\n    System->>User: Return Data' }
  ]);
  const [selectedFile, setSelectedFile] = useState(files[0]);
  const [newFileName, setNewFileName] = useState('');
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [editingContent, setEditingContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Render diagram whenever selected file changes
  useEffect(() => {
    mermaid.contentLoaded();
    if (selectedFile) {
      setEditingContent(selectedFile.content);
    }
  }, [selectedFile]);

  // Handle file selection
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setIsEditing(false);
  };

  // Handle adding a new file
  const handleAddFile = () => {
    setIsAddingFile(true);
  };

  // Handle file name input change
  const handleFileNameChange = (e) => {
    setNewFileName(e.target.value);
  };

  // Handle save new file
  const handleSaveFile = () => {
    if (newFileName.trim() === '') return;
    
    const newFile = {
      id: files.length + 1,
      name: newFileName,
      content: 'graph TD\n    A[Start] --> B[End]'
    };
    
    setFiles([...files, newFile]);
    setSelectedFile(newFile);
    setNewFileName('');
    setIsAddingFile(false);
  };

  // Handle cancel adding file
  const handleCancelAdd = () => {
    setNewFileName('');
    setIsAddingFile(false);
  };

  // Handle content editing
  const handleContentChange = (e) => {
    setEditingContent(e.target.value);
  };

  // Toggle edit mode
  const handleToggleEdit = () => {
    if (isEditing) {
      // Save changes
      const updatedFiles = files.map(file => 
        file.id === selectedFile.id ? {...file, content: editingContent} : file
      );
      setFiles(updatedFiles);
      setSelectedFile({...selectedFile, content: editingContent});
    }
    setIsEditing(!isEditing);
  };

  // Handle diagram rendering
  const renderDiagram = () => {
    try {
      return { __html: `<div class="mermaid">${selectedFile.content}</div>` };
    } catch (error) {
      console.error("Mermaid rendering error:", error);
      return { __html: `<div class="error">Error rendering diagram</div>` };
    }
  };

  return (
    <div className={styles.container}>
      {/* Side Menu */}
      <div className={styles.sideMenu}>
        <h1 className={styles.title}>Mermaid Files</h1>
        
        <div className={styles.fileList}>
          <ul>
            {files.map((file) => (
              <li 
                key={file.id}
                className={`${styles.fileItem} ${selectedFile.id === file.id ? styles.fileItemActive : ''}`}
                onClick={() => handleFileSelect(file)}
              >
                {file.name}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Add File Section */}
        <div className={styles.addFileSection}>
          {isAddingFile ? (
            <div>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter file name"
                value={newFileName}
                onChange={handleFileNameChange}
              />
              <div className={styles.buttonGroup}>
                <button 
                  className={`${styles.button} ${styles.primaryButton}`}
                  onClick={handleSaveFile}
                >
                  Save
                </button>
                <button 
                  className={`${styles.button} ${styles.secondaryButton}`}
                  onClick={handleCancelAdd}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              className={`${styles.button} ${styles.primaryButton} ${styles.fullWidthButton}`}
              onClick={handleAddFile}
            >
              Add File
            </button>
          )}
        </div>
      </div>
      
      {/* Content Area */}
      <div className={styles.contentArea}>
        <div className={styles.contentHeader}>
          <h2 className={styles.contentTitle}>{selectedFile.name}</h2>
          <button 
            className={`${styles.button} ${isEditing ? styles.saveButton : styles.primaryButton}`}
            onClick={handleToggleEdit}
          >
            {isEditing ? 'Save Changes' : 'Edit Diagram'}
          </button>
        </div>
        
        {/* Render Mermaid Diagram */}
        <div className={styles.diagramContainer}>
          <h3 className={styles.sectionTitle}>Diagram Preview</h3>
          <div 
            className={styles.diagramPreview} 
            dangerouslySetInnerHTML={renderDiagram()}
          />
        </div>
        
        {/* Source Code */}
        <div>
          <h3 className={styles.sectionTitle}>Source Code</h3>
          {isEditing ? (
            <textarea
              className={styles.codeEditor}
              value={editingContent}
              onChange={handleContentChange}
            />
          ) : (
            <div className={styles.codeViewer}>
              {selectedFile.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analyze;