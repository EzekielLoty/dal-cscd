#!/bin/bash

# Script to make a user an admin
# Usage: ./scripts/make-admin.sh user@dal.ca

if [ -z "$1" ]; then
    echo "Usage: ./scripts/make-admin.sh <email>"
    echo "Example: ./scripts/make-admin.sh admin@dal.ca"
    exit 1
fi

EMAIL=$1

# Database credentials from application.properties
PGPASSWORD=135246 psql -h localhost -U postgres -d postgres <<EOF
UPDATE dalcscd.users SET role = 'ADMIN' WHERE email = '$EMAIL';
SELECT email, role FROM dalcscd.users WHERE email = '$EMAIL';
EOF

echo ""
echo "✅ User $EMAIL has been updated to ADMIN role"
echo "⚠️  User must login again to get a new JWT token with admin privileges"
