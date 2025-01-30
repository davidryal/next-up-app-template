# Initialize Prisma and create initial migration
npx prisma generate
npx prisma db push

# Create SQLite database
if (!(Test-Path "prisma/dev.db")) {
    Write-Host "Creating development database..."
    New-Item -ItemType File -Path "prisma/dev.db" -Force
}
