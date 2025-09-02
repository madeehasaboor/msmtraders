#!/usr/bin/env python3

# Read the car care HTML file
with open('car care.html', 'r', encoding='utf-8') as file:
    content = file.read()

# Replace all instances of "products/" with empty string
fixed_content = content.replace('products/', '')

# Write the fixed content back to the file
with open('car care.html', 'w', encoding='utf-8') as file:
    file.write(fixed_content)

print("Image paths fixed successfully!")
