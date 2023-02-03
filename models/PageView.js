module.exports = (sequelize , DataTypes) => {
     const PageView = sequelize.define("PageView", {

     ip : {
          type : DataTypes.STRING
     } ,
     value : {
          type:DataTypes.INTEGER
     }
         
     
     } ,
     {
         charset: 'utf8',
         collate: 'utf8_general_ci', 
       })
 

 
     return PageView
 }