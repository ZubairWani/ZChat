// This file will hold the mapping of your friends' unique keys to their names.

// In server/data/friendKeys.js

import dotenv from 'dotenv';
dotenv.config(); // Ensure environment variables are loaded

const friendKeysString = process.env.FRIEND_KEYS_STRING || '';

const friendKeys = {};

if (friendKeysString) {
  // 1. Split the main string into "key:Name" pairs by the comma
  const pairs = friendKeysString.split(',');

  // 2. Loop over each pair
  pairs.forEach(pair => {
    // 3. Split the pair into a key and a name by the colon
    const [key, name] = pair.split(':');
    
    // 4. If we have both a key and a name, add them to our object
    if (key && name) {
      friendKeys[key.trim()] = name.trim();
    }
  });
}

// Export the dynamically created object
export { friendKeys };