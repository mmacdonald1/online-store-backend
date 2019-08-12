const mongoose = require('mongoose');

export const User = mongoose.model('User', { name: String });
