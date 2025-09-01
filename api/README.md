# Equipment Repair System - PHP API

## Setup Instructions

### 1. Database Setup
1. Create MySQL database named `equipment_repair`
2. Run the SQL schema file: `database/schema.sql`
3. Update database credentials in `config/database.php`

### 2. Server Setup
1. Place the `api` folder in your web server directory (e.g., `htdocs`, `www`)
2. Ensure PHP 7.4+ and MySQL are installed
3. Enable CORS for localhost:3000 (already configured)

### 3. API Endpoints

#### Authentication
- `POST /api/endpoints/auth.php` - User login
  \`\`\`json
  {
    "action": "login",
    "username": "admin",
    "password": "password"
  }
  \`\`\`

#### Users
- `GET /api/endpoints/users.php` - Get all users
- `POST /api/endpoints/users.php` - Create new user

#### Equipment
- `GET /api/endpoints/equipment.php` - Get all equipment
- `GET /api/endpoints/equipment.php?code=PC-001` - Get equipment by code
- `POST /api/endpoints/equipment.php` - Create new equipment
- `PUT /api/endpoints/equipment.php` - Update equipment

#### Repair Requests
- `GET /api/endpoints/repair-requests.php` - Get all repair requests
- `GET /api/endpoints/repair-requests.php?technician_id=2` - Get requests by technician
- `POST /api/endpoints/repair-requests.php` - Create new repair request
- `PUT /api/endpoints/repair-requests.php` - Update repair request
- `DELETE /api/endpoints/repair-requests.php` - Delete repair request

### 4. Default Login Credentials
- **Admin**: username: `admin`, password: `password`
- **Technician 1**: username: `tech1`, password: `password`
- **Technician 2**: username: `tech2`, password: `password`

### 5. Next.js Integration
Update your Next.js app to call these PHP endpoints instead of using localStorage.

Example API call from Next.js:
\`\`\`javascript
const response = await fetch('http://localhost/api/endpoints/repair-requests.php');
const data = await response.json();
\`\`\`

## Security Notes
- Change default passwords in production
- Use environment variables for database credentials
- Implement JWT tokens for better authentication
- Add input validation and sanitization
- Use HTTPS in production
