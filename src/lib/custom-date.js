class CustomDate {
	static getObjectPeriod(period){
		return {
			year: period.substring(0,4),
			month: period.substring(4,6)
		}
	}
	static daysInMonth (month, year) {
		return new Date(year, month, 0).getDate();
	}
	
}
export default CustomDate;