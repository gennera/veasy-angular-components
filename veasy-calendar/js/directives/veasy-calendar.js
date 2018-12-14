angular.module('veasy.calendar').directive('vCalendar', function (vCalendarService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '../veasy-calendar/templates/veasy-calendar.html',
    scope: {
      config: '=',
    },
    link: function ($scope, $element, $attributes, $controller) {
      const SCHEDULED_EVENTS = vCalendarService.catalogEvents($scope.config.events);
      
      const init = function () {
        $scope.openedEvent = {};
        $scope.calendar = vCalendarService.buildCalendar($scope.config, SCHEDULED_EVENTS);
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
});
