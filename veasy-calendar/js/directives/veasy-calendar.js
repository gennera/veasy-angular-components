angular.module('veasy.calendar').directive('vCalendar', ['$timeout', 'vCalendarService', function ($timeout, vCalendarService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'veasy-calendar.html',
    scope: {
      config: '=',
    },
    link: function ($scope, $element, $attributes, $controller) {
      let SCHEDULED_EVENTS;
      
      const init = function () {
        $scope.viewMode = $scope.config.viewMode || 'month';
        $scope.openedEvent = {};
        // $scope.timeslots = [
        //   { time: '00:00', show: false },
        //   { time: '01:00', show: true },
        //   { time: '02:00', show: true },
        //   { time: '03:00', show: true },
        //   { time: '04:00', show: true },
        //   { time: '05:00', show: true },
        //   { time: '06:00', show: true },
        //   { time: '07:00', show: true },
        //   { time: '08:00', show: true },
        //   { time: '09:00', show: true },
        //   { time: '10:00', show: true },
        //   { time: '11:00', show: true },
        //   { time: '12:00', show: true },
        //   { time: '13:00', show: true },
        //   { time: '14:00', show: true },
        //   { time: '15:00', show: true },
        //   { time: '16:00', show: true },
        //   { time: '17:00', show: true },
        //   { time: '18:00', show: true },
        //   { time: '19:00', show: true },
        //   { time: '20:00', show: true },
        //   { time: '21:00', show: true },
        //   { time: '22:00', show: true },
        //   { time: '23:00', show: true }
        // ];
        $scope.config.timeslots = [
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
        buildCalendar($scope.config);
        watches();
      };

      const buildCalendar = function (config) {
        SCHEDULED_EVENTS = vCalendarService.catalogEvents(config);
        $scope.calendar = vCalendarService.buildCalendar(config, SCHEDULED_EVENTS);
      };

      const watches = function () {
        $scope.$watchCollection('config.events', function (newEvents, oldEvents) {
          $scope.config.events = newEvents;
          buildCalendar($scope.config);
        });
      };

      $scope.getEventTitle = function () {
        const field = $scope.config.fields.find(field => field.isEventTitle) || {};
        return field.property || '...';
      };

      $scope.getEventTime = function (startDate, endDate) {
        const format = 'HH:mm';
        return `${moment(startDate).format(format)} - ${moment(endDate).format(format)}`;
      };

      //
      // Month
      // 
      $scope.previousMonth = function () {
        $scope.$emit('veasyCalendar:onClickPreviousMonthStart');
        $scope.config.initialDate = $scope.calendar.date.subtract(1, 'month');
        $scope.calendar = vCalendarService.buildCalendar($scope.config, SCHEDULED_EVENTS);
        $scope.$emit('veasyCalendar:onClickPreviousMonthEnd');
      };

      $scope.nextMonth = function () {
        $scope.$emit('veasyCalendar:onClickNextMonthStart');
        $scope.config.initialDate = $scope.calendar.date.add(1, 'month');
        $scope.calendar = vCalendarService.buildCalendar($scope.config, SCHEDULED_EVENTS);
        $scope.$emit('veasyCalendar:onClickNextMonthEnd');
      };

      //
      // Week
      //
      $scope.previousWeek = function () {
        $scope.$emit('veasyCalendar:onClickPreviousWeekStart');
        $scope.config.initialDate = $scope.calendar.date.subtract(1, 'week');
        $scope.calendar = vCalendarService.buildCalendar($scope.config, SCHEDULED_EVENTS);
        $scope.$emit('veasyCalendar:onClickPreviousWeekEnd');
      };

      $scope.nextWeek = function () {
        $scope.$emit('veasyCalendar:onClickNextWeekStart');
        $scope.config.initialDate = $scope.calendar.date.add(1, 'week');
        $scope.calendar = vCalendarService.buildCalendar($scope.config, SCHEDULED_EVENTS);
        $scope.$emit('veasyCalendar:onClickNextWeekEnd');
      };

      $scope.isTheRightTimeslot = function (event, timeslot) {
        return event.startDate.hour() === parseInt(timeslot.time.substr(0, 2));
      };

      $scope.getEventStyle = function (event, eventIndex, timeslotIndex, events) {
        const border = 2;
        const size = events.length - 1;
        // const visibilityPercentual = 10;
        const visibilityPercentual = `${100 / size}%`;
        const duration = moment.duration(moment(event.endDate).diff(moment(event.startDate)));
        const hours = duration.asMinutes() / 60;

        return {
          'position': 'absolute',
          'background-color': event.color,
          'width': `calc(100% - ${border * 2}px - (${size} * ${visibilityPercentual}))`,
          'height': `calc((100% * ${hours}) - ${border * 2}px)`,
          // 'left': `calc(${index} * ${visibilityPercentual} + ${border}px)`,
          'left': `calc(${eventIndex} * ${visibilityPercentual} - ${60/size*eventIndex}px)`,
          'min-width': '60px',
          'min-height': '17px'
          // 'z-index': index + 1
        };
      };

      $scope.getAllDayEventStyle = function (event) {
        const diff = moment(event.endDate).diff(moment(event.startDate), 'days');
        const days = moment.duration(diff, 'days').asDays();

        return {
          'position': 'relative',
          'width': `calc(${300}% + (10px * ${days}))`,
          'z-index': 2
        }
      }

      $scope.getAllDayEvents = function (day) {
        const events = [];
        for (let i = 0; i < day.timeslots.length; i++) {
          const timeslot = day.timeslots[i];
          for (let j = 0; j < timeslot.events.length; j++) {
            const event = timeslot.events[j];
            if (event.allDay) {
              events.push(event);
            }
          }
        }
        return events;
      };

      //
      // Modal
      //      
      $scope.onClickDay = function (e, data) {
        $scope.$emit('veasyCalendar:onClickDay', data);
      };

      $scope.onClickEvent = function(e, data) {
        e.stopPropagation();
        $scope.$emit('veasyCalendar:onClickEvent', data);
      };

      init();
    }
  };
}]);
