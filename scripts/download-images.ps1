# Create necessary directories
New-Item -ItemType Directory -Force -Path "public/news"
New-Item -ItemType Directory -Force -Path "public/leadership"
New-Item -ItemType Directory -Force -Path "public/academics"
New-Item -ItemType Directory -Force -Path "public/about"

# Function to download an image
function Download-Image {
    param (
        [string]$Url,
        [string]$OutputPath
    )
    try {
        Invoke-WebRequest -Uri $Url -OutFile $OutputPath
        Write-Host "Downloaded: $OutputPath"
    }
    catch {
        Write-Host "Failed to download: $Url"
    }
}

# Download hero and background images
Download-Image "https://picsum.photos/1920/1080" "public/hero-bg.jpg"
Download-Image "https://picsum.photos/1920/1080" "public/about-hero.jpg"

# Download news images
Download-Image "https://picsum.photos/800/600" "public/news/science-fair.jpg"
Download-Image "https://picsum.photos/800/600" "public/news/sports-complex.jpg"
Download-Image "https://picsum.photos/800/600" "public/news/scholarship.jpg"

# Download leadership images
Download-Image "https://picsum.photos/400/400" "public/leadership/principal.jpg"
Download-Image "https://picsum.photos/400/400" "public/leadership/deputy.jpg"
Download-Image "https://picsum.photos/400/400" "public/leadership/head-teacher.jpg"

# Download academics images
Download-Image "https://picsum.photos/800/600" "public/academics/curriculum.jpg"
Download-Image "https://picsum.photos/800/600" "public/academics/laboratory.jpg"
Download-Image "https://picsum.photos/800/600" "public/academics/library.jpg"
Download-Image "https://picsum.photos/800/600" "public/academics/classroom.jpg"

# Download about page images
Download-Image "https://picsum.photos/800/600" "public/about/history.jpg"
Download-Image "https://picsum.photos/800/600" "public/about/mission.jpg"
Download-Image "https://picsum.photos/800/600" "public/about/values.jpg"

Write-Host "Image download completed!" 