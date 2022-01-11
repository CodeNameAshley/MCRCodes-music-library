const app = require('./src/app');

const APP_PORT = process.env.PORT || 4000;

app.listen(APP_PORT, () => {
  console.log(`The robots are working on port ${APP_PORT}`);
});

// to start database docker start music_library_mysql
