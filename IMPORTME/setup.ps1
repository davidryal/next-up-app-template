#!/usr/bin/env pwsh

# Function to update package.json
function Update-PackageJson {
    param (
        [string]$ProjectName
    )

    $packageJson = Get-Content package.json | ConvertFrom-Json
    $packageJson.name = $ProjectName
    $packageJson.version = "0.1.0"
    $packageJson.description = "A Next.js project based on the dynamic template starter"
    $packageJson.author = "Your Name <your.email@example.com>"

    $packageJson | ConvertTo-Json -Depth 10 | Set-Content package.json
}

# Remove existing git repository
Remove-Item -Path .git -Recurse -Force -ErrorAction SilentlyContinue

# Initialize new git repository
git init

# Update package.json with project-specific details
Update-PackageJson -ProjectName (Split-Path -Leaf $PWD)

# Copy environment example if .env doesn't exist
if (-not (Test-Path .env.local)) {
    Copy-Item .env.example .env.local
}

# Install dependencies
npm install

# Start development server
npm run dev
