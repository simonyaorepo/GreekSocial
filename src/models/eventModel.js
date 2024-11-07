// models/event.js
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      chapter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      event_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      visibility: {
        type: DataTypes.STRING,
        defaultValue: 'public',
      },
      involved_chapters: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // Array of chapter_ids
      },
    }, {
      tableName: 'events',
      timestamps: false,
    });
  
    Event.associate = function(models) {
      Event.belongsTo(models.Chapter, { foreignKey: 'chapter_id' });
    };
  
    return Event;
  };
  