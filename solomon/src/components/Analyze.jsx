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
    {
      id: 1,
      name: 'SWOT',
      content: 'quadrantChart\ntitle SWOT Analysis - Duolingo\nx-axis Helpful --> Harmful\ny-axis External --> Internal\nquadrant-1 Weaknesses\nquadrant-2 Strengths\nquadrant-3 Opportunities\nquadrant-4 Threats\n\"Limited Advanced Content\": [0.6, 0.85]\n\"Monetization Challenges\": [0.8, 0.65]\n\"Gamified Learning\": [0.2, 0.9]\n\"AI & Personalization\": [0.35, 0.7]\n\"Strong Brand Recognition\": [0.1, 0.6]\n\"Community Engagement\": [0.45, 0.65]\n\"Growing Language Market\": [0.1, 0.2]\n\"Expansion to New Languages/Subjects\": [0.3, 0.4]\n\"Competition from Alternatives\": [0.7, 0.1]\n\"Data Privacy Concerns\": [0.8, 0.3]'
    },
    { 
      id: 2, 
      name: 'PESTEL', 
      content: 'classDiagram\n    note \"PESTEL Analysis: Akamai\"\n    direction LR\n\n    class Political {\n        +Cybersecurity Regulations\n        +Internet Governance\n        +International Trade Policies\n        +Government Contracts\n        +Geopolitical Instability\n    }\n\n    class Economic {\n        +Global Economic Growth\n        +Inflation and Interest Rates\n        +Currency Exchange Rates\n        +Digital Transformation\n        +Emerging Markets\n    }\n\n    class Social {\n        +Increased Internet Usage\n        +Data Privacy Concerns\n        +Remote Work and Online Learning\n        +Consumer Expectations\n        +Digital Divide\n    }\n\n    class Technological {\n        +Cloud Computing\n        +5G and Edge Computing\n        +AI and Machine Learning\n        +Cybersecurity Threats\n        +IoT\n    }\n\n    class Environmental {\n        +Energy Consumption\n        +Data Center Sustainability\n        +E-waste Management\n        +Climate Change\n        +Regulations on Carbon Emissions\n    }\n\n    class Legal {\n        +Data Privacy Regulations\n        +Cybersecurity Laws\n        +Intellectual Property Rights\n        +Contract Law\n        +Internet Content Regulation\n    }\n\n    note for Political \"Impacts Akamai\'s service demand and compliance.\"\n    note for Economic \"Affects Akamai\'s revenue and profitability.\"\n    note for Social \"Drives demand for Akamai\'s services.\"\n    note for Technological \"Presents opportunities and challenges for Akamai.\"\n    note for Environmental \"Influences Akamai\'s operational sustainability.\"\n    note for Legal \"Defines Akamai\'s compliance requirements.\"' 
    },
    {
      id: 3,
      name: 'Piechart',
      content: '%%{init: {\"pie\": {\"textPosition\": 0.7}, \"themeVariables\": {\"pieOuterStrokeWidth\": \"3px\"}} }%%\npie showData\n    title Elements in Product Y\n    \"Sodium\" : 30.5\n    \"Chloride\" : 60.0\n    \"Zinc\" : 15.5\n    \"Copper\" : 8'
    },
    { id: 4, name: 'Flowchart', content: 'graph TD\n    A[Start] --> B{Is it working?}\n    B -->|Yes| C[Great!]\n    B -->|No| D[Debug]\n    D --> B' },
    { id: 5, name: 'Sequence Diagram', content: 'sequenceDiagram\n    participant User\n    participant System\n    User->>System: Request Data\n    System->>User: Return Data' }




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

  // Handle generate
  const handleGenerate = () => {
    // Placeholder for generate functionality
    console.log("Generate button clicked");
    // Add your generation logic here
    alert("Generate diagram feature coming soon!");
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
          <div className={styles.buttonContainer}>
            <button 
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={handleGenerate}
              style={{ marginRight: '10px' }}
            >
              Generate
            </button>
            <button 
              className={`${styles.button} ${isEditing ? styles.saveButton : styles.primaryButton}`}
              onClick={handleToggleEdit}
            >
              {isEditing ? 'Save Changes' : 'Edit Diagram'}
            </button>
          </div>
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