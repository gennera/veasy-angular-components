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
        $scope.viewModes = ['month', 'week'];
        $scope.viewMode = $scope.config.viewMode || $scope.viewModes[0];
        $scope.openedEvent = {};
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

      $scope.changeViewMode = function (mode) {
        $scope.viewMode = mode;
      };


      // TESTE
      // for (let year in calendar.events) {
      //   for (let month in calendar.events[year]) {
      //     for (let day in calendar.events[year][month]) {
      //       for (let timeslot in calendar.events[year][month][day]) {
      //         console.log(calendar.events[year][month][day][timeslot]);
      //       }
      //     }
      //   }
      // }

      const getWeekEvents = function (calendar, events) {
        const startOfWeek = moment(calendar.week[0].date).startOf('day');
        const endOfWeek = moment(calendar.week[calendar.week.length - 1].date).endOf('day');

        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          event.startDate = moment(event.startDate);
          event.endDate = moment(event.endDate);
  
          if (
            // Caso 1 - Inicia antes da semana e finaliza durante a semana
            // (event.startDate.isBefore(startOfWeek) && event.endDate.isBetween(startOfWeek, endOfWeek))
            // Caso 2 - Inicia durante semana e finaliza durante a semana
            (event.startDate.isBetween(startOfWeek, endOfWeek) && event.endDate.isBetween(startOfWeek, endOfWeek))
            // Caso 3 - Inicia durante semana e finaliza depois da semana
            // (event.startDate.isBetween(startOfWeek, endOfWeek) && event.endDate.isAfter(endOfWeek))
            // Caso 4 - Inicia antes da semana e finaliza depois da semana
            // (event.startDate.isBefore(startOfWeek) && event.endDate.isAfter(endOfWeek))
          ) {
            console.log(event);
          }
        }

      };
      // TESTE






      const configAllDayEvents = function (week) {
        const events = week.reduce((initial, day) => initial.concat($scope.getAllDayEvents(day)), []);

        $scope.allDayEvents = events.map(event => {
          const startOfWeek = moment($scope.calendar.week[0].date).startOf('day');
          const endOfWeek = moment($scope.calendar.week[$scope.calendar.week.length - 1].date).endOf('day');
          const isBetween = moment(event.endDate).isBetween(startOfWeek, endOfWeek);
          const endDate = isBetween ? moment(event.endDate).day() : 6;
          return {
            ...event,
            position: moment(event.startDate).day(),
            slots: endDate - moment(event.startDate).day() + 1,
            duration: moment.duration(Math.ceil(moment(event.endDate).diff(moment(event.startDate), 'hours') / 24), 'days').asDays()
          };
        });
        const daysOfWeek = 7;
        const totalOfWeekEvents = $scope.allDayEvents.reduce((actual, event) => actual + event.duration, 0);
        const numberOfLines = Math.ceil(totalOfWeekEvents / daysOfWeek) || 1;
        const allDayEventsLines = [];
        
        for (let i = 0; i < numberOfLines; i++) {
          allDayEventsLines.push(Array(daysOfWeek));
        }
        for (let eventIndex = 0; eventIndex < $scope.allDayEvents.length; eventIndex++) {
          const event = $scope.allDayEvents[eventIndex];
          for (let lineIndex = 0; lineIndex < allDayEventsLines.length; lineIndex++) {
            const line = allDayEventsLines[lineIndex];
            if (line[event.position]) continue;
            if (!canFitEvent(line, event)) continue;
            const lastPosition = event.position + event.slots;
            for (let i = event.position; i < lastPosition; i++) {
              line[i] = i === event.position ? event : {};
            }
            break;
          }
        }
        // CLEAR EMPTY LINES
        for (let i = 0; i < allDayEventsLines.length; i++) {
          const emptyLine = allDayEventsLines[i].every(slot => slot === null);
          if (emptyLine && allDayEventsLines.length > 1) {
            allDayEventsLines.splice(i, 1);
          }
        }
        // CLEAR EMPTY LINES
        $scope.allDayEventsLines = allDayEventsLines;
      };


      const canFitEvent = function (line, event) {
        const lastPosition = event.position + event.slots;
        let canFit = true;
        for (let i = event.position; i < lastPosition; i++) {
          if (line[i]) {
            canFit = false;
          }
        }
        return canFit;
      };





      const buildCalendar = function (config) {
        SCHEDULED_EVENTS = vCalendarService.catalogEvents(config);
        $scope.calendar = vCalendarService.buildCalendar(config, SCHEDULED_EVENTS);

        getWeekEvents($scope.calendar, config.events);

        configAllDayEvents($scope.calendar.week);
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
        configAllDayEvents($scope.calendar.week);
        $scope.$emit('veasyCalendar:onClickPreviousWeekEnd');
      };

      $scope.nextWeek = function () {
        $scope.$emit('veasyCalendar:onClickNextWeekStart');
        $scope.config.initialDate = $scope.calendar.date.add(1, 'week');
        $scope.calendar = vCalendarService.buildCalendar($scope.config, SCHEDULED_EVENTS);
        configAllDayEvents($scope.calendar.week);
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


        



        const TOTAL_OF_BEFORE_EVENTS = 1;
        const border = 4;
        const borders = event.slots - 1;
        return {
          'position': 'absolute',
          'left': `${border / 2}px`,
          'width': `calc(100% * ${event.slots} + ${borders}px - ${border}px)`,
          'z-index': 2
        }
      };


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
        return events.sort((a, b) => moment(a.date).isSameOrBefore(b.date) ? 1 : -1);
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
