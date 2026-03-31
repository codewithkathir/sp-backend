CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  department VARCHAR(100),
  location VARCHAR(100),
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_status (status)
);

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  status ENUM('planning', 'in_progress', 'completed', 'on_hold') NOT NULL DEFAULT 'planning',
  priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
  client VARCHAR(150),
  owner_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_projects_owner FOREIGN KEY (owner_id) REFERENCES users(id),
  INDEX idx_status (status),
  INDEX idx_priority (priority),
  INDEX idx_owner (owner_id),
  INDEX idx_client (client)
);

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status ENUM('todo', 'in_progress', 'qa', 'blocked', 'done') NOT NULL DEFAULT 'todo',
  priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
  due_date DATE,
  assignee_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_tasks_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  CONSTRAINT fk_tasks_assignee FOREIGN KEY (assignee_id) REFERENCES users(id),
  INDEX idx_project (project_id),
  INDEX idx_status (status),
  INDEX idx_priority (priority),
  INDEX idx_assignee (assignee_id),
  INDEX idx_due_date (due_date)
);

CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_comments_task FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_task (task_id),
  INDEX idx_user (user_id),
  INDEX idx_created (created_at)
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id INT,
  meta JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_logs_user FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user (user_id),
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_action (action),
  INDEX idx_created (created_at)
);
