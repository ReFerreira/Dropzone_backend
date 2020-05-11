import Sequelize, {Model} from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init({
      ordem: Sequelize.STRING, 
      primeiro_ct: Sequelize.STRING,
    }, {
      sequelize,
    });
  }
}

export default File; 