#!/bin/bash

# Create directories if they don't exist
mkdir -p public/news
mkdir -p public/leadership

# Download hero images
curl -o public/hero-bg.jpg "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
curl -o public/about-hero.jpg "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80"

# Download news images
curl -o public/news/science-fair.jpg "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80"
curl -o public/news/sports-complex.jpg "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80"
curl -o public/news/scholarship.jpg "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"

# Download leadership images
curl -o public/leadership/principal.jpg "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
curl -o public/leadership/vice-principal.jpg "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
curl -o public/leadership/curriculum-director.jpg "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&q=80"

# Download other images
curl -o public/academics-curriculum.jpg "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80"
curl -o public/student-life-sports.jpg "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80"
curl -o public/history.jpg "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80" 