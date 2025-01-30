#!/usr/bin/env pwsh

# Function to update package.json
function Update-PackageJson {
    param (
        [string]$ProjectName,
        [string[]]$Platforms = @("web"),
        [string]$Auth = "none",
        [string]$Database = "none",
        [string]$State = "none"
    )

    function Merge-Dependencies {
        param (
            [string]$ConfigPath,
            [string]$Section,
            [string[]]$Features
        )
        
        $config = Get-Content $ConfigPath | ConvertFrom-Json
        $deps = @{}
        $devDeps = @{}
        
        foreach ($feature in $Features) {
            if ($config.$Section.$feature.dependencies) {
                $deps += $config.$Section.$feature.dependencies
            }
            if ($config.$Section.$feature.devDependencies) {
                $devDeps += $config.$Section.$feature.devDependencies
            }
        }
        
        return @{
            dependencies = $deps
            devDependencies = $devDeps
        }
    }

    # Validate inputs
    $validPlatforms = @("web", "mobile", "desktop")
    $validAuth = @("none", "nextauth", "firebase")
    $validDatabase = @("none", "prisma", "mongodb")
    $validState = @("none", "zustand", "redux")

    foreach ($platform in $Platforms) {
        if ($platform -notin $validPlatforms) {
            Write-Error "Invalid platform: $platform"
            exit 1
        }
    }

    if ($Auth -notin $validAuth) {
        Write-Error "Invalid auth option: $Auth"
        exit 1
    }

    if ($Database -notin $validDatabase) {
        Write-Error "Invalid database option: $Database"
        exit 1
    }

    if ($State -notin $validState) {
        Write-Error "Invalid state management option: $State"
        exit 1
    }

    # Read base package.json
    $packageJson = Get-Content "package.json" | ConvertFrom-Json

    # Merge platform dependencies
    $platformDeps = Merge-Dependencies -ConfigPath "templates/configs/package.platforms.json" -Section "platforms" -Features $Platforms

    # Merge feature dependencies
    $featureDeps = @()
    if ($Auth -ne "none") {
        $featureDeps += Merge-Dependencies -ConfigPath "templates/configs/package.features.json" -Section "auth" -Features @($Auth)
    }
    if ($Database -ne "none") {
        $featureDeps += Merge-Dependencies -ConfigPath "templates/configs/package.features.json" -Section "database" -Features @($Database)
    }
    if ($State -ne "none") {
        $featureDeps += Merge-Dependencies -ConfigPath "templates/configs/package.features.json" -Section "state" -Features @($State)
    }

    # Update package.json
    $packageJson.dependencies = $platformDeps.dependencies + $featureDeps.dependencies
    $packageJson.devDependencies = $platformDeps.devDependencies + $featureDeps.devDependencies

    # Write updated package.json
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"

    # Copy platform-specific configs
    foreach ($platform in $Platforms) {
        if ($platform -eq "mobile" -and (Test-Path "templates/configs/app.json")) {
            Copy-Item "templates/configs/app.json" "app.json"
        }
        if ($platform -eq "desktop" -and (Test-Path "templates/configs/tauri.conf.json")) {
            New-Item -ItemType Directory -Force -Path "src-tauri"
            Copy-Item "templates/configs/tauri.conf.json" "src-tauri/tauri.conf.json"
        }
    }

    # Initialize git repository
    git init
    git add .
    git commit -m "Initial commit: Project setup with selected features"

    # Install dependencies
    npm install

    Write-Host "Setup complete! Project initialized with:"
    Write-Host "Platforms: $($Platforms -join ', ')"
    Write-Host "Auth: $Auth"
    Write-Host "Database: $Database"
    Write-Host "State Management: $State"
}

# Remove existing git repository
Remove-Item -Path .git -Recurse -Force -ErrorAction SilentlyContinue

# Initialize new git repository if .git doesn't exist
if (!(Test-Path ".git")) {
    git init
}

# Update package.json with project-specific details
Update-PackageJson -ProjectName (Split-Path -Leaf $PWD) -Platforms @("web") -Auth "none" -Database "none" -State "none"

# Copy environment file if it doesn't exist
if (!(Test-Path ".env.local")) {
    Copy-Item ".env.example" ".env.local"
}

# Setup database
./scripts/db-setup.ps1

# Initialize Husky
npm run prepare

Write-Host "Setup complete! Next steps:"
Write-Host "1. Edit .env.local with your configuration"
Write-Host "2. Run 'npm run dev' to start development server"
