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
        $scope.openedEvent = {};
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
