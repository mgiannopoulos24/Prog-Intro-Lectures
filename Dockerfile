# Use the official Python image as the base
FROM python:3.11-bullseye

RUN apt-get update && apt-get install -y gcc

# Set the working directory inside the Docker container
WORKDIR /app/src/backend

# Copy all files from the src/backend directory into the working directory
COPY src/backend/ . 
COPY requirements.txt .

# Install Python dependencies (no need to copy requirements.txt separately)
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port your app runs on
EXPOSE 5000

# Command to run the Flask app
CMD ["python", "main.py"]
