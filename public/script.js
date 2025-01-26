import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

async function convertAllYamlToJson() {
  const folder = './content';
  const files = await fs.readdir(folder);

  console.log('Files in folder:', files);

  const yamlFiles = files.filter(file => path.extname(file).toLowerCase() === '.yaml');

  if (yamlFiles.length === 0) {
    console.log('No .yaml files found in the folder.');
    console.log('Current working directory:', process.cwd());
    return;
  }

  for (const yamlFile of yamlFiles) {
    try {
      const yamlPath = path.join(folder, yamlFile);
      const baseName = path.basename(yamlFile, '.yaml');
      const jsonPath = path.join(folder, `${baseName}.json`);
      const minifiedJsonPath = path.join(folder, `${baseName}.minified.json`);

      const yamlContent = await fs.readFile(yamlPath, 'utf8');
      const parsedContent = yaml.load(yamlContent);

      const formattedJson = JSON.stringify(parsedContent, null, 2);
      const minifiedJson = JSON.stringify(parsedContent);

      await Promise.all([
        fs.writeFile(jsonPath, formattedJson),
        fs.writeFile(minifiedJsonPath, minifiedJson),
      ]);

      console.log(`Converted ${yamlFile} to ${baseName}.json and ${baseName}.minified.json`);
    } catch (error) {
      console.error(`Error converting ${yamlFile}:`, error.message);
    }
  }
}

convertAllYamlToJson().catch(console.error);