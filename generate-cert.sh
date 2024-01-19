#!/bin/bash

# Install Certbot and the Nginx plugin
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx -y

# Get SSL cert for domain and www subdomain
sudo certbot --nginx -d atlas-data.co -d www.atlas-data.co

# Restart Nginx to apply changes
sudo systemctl restart nginx
