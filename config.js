const PORT = 5555; 
const mongodb_url = 'mongodb://localhost:27017/';
const db_name = 'todo';

const db_url = mongodb_url+db_name;
module.exports = {db_url, PORT};