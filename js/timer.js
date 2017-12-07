
		/********************************************
		* Configure examples here
		********************************************/
		var secsToZero = 5;

		/********************************************
		* Get current time minus secsToZero
		********************************************/
		var date = new Date();

		var secsToNow = date.getTime() / 1000 + secsToZero;

		var hours = parseInt(secsToNow / 3600) % 24;
		var mins = parseInt(secsToNow / 60) % 60;
		var secs = Math.floor(secsToNow % 60);

		var dateStr = [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/');

		var timeStr = [hours, mins, secs].join(':');
		var midnightStr = '00:00:00';

		/********************************************
		* Timezone specific variables
		********************************************/
		var localDate = new Date();
		var localOffsetInMins = date.getTimezoneOffset();
		var localTimeInMillisecs = localDate.getTime();
		var utc = localTimeInMillisecs + localOffsetInMins * 60 * 1000;

		var pstOffset = (60 * 60 * 1000 * -8);
		var pstDate = new Date(utc + pstOffset);
		var pstDaysToOffset = localDate.getDate() == pstDate.getDate() ? 2 : 1;
		var pstDateWithOffset = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * pstDaysToOffset))
		var pstDateWithOffsetStr = [pstDateWithOffset.getMonth() + 1, pstDateWithOffset.getDate(), pstDateWithOffset.getFullYear()].join('/');

		var gmtOffset = (60 * 60 * 1000 * 0);
		var gmtDate = new Date(utc + gmtOffset);
		var gmtDaysToOffset = localDate.getDate() == gmtDate.getDate() ? 2 : 1;
		var gmtDateWithOffset = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * gmtDaysToOffset))
		var gmtDateWithOffsetStr = [gmtDateWithOffset.getMonth() + 1, gmtDateWithOffset.getDate(), gmtDateWithOffset.getFullYear()].join('/');

		var localDateWithOffset = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * 2));
		var localDateWithOffsetStr = [localDateWithOffset.getMonth() + 1, localDateWithOffset.getDate(), localDateWithOffset.getFullYear()].join('/');
		var localOffsetHour = eval(-(localOffsetInMins / (60)));

		if (localOffsetHour > 0) localOffsetHour = '+' + localOffsetHour;

		var localUTCOffset = [localOffsetHour, (Math.abs(localOffsetInMins % 60))].join(':');

		/********************************************
		* Default examples
		********************************************/

		/* Default (no configuration) */
		var noOptions = Doom({
			targetDate: dateStr,
			targetTime: timeStr,
		});
		noOptions.doom();

		/* Bidirectional (no callback) */
		var biDirectional = Doom({
			targetDate: dateStr,
			targetTime: timeStr,
			biDirectional: true,
			ids: {
				days: 'days_bidirectional',
				hours: 'hours_bidirectional',
				mins: 'mins_bidirectional',
				secs: 'secs_bidirectional',
			},
		});
		biDirectional.doom();

		/* Bidirectional (with callback) */
		var biDirectionalCallback = Doom({
			targetDate: dateStr,
			targetTime: timeStr,
			biDirectional: true,
			ids: {
				days: 'days_bidirectional_callback',
				hours: 'hours_bidirectional_callback',
				mins: 'mins_bidirectional_callback',
				secs: 'secs_bidirectional_callback',
			},
			callback: function() {
				document.getElementById('bidirectional_callback_message').innerHTML = '<strong>Callback executed at zero count!</strong>';
			}
		});
		biDirectionalCallback.doom();

		/* Directional (with callback and extra zeroes removed) */
		var directionalCallbackNoZeroes = Doom({
			targetDate: dateStr,
			targetTime: timeStr,
			addZero: false,
			ids: {
				days: 'days_callback_no_zero',
				hours: 'hours_callback_no_zero',
				mins: 'mins_callback_no_zero',
				secs: 'secs_callback_no_zero',
			},
			callback: function() {
				document.getElementById('directional_callback_message').innerHTML = '<strong>Callback executed at zero count!</strong>';
			}
		});
		directionalCallbackNoZeroes.doom();

		/* Directional (with local time zone offset) */
		var local = Doom({
			targetDate: localDateWithOffsetStr,
			targetTime: midnightStr,
			utcOffset: localUTCOffset,
			ids: {
				days: 'days_local',
				hours: 'hours_local',
				mins: 'mins_local',
				secs: 'secs_local',
			},
		});
		local.doom();

		/* Directional (with PST time zone offset) */
		var pst = Doom({
			targetDate: pstDateWithOffsetStr,
			targetTime: midnightStr,
			utcOffset: '-21:00',
			ids: {
				days: 'days_pst',
				hours: 'hours_pst',
				mins: 'mins_pst',
				secs: 'secs_pst',
			},
		});
		pst.doom();

		/* Directional (with GMT time zone offset) */
		var gmt = Doom({
			targetDate: gmtDateWithOffsetStr,
			targetTime: midnightStr,
			utcOffset: '+00:00',
			ids: {
				days: 'days_gmt',
				hours: 'hours_gmt',
				mins: 'mins_gmt',
				secs: 'secs_gmt',
			},
		});
		gmt.doom();
