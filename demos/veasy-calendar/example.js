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
    // eventClickListeners();
    $scope.vCalendarConfig = {
      viewMode: 'week',
      // viewMode: 'month',
      initialDate: moment('2019-06-10'),
      fields: [
        { label: 'Id', type: 'number', property: 'id' },
        { label: 'Título', type: 'text', property: 'title', isEventTitle: true },
        { label: 'Data de Iníco', type: 'moment', property: 'startDate', format: 'DD/MM/YYYY HH:mm', isEventOrigin: true },
        { label: 'Data de Fim', type: 'moment', property: 'endDate', format: 'DD/MM/YYYY HH:mm' }
      ],
      randomEventsColors: true,
      events: [],
      eventModal: { title: 'Título da Modal de Evento' }
    };
    getEvents();
  };

  const getEvents = function () {
    $timeout(function () {
      $scope.vCalendarConfig.events = [
          { title: 'Teste 1', startDate: '2019-06-11T03:00:00.000Z', endDate: '2019-06-12T23:59:59.000Z' },
          { title: 'Teste 2', startDate: '2019-06-12T03:00:00.000Z', endDate: '2019-06-15T23:59:59.000Z' },
          { title: 'Teste 3', startDate: '2019-06-13T03:00:00.000Z', endDate: '2019-06-14T23:59:59.000Z' },
          { title: 'Teste 4', startDate: '2019-06-14T03:00:00.000Z', endDate: '2019-06-16T23:59:59.000Z' },
          { title: 'Teste 5', startDate: '2019-06-15T03:00:00.000Z', endDate: '2019-06-17T23:59:59.000Z' },
          { title: 'Teste 6', startDate: '2019-06-16T03:00:00.000Z', endDate: '2019-06-18T23:59:59.000Z' },
          { title: 'Teste 7', startDate: '2019-06-17T03:00:00.000Z', endDate: '2019-06-19T23:59:59.000Z' },
          { title: 'Teste 8', startDate: '2019-06-11T03:00:00.000Z', endDate: '2019-06-19T23:59:59.000Z' },
          { title: 'Teste 9', startDate: '2019-06-11T03:00:00.000Z', endDate: '2019-06-13T23:59:59.000Z' },
          { title: 'Teste 10', startDate: '2019-06-05T03:00:00.000Z', endDate: '2019-06-21T23:59:59.000Z' },
          //
          { title: 'Teste 11', startDate: '2019-06-11T05:00:00.000Z', endDate: '2019-06-11T05:59:59.000Z' },
          { title: 'Teste 12', startDate: '2019-06-11T05:00:00.000Z', endDate: '2019-06-11T06:59:59.000Z' },
          { title: 'Teste 13', startDate: '2019-06-11T05:00:00.000Z', endDate: '2019-06-11T07:59:59.000Z' },
          { title: 'Teste 14', startDate: '2019-06-11T05:00:00.000Z', endDate: '2019-06-11T08:59:59.000Z' },
          { title: 'Teste 15', startDate: '2019-06-11T05:00:00.000Z', endDate: '2019-06-11T09:59:59.000Z' },
          { title: 'Teste 16', startDate: '2019-06-11T05:00:00.000Z', endDate: '2019-06-11T10:59:59.000Z' },
          { title: 'Teste 17', startDate: '2019-06-11T05:00:00.000Z', endDate: '2019-06-11T11:59:59.000Z' },
          { title: 'Teste 18', startDate: '2019-06-11T05:00:00.000Z', endDate: '2019-06-11T12:59:59.000Z' }
      ];
    }, 1000);
  }

  $scope.addNewEvent = function () {
    // $scope.$broadcast('veasyCalendar:addNewEvent', {});
    closeModal('event-modal', { keyboard: true, backdrop: true });
  };

  // const eventClickListeners = function () {
  //   $scope.$on('veasyCalendar:onClickDay', function (event, data) {
  //     console.log('veasyCalendar:onClickDay', data);
  //     $scope.event = {};
  //     openModal('event-modal', { keyboard: true, backdrop: true });
  //   });
  //   $scope.$on('veasyCalendar:onClickEvent', function (event, data) {
  //     console.log('veasyCalendar:onClickEvent', data);
  //     $scope.event = angular.copy(data);
  //     openModal('event-modal', { keyboard: true, backdrop: true });
  //   });

  //   $scope.$on('veasyCalendar:onClickNextMonthStart', function (event) {
  //     console.log('veasyCalendar:onClickNextMonthStart');
  //   });
  //   $scope.$on('veasyCalendar:onClickNextMonthEnd', function (event) {
  //     console.log('veasyCalendar:onClickNextMonthEnd');
  //   });

  //   $scope.$on('veasyCalendar:onClickPreviousMonthStart', function (event) {
  //     console.log('veasyCalendar:onClickPreviousMonthStart');
  //   });
  //   $scope.$on('veasyCalendar:onClickPreviousMonthEnd', function (event) {
  //     console.log('veasyCalendar:onClickPreviousMonthEnd');
  //   });
  // };

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
