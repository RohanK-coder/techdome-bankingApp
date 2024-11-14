#!/bin/bash

# Navigate to the frontend directory and start the frontend
cd frontend
npm run dev &

# Navigate to the backend directory and start the backend
cd ../backend
npm start &

# Wait for both background processes to finish
wait
