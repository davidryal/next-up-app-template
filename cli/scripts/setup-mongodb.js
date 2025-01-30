const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();

// Add MongoDB dependencies
const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
pkg.dependencies['mongoose'] = '^8.0.0';
fs.writeFileSync(path.join(projectRoot, 'package.json'), JSON.stringify(pkg, null, 2));

// Create MongoDB connection utility
const dbUtilContent = `import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
`;

// Create example model
const userModelContent = `import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
`;

// Create directories
fs.mkdirSync(path.join(projectRoot, 'src', 'lib'), { recursive: true });
fs.mkdirSync(path.join(projectRoot, 'src', 'models'), { recursive: true });

// Write files
fs.writeFileSync(path.join(projectRoot, 'src', 'lib', 'dbConnect.ts'), dbUtilContent);
fs.writeFileSync(path.join(projectRoot, 'src', 'models', 'User.ts'), userModelContent);

// Add example .env
const envContent = `
MONGODB_URI="mongodb://localhost:27017/myapp"
`;

fs.appendFileSync(path.join(projectRoot, '.env.example'), envContent);
fs.appendFileSync(path.join(projectRoot, '.env'), envContent);
