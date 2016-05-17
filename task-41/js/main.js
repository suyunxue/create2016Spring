//主程序执行
new DatePicker($("#container")).select(function() {
	alert("选择了日期"+this.getSelectedDate());
});
