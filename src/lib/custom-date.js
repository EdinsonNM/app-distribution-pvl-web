import moment from 'moment';

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

	static getMonthDateRange(year, month) {
		var startDate = moment([year, month]);
		var endDate = moment(startDate).endOf('month');
		console.log(startDate.toDate());
		console.log(endDate.toDate());
		return { start: startDate.toDate(), end: endDate.toDate() };
	}
	
}
export default CustomDate;