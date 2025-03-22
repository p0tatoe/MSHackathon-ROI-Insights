import React, { useState } from 'react';
import styles from '../sidebar.module.css';

const Sidebar = ({ items = [], title = "Menu" }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>{title}</h2>
        <button 
          className={styles.toggleButton} 
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className={styles.sidebarNav}>
        <ul className={styles.sidebarList}>
          {items.map((item, index) => (
            <li key={index} className={styles.sidebarItem}>
              {item.icon && <span className={styles.sidebarIcon}>{item.icon}</span>}
              {!isCollapsed && <span className={styles.sidebarLabel}>{item.label}</span>}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className={styles.sidebarFooter}>
        {!isCollapsed && <p>© 2025 Solomon</p>}
      </div>
    </div>
  );
};

export default Sidebar;