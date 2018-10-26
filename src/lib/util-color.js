class UtilColor{
	static getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
		  color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	static getArrayColors(){
		return [1,2,3,4,5,6,7,8,9].map(() => UtilColor.getRandomColor())	
	}
}
export default UtilColor;