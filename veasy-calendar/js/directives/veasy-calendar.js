angular.module('veasy.calendar').directive('vCalendar', ['$timeout', '$filter', 'catalogService', 'calendarService', function ($timeout, $filter, catalogService, calendarService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'veasy-calendar.html',
    scope: {
      config: '<',
    },
    link: function ($scope, $element, $attributes, $controller) {
      let CATALOGED_EVENTS;

      const init = function () {
        $scope.viewModes = ['month', 'week'];
        $scope.viewMode = $scope.config.viewMode || $scope.viewModes[0];
        $scope.config.initialDate = $scope.config.initialDate ? moment($scope.config.initialDate).startOf('day') : moment().startOf('day');
        $scope.config.timeslots = getDefaultTimeslots();
        watchers();
      };

      const isWeekMode = function () {
        return $scope.viewMode === 'week';
      };

      const getDefaultTimeslots = function () {
        return [
          { time: '00:00', show: false },
          { time: '01:00', show: true },
          { time: '02:00', show: true },
          { time: '03:00', show: true },
          { time: '04:00', show: true },
          { time: '05:00', show: true },
          { time: '06:00', show: true },
          { time: '07:00', show: true },
          { time: '08:00', show: true },
          { time: '09:00', show: true },
          { time: '10:00', show: true },
          { time: '11:00', show: true },
          { time: '12:00', show: true },
          { time: '13:00', show: true },
          { time: '14:00', show: true },
          { time: '15:00', show: true },
          { time: '16:00', show: true },
          { time: '17:00', show: true },
          { time: '18:00', show: true },
          { time: '19:00', show: true },
          { time: '20:00', show: true },
          { time: '21:00', show: true },
          { time: '22:00', show: true },
          { time: '23:00', show: true }
        ];
      };

      const watchers = function () {
        $scope.$watchCollection('config.events', function (newEvents, oldEvents) {
          if (!newEvents.length) return;
          $scope.config.events = $filter('orderBy')(newEvents, 'startDate', false);
          CATALOGED_EVENTS = catalogService.catalogEvents($scope.config, newEvents);
          buildCalendar($scope.config, CATALOGED_EVENTS);
        });
      };
      
      const buildCalendar = function (config, events) {
        $scope.calendar = calendarService.buildCalendar(config, events);
        if (isWeekMode()) {
          $scope.weeklyEventsLines = defineWeeklyEventsLines($scope.calendar, events);
        }
      };
      
      $scope.onClickDay = function (day, timeslot) {
        const hours = timeslot ? timeslot.time.split(':')[0] : 0;
        const minutes = timeslot ? timeslot.time.split(':')[1] : 0;
        const clicked = day.date.clone().hour(hours).minute(minutes);
        $scope.$emit('veasycalendar:onClickDay', clicked);
      };
      
      $scope.onClickEvent = function (e, event) {
        e.stopPropagation();
        $scope.$emit('veasycalendar:onClickEvent', event);
      };

      $scope.onClickToday = function () {
        $scope.config.initialDate = moment();
        buildCalendar($scope.config, CATALOGED_EVENTS);
      };

      $scope.onChangeViewMode = function (mode) {
        $scope.config.viewMode = mode;
        $scope.viewMode = mode;
        $scope.config.initialDate = moment();
        CATALOGED_EVENTS = catalogService.catalogEvents($scope.config, $scope.config.events);
        buildCalendar($scope.config, CATALOGED_EVENTS);
        $scope.$emit('veasycalendar:onChangeViewMode');
      };
      /**
       * Month
       */
      $scope.onPreviousMonth = function () {
        $scope.$emit('veasycalendar:onClickPreviousMonthStart');
        $scope.config.initialDate = $scope.calendar.initialDate.subtract(1, 'month');
        buildCalendar($scope.config, CATALOGED_EVENTS);
        $scope.$emit('veasycalendar:onClickPreviousMonthEnd');
      };

      $scope.onNextMonth = function () {
        $scope.$emit('veasycalendar:onClickNextMonthStart');
        $scope.config.initialDate = $scope.calendar.initialDate.add(1, 'month');
        buildCalendar($scope.config, CATALOGED_EVENTS);
        $scope.$emit('veasycalendar:onClickNextMonthEnd');
      };
      
      /**
       * Week
       */
      $scope.onPreviousWeek = function () {
        $scope.$emit('veasycalendar:onClickPreviousWeekStart');
        $scope.config.initialDate = $scope.calendar.initialDate.subtract(1, 'week');
        buildCalendar($scope.config, CATALOGED_EVENTS);
        $scope.$emit('veasycalendar:onClickPreviousWeekEnd');
      };

      $scope.onNextWeek = function () {
        $scope.$emit('veasycalendar:onClickNextWeekStart');
        $scope.config.initialDate = $scope.calendar.initialDate.add(1, 'week');
        buildCalendar($scope.config, CATALOGED_EVENTS);
        $scope.$emit('veasycalendar:onClickNextWeekEnd');
      };

      const getWeeklyEventLinesStructure = function (calendar) {
        const lines = Math.max(...calendar.week.map(day => day.multiDayEvents.length));
        const array = [];
        for (let i = 0; i < lines; i++) {
          array.push(newLine());
        }
        return array;
      };

      const newLine = function () {
        const array = [];
        for (let i = 0; i < 7; i++) {
          array.push({ isEmpty: true });
        }
        return array;
      };

      const isAlreadyInsertedEvent = function (weeklyEventsLines, id) {
        return weeklyEventsLines.reduce((actualLine, line) => actualLine.concat(line), []).some(event => event.veasyId === id);
      };

      const defineWeeklyEventsLines = function (calendar) {
        let weeklyEventsLines = getWeeklyEventLinesStructure(calendar);
        for (let dayOfWeek = 0; dayOfWeek < calendar.week.length; dayOfWeek++) {
          const day = calendar.week[dayOfWeek];
          for (let eventIndex = 0; eventIndex < day.multiDayEvents.length; eventIndex++) {
            const event = day.multiDayEvents[eventIndex];
            for (let line = 0; line < weeklyEventsLines.length; line++) {
              if (!weeklyEventsLines[line][dayOfWeek].isEmpty) continue;
              if (isAlreadyInsertedEvent(weeklyEventsLines, event.veasyId)) break;
              weeklyEventsLines[line][dayOfWeek] = event;
              for (let i = 1; i < event.payload - event.chunk; i++) {
                if (weeklyEventsLines[line][dayOfWeek + i]) {
                  weeklyEventsLines[line][dayOfWeek + i].isEmpty = false;
                }
              }
              break;
            }
          }
        }
        return weeklyEventsLines;
      };

      $scope.getMonthlyEventStyle = function (event) {
        return {
          'color': event.colors.text,
          'background-color': event.colors.background,
          'border-color': event.colors.background
        }
      };

      $scope.getWeeklyEventStyle = function (event) {
        let totalWeekDays = 7; // de 0 a 6
        let chunk = event.chunk;
        let payload = event.payload;
        let size = payload;
        let gap = payload - chunk - 1;
        let day = moment(event.startDate).day();
        const margin = 2;
        if (chunk > 0) {
          day = moment(event.startDate).add(chunk, 'days').day();
        }
        if (chunk > 0) {
          event.isLeftArrow = true;
          size = payload - chunk;
        }
        if ((day + payload - chunk) > totalWeekDays) {
          event.isRightArrow = true;
          size = totalWeekDays - day;
        }
        if ((payload + day) > totalWeekDays) {
          gap -= 1;
        }
        return {
          'position': 'absolute',
          'left': `${margin}px`,
          'width': `calc(100% * ${size} + ${size - 1}px - ${margin * 2}px)`,
          'color': event.colors.text,
          'background-color': event.colors.background,
          'border-color': event.colors.background,
          'z-index': 2
        }
      };

      $scope.getEventStyle = function (event, eventIndex, timeslotIndex, events) {
        const border = 2;
        const size = events.length - 1 || 1;
        const visibilityPercentual = `${100 / size}%`;
        const duration = moment.duration(moment(event.endDate).diff(moment(event.startDate)));
        const hours = Math.ceil(duration.asMinutes() / 60);
        const gap = (hours - 1) * 5;
        const diff = moment(event.endDate).diff(moment(event.startDate), 'minutes');
        return {
          'position': 'absolute',
          'left': `calc(${eventIndex} * ${visibilityPercentual} - ${60 / size * eventIndex}px)`,
          'top': `${event.startDate.minutes() * 100 / 60}%`,
          'width': `calc(100% - ${border * 2}px - (${size} * ${visibilityPercentual}))`,
          'height': `calc(${(diff / 60) * 100}% + ${gap}px)`,
          'min-width': '60px',
          'min-height': '17px',
          'color': event.colors.text,
          'background-color': event.colors.background
        };
      };

      $scope.getEventTitle = function () {
        const field = $scope.config.fields.find(field => field.isEventTitle) || {};
        return field.property || '...';
      };

      $scope.getEventTime = function (startDate, endDate) {
        const format = 'HH:mm';
        return `${moment(startDate).format(format)} - ${moment(endDate).format(format)}`;
      };

      init();
    }
  };
}]);

