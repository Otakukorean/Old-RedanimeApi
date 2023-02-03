module.exports = (sequelize , DataTypes) => {
  const Category =  sequelize.define("Category", 
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Category',
    charset: 'utf8',
    collate: 'utf8_general_ci', 
  }
  )
  
  Category.associate = (models) => {
    Category.hasMany(models.Shows, {
      foreignKey: 'category_id',
      onDelete : "cascade"
    });
}
  return Category

}
