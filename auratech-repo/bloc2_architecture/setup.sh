#!/bin/bash
echo "[INFO] Starting Aurora Tech Architecture Setup..."
echo "[INFO] Spinning up PostgreSQL Data Warehouse..."

# Start docker-compose in detached mode
docker-compose up -d

echo "[INFO] Waiting for PostgreSQL to initialize..."
sleep 5

echo "[INFO] Applying init.sql schema..."
docker exec -i auroratech_postgres_dw psql -U auroratech_admin -d auroratech_chromebook_dw < ./init.sql

echo "[SUCCESS] Environment is ready. Data Warehouse running on port 5432."
