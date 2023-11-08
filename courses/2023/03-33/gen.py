import yaml
import os

# Load the data from your file
with open('youtube.yml', 'r') as f:
    data = yaml.safe_load(f)

# Iterate over the loaded list of dictionaries
for item in data:
    # Format date entry to remove leading zeroes
    item['date'] = ' '.join(str(int(x)) for x in item['date'].split(' '))

    # Create a directory named after the notes field, replace any slashes with underscores as naming convention
    folder_name = item['notes'].replace('/', '').strip()
    os.makedirs(folder_name, exist_ok=True)

    # Open file with `with` statement to close it properly after writing
    with open(os.path.join(folder_name, 'index.qmd'), 'w') as file:
        yaml.dump([item], file, default_flow_style=False, indent=0)
        file.write('\n---\n\nComing soon!\n')
