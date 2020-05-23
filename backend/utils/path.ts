const path = require('path');

export = path.dirname((process as any).mainModule.filename);