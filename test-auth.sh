#!/bin/bash

# Define your live Codespace URL
BASE_URL="https://musical-meme-x599q44xq6xcpwxp-5000.app.github.dev/api"

echo "========================================="
echo "🚀 1. Executing Master Admin Seed"
echo "========================================="
curl -s -X POST "$BASE_URL/auth/seed" | jq . || curl -s -X POST "$BASE_URL/auth/seed"

echo -e "\n\n========================================="
echo "🔐 2. Testing Admin Login & JWT Issuance"
echo "========================================="
curl -s -X POST "$BASE_URL/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"user":"rid_admin", "password":"thinkagain"}' | jq . || \
curl -s -X POST "$BASE_URL/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"user":"rid_admin", "password":"thinkagain"}'
     
echo -e "\n\n✅ Live connection tests complete."
