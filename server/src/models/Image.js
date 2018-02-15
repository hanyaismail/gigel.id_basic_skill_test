module.exports = (sequelize, DataTypes) => {
	const Image = sequelize.define('Image', {
		fileName: {
			type: DataTypes.STRING
		},
		url: {
			type: DataTypes.STRING
		},
		mimetype: {
			type: DataTypes.STRING
		}
		// destination: {
		// 	type: DataTypes.STRING
		// }
		// filePath: {
		// 	type: DataTypes.STRING
		// }
	})

	Image.associate = function(models) {
		Image.belongsTo(models.User)
	}
	
	return Image
}