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
      $scope.$on('veasyCalendar:addNewEvent', function (event, data) {
        $scope.openedEvent = {};
        openModal('event-modal', { keyboard: true, backdrop: true });
      });
      
      $scope.onClickDay = function (data) {
        $scope.$emit('veasyCalendar:onClickDay', data);
        $scope.openedEvent = {};
        openModal('event-modal', { keyboard: true, backdrop: true });
      };

      $scope.onClickEvent = function(e, data) {
        e.stopPropagation();
        $scope.$emit('veasyCalendar:onClickEvent', data);
        $scope.openedEvent = angular.copy(data);
        openModal('event-modal', { keyboard: true, backdrop: true });
      };

      $scope.onSaveEvent = function (data) {
        $scope.$emit('veasyCalendar:onSaveEvent', data);
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
