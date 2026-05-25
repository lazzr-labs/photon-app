import fs from 'fs';
import path from 'path';

const routes = [
  'privacy',
  'terms',
  'support',
];

const routesPrepare = async () => {
  try {
    for (const route of routes) {
      const routePath = `dist/${route}`;

      if (fs.existsSync(`${routePath}.html`)) {
        fs.copyFileSync(`${routePath}.html`, routePath);
        console.log(`Created ${routePath}`);
        continue;
      }

      if (!fs.existsSync(routePath)) {
        continue;
      }

      for (const routeFilePath of fs.readdirSync(routePath, { recursive: true })) {
        const routeHtmlPath = path.join(routePath, routeFilePath);
        if (fs.statSync(routeHtmlPath).isFile() && routeHtmlPath.endsWith('.html')) {
          const routeExtensionlessPath = routeHtmlPath.replace(/\.html$/, '');
          fs.copyFileSync(routeHtmlPath, routeExtensionlessPath);
          console.log(`Created ${routeExtensionlessPath}`);
        }
      }
    }
  }
  catch (error) {
    console.error('Error creating extensionless routes:', error);
  }
};

routesPrepare();
