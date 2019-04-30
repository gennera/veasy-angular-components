angular.module('example', ['veasy.momentFormat', 'veasy.calendar'])

.controller('vMomentFormatController', ['$scope', function ($scope) {
  $scope.save = function (inputValue) {
    alert('Input value: ' + inputValue.format('DD/MM/YYYY HH:mm'));
  };
  $scope.$on('veasyMomentFormat:onChange', function (event, data) {
    console.log('veasyMomentFormat:onChange', data);
  });
}])

.controller('vCalendarController', function ($scope, $timeout) {
  moment.locale('pt-BR');

  const init = function () {
    eventClickListeners();
    $scope.vCalendarConfig = {
      // viewMode: 'month',
      viewMode: 'week',
      initialDate: moment('2018-10-22'),
      fields: [
        { label: 'Título', type: 'text', property: 'title', isEventTitle: true },
        { label: 'Data', type: 'moment', property: 'startDate', format: 'DD/MM/YYYY HH:mm', isEventOrigin: true }
      ],
      events: [],
      eventModal: { title: 'Título da Modal de Evento' }
    };
    getEvents();
  };

  const getEvents = function () {
    $timeout(function () {
      $scope.vCalendarConfig.events = [
          { id: 1, title: 'Teste 1', startDate: '2018-10-21T03:00:00.000Z', endDate: '2018-10-22T23:59:59.000Z' },
          { id: 2, title: 'Teste 2', startDate: '2018-10-22T03:00:00.000Z', endDate: '2018-10-25T23:59:59.000Z' },
          { id: 3, title: 'Teste 3', startDate: '2018-10-23T03:00:00.000Z', endDate: '2018-10-24T23:59:59.000Z' },
          { id: 4, title: 'Teste 4', startDate: '2018-10-24T03:00:00.000Z', endDate: '2018-10-26T23:59:59.000Z' },
          { id: 5, title: 'Teste 5', startDate: '2018-10-25T03:00:00.000Z', endDate: '2018-10-27T23:59:59.000Z' },
          { id: 6, title: 'Teste 6', startDate: '2018-10-26T03:00:00.000Z', endDate: '2018-10-28T23:59:59.000Z' },
          { id: 7, title: 'Teste 7', startDate: '2018-10-27T03:00:00.000Z', endDate: '2018-10-29T23:59:59.000Z' },
          { id: 8, title: 'Teste 8', startDate: '2018-10-21T03:00:00.000Z', endDate: '2018-10-29T23:59:59.000Z' },
          { id: 9, title: 'Teste 9', startDate: '2018-10-21T03:00:00.000Z', endDate: '2018-10-23T23:59:59.000Z' },
          { id: 10, title: 'Teste 10', startDate: '2018-10-21T03:00:00.000Z', endDate: '2018-10-21T23:59:59.000Z' }
      ];
    }, 1000);
  }

  $scope.addNewEvent = function () {
    // $scope.$broadcast('veasyCalendar:addNewEvent', {});
    closeModal('event-modal', { keyboard: true, backdrop: true });
  };

  const eventClickListeners = function () {
    $scope.$on('veasyCalendar:onClickDay', function (event, data) {
      console.log('veasyCalendar:onClickDay', data);
      $scope.event = {};
      openModal('event-modal', { keyboard: true, backdrop: true });
    });
    $scope.$on('veasyCalendar:onClickEvent', function (event, data) {
      console.log('veasyCalendar:onClickEvent', data);
      $scope.event = angular.copy(data);
      openModal('event-modal', { keyboard: true, backdrop: true });
    });

    $scope.$on('veasyCalendar:onClickNextMonthStart', function (event) {
      console.log('veasyCalendar:onClickNextMonthStart');
    });
    $scope.$on('veasyCalendar:onClickNextMonthEnd', function (event) {
      console.log('veasyCalendar:onClickNextMonthEnd');
    });

    $scope.$on('veasyCalendar:onClickPreviousMonthStart', function (event) {
      console.log('veasyCalendar:onClickPreviousMonthStart');
    });
    $scope.$on('veasyCalendar:onClickPreviousMonthEnd', function (event) {
      console.log('veasyCalendar:onClickPreviousMonthEnd');
    });
  };

  const openModal = function (id, modalConfig) {
    angular.element('#' + id).modal({
      keyboard: modalConfig.keyboard,
      backdrop: modalConfig.backdrop
    });
  };

  const closeModal = function (id) {
    angular.element('#' + id).modal('hide');
    delete $scope.event;
  };

  init();
});
