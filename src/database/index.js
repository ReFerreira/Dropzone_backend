import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import File from '../app/models/File';

const models = [File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();