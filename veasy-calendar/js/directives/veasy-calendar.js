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

      const buildCalendar = function (calendarConfig) {
        SCHEDULED_EVENTS = vCalendarService.catalogEvents(calendarConfig.events || []);
        $scope.calendar = vCalendarService.buildCalendar(calendarConfig, SCHEDULED_EVENTS);
      };

      const watches = function () {
        $scope.$watchCollection('config.events', function (newEvents, oldEvents) {
          $scope.config.events = newEvents;
          buildCalendar($scope.config);
        });
      };

      $scope.previousMonth = function () {
        $scope.$emit('veasyCalendar:onClickPreviousMonthStart');
        $scope.config.date = $scope.calendar.date.subtract(1, 'month');
        $scope.calendar = vCalendarService.buildCalendar($scope.config, SCHEDULED_EVENTS);
        $scope.$emit('veasyCalendar:onClickPreviousMonthEnd');
      };

      $scope.nextMonth = function () {
        $scope.$emit('veasyCalendar:onClickNextMonthStart');
        $scope.config.date = $scope.calendar.date.add(1, 'month');
        $scope.calendar = vCalendarService.buildCalendar($scope.config, SCHEDULED_EVENTS);
        $scope.$emit('veasyCalendar:onClickNextMonthEnd');
      };

      //
      // Modal
      //
      $scope.$on('veasyCalendar:addNewEvent', function (event, data) {
        $scope.openedEvent = {};
        openModal('event-modal', { keyboard: true, backdrop: true });
      });
      
      $scope.onClickDay = function (data) {
        $scope.$emit('veasyCalendar:onClickDay', { message: JSON.stringify(data) });
        $scope.openedEvent = {};
        openModal('event-modal', { keyboard: true, backdrop: true });
      };

      $scope.onClickEvent = function(e, data) {
        e.stopPropagation();
        $scope.$emit('veasyCalendar:onClickEvent', { message: JSON.stringify(data) });
        $scope.openedEvent = angular.copy(data);
        openModal('event-modal', { keyboard: true, backdrop: true });
      };

      $scope.onSaveEvent = function (data) {
        $scope.$emit('veasyCalendar:onSaveEvent', { message: JSON.stringify(data) });
        $scope.openedEvent = {};
        closeModal('event-modal');
      };

      const openModal = function (id, modalConfig) {
        angular.element('#' + id).modal({
          keyboard: modalConfig.keyboard,
          backdrop: modalConfig.backdrop
        });
      };

      const closeModal = function (id) {
        angular.element('#' + id).modal('hide');
        $scope.openedEvent = {};
      };

      init();
    }
  };
}]);
