#!/usr/bin/env bash

# Load environment variables from a dedicated .env file.
# Usage:
#   1) Copy .env.example -> .env (first time) and fill secrets
#   2) source scripts/supabase-env.sh
#   3) ./mvnw spring-boot:run

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

set -a
source "$SCRIPT_DIR/../.env"
set +a

echo "Loaded environment from dalcs-cd-springboot/.env"
