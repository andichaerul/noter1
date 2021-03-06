"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require("tns-core-modules/application");
var ModalDatetimepicker = (function () {
    function ModalDatetimepicker() {
    }
    ModalDatetimepicker.prototype.pickDate = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new Promise(function (resolve, reject) {
            if (options.startingDate &&
                typeof options.startingDate.getMonth !== "function") {
                reject("startingDate must be a Date.");
            }
            if (options.minDate && typeof options.minDate.getMonth !== "function") {
                reject("minDate must be a Date.");
            }
            if (options.maxDate && typeof options.maxDate.getMonth !== "function") {
                reject("maxDate must be a Date.");
            }
            var startDate = new Date();
            if (options.startingDate)
                startDate = options.startingDate;
            try {
                var themeId = 0;
                if (options.theme && options.theme === "dark") {
                    themeId = android.app.AlertDialog.THEME_DEVICE_DEFAULT_DARK;
                }
                if (options.datePickerMode && options.datePickerMode === "spinner") {
                    themeId = android.app.AlertDialog.THEME_HOLO_LIGHT;
                    if (options.theme && options.theme === "dark") {
                        themeId = android.app.AlertDialog.THEME_HOLO_DARK;
                    }
                }
                _this.datePicker = new android.app.DatePickerDialog(app.android.foregroundActivity, themeId, new android.app.DatePickerDialog.OnDateSetListener({
                    onDateSet: function (view, year, monthOfYear, dayOfMonth) {
                        var date = {
                            day: dayOfMonth,
                            month: ++monthOfYear,
                            year: year
                        };
                        resolve(date);
                    }
                }), startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                if (options.maxDate || options.minDate) {
                    var datePickerInstance = _this.datePicker.getDatePicker();
                    if (options.maxDate)
                        datePickerInstance.setMaxDate(options.maxDate.getTime());
                    if (options.minDate)
                        datePickerInstance.setMinDate(options.minDate.getTime());
                }
                _this.datePicker.show();
            }
            catch (err) {
                reject(err);
            }
        });
    };
    ModalDatetimepicker.prototype.close = function () {
        if (this.datePicker && typeof this.datePicker.dismiss === "function") {
            this.datePicker.dismiss();
        }
        else if (this.timePicker &&
            typeof this.timePicker.dismiss === "function") {
            this.timePicker.dismiss();
        }
    };
    ModalDatetimepicker.prototype.pickTime = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        options.is24HourView = options.is24HourView || false;
        return new Promise(function (resolve, reject) {
            var now = java.util.Calendar.getInstance();
            var hour = options.startingHour !== undefined && options.startingHour >= 0
                ? +options.startingHour
                : now.get(java.util.Calendar.HOUR_OF_DAY);
            var minute = options.startingMinute !== undefined && options.startingMinute >= 0
                ? +options.startingMinute
                : now.get(java.util.Calendar.MINUTE);
            try {
                _this.timePicker = new android.app.TimePickerDialog(app.android.foregroundActivity, new android.app.TimePickerDialog.OnTimeSetListener({
                    onTimeSet: function (view, hourOfDay, minute) {
                        var time = {
                            hour: hourOfDay,
                            minute: minute
                        };
                        resolve(time);
                    }
                }), hour, minute, options.is24HourView);
                _this.timePicker.show();
                if (options.minTime) {
                    if (options.minTime.hour < 24 &&
                        options.minTime.hour >= 0 &&
                        options.minTime.minute < 60 &&
                        options.minTime.minute >= 0) {
                        _this.timePicker.updateTime(options.minTime.hour, options.minTime.minute);
                        android.widget.Toast.makeText(app.android.foregroundActivity, "Minimum Time: " +
                            options.minTime.hour +
                            ":" +
                            options.minTime.minute, android.widget.Toast.LENGTH_SHORT).show();
                    }
                    else {
                        reject("Invalid minTime");
                    }
                }
                if (options.maxTime) {
                    if (options.maxTime.hour < 24 &&
                        options.maxTime.hour >= 0 &&
                        options.maxTime.minute < 60 &&
                        options.maxTime.minute >= 0) {
                        _this.timePicker.updateTime(options.maxTime.hour, options.maxTime.minute);
                        android.widget.Toast.makeText(app.android.foregroundActivity, "Maximum Time: " +
                            options.maxTime.hour +
                            ":" +
                            options.maxTime.minute, android.widget.Toast.LENGTH_SHORT).show();
                    }
                    else {
                        reject("Invalid maxTime");
                    }
                }
            }
            catch (err) {
                reject(err);
            }
        });
    };
    return ModalDatetimepicker;
}());
exports.ModalDatetimepicker = ModalDatetimepicker;
//# sourceMappingURL=modal-datetimepicker.js.map