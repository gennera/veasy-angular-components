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
        
        
        { id: 25, title: 'Teste Teste Teste 1', startDate: '2018-10-22T04:01:00.000Z', endDate: '2018-10-22T05:01:00.000Z' },
        { id: 26, title: 'Teste Teste Teste 2', startDate: '2018-10-22T04:01:00.000Z', endDate: '2018-10-22T06:01:00.000Z' },
        { id: 27, title: 'Teste Teste Teste 3', startDate: '2018-10-22T04:01:00.000Z', endDate: '2018-10-22T07:01:00.000Z' },
        { id: 28, title: 'Teste Teste Teste 4', startDate: '2018-10-22T04:01:00.000Z', endDate: '2018-10-22T08:01:00.000Z' },
        { id: 29, title: 'Teste Teste Teste 5', startDate: '2018-10-22T04:01:00.000Z', endDate: '2018-10-22T09:01:00.000Z' },
        { id: 30, title: 'Teste Teste Teste 7', startDate: '2018-10-22T04:01:00.000Z', endDate: '2018-10-22T10:01:00.000Z' },
        { id: 31, title: 'Teste Teste Teste 8', startDate: '2018-10-22T04:01:00.000Z', endDate: '2018-10-22T11:01:00.000Z' },
        { id: 32, title: 'Teste Teste Teste 9', startDate: '2018-10-22T04:01:00.000Z', endDate: '2018-10-22T12:01:00.000Z' },
        { id: 33, title: 'Teste Teste Teste 10', startDate: '2018-10-22T04:01:00.000Z', endDate: '2018-10-22T13:01:00.000Z' },
        { id: 34, title: 'Teste Teste Teste 11', startDate: '2018-10-22T04:01:00.000Z', endDate: '2018-10-22T14:01:00.000Z' },
        
        { id: 35, title: 'Teste Teste Teste 12', startDate: '2018-10-22T05:01:00.000Z', endDate: '2018-10-22T06:01:00.000Z' },
        { id: 36, title: 'Teste Teste Teste 13', startDate: '2018-10-22T05:01:00.000Z', endDate: '2018-10-22T07:01:00.000Z' },
        { id: 37, title: 'Teste Teste Teste 14', startDate: '2018-10-22T05:01:00.000Z', endDate: '2018-10-22T08:01:00.000Z' },
        { id: 38, title: 'Teste Teste Teste 15', startDate: '2018-10-22T05:01:00.000Z', endDate: '2018-10-22T09:01:00.000Z' },
        { id: 39, title: 'Teste Teste Teste 16', startDate: '2018-10-22T05:01:00.000Z', endDate: '2018-10-22T10:01:00.000Z' },
        { id: 40, title: 'Teste Teste Teste 17', startDate: '2018-10-22T05:01:00.000Z', endDate: '2018-10-22T11:01:00.000Z' },
        { id: 41, title: 'Teste Teste Teste 18', startDate: '2018-10-22T05:01:00.000Z', endDate: '2018-10-22T12:01:00.000Z' },
        { id: 42, title: 'Teste Teste Teste 19', startDate: '2018-10-22T05:01:00.000Z', endDate: '2018-10-22T13:01:00.000Z' },
        { id: 43, title: 'Teste Teste Teste 20', startDate: '2018-10-22T05:01:00.000Z', endDate: '2018-10-22T14:01:00.000Z' },
        { id: 44, title: 'Teste Teste Teste 21', startDate: '2018-10-22T05:01:00.000Z', endDate: '2018-10-22T15:01:00.000Z' },
        
        { id: 45, title: 'Teste Teste Teste 22', startDate: '2018-10-22T06:01:00.000Z', endDate: '2018-10-22T06:01:00.000Z' },
        { id: 46, title: 'Teste Teste Teste 23', startDate: '2018-10-22T06:01:00.000Z', endDate: '2018-10-22T07:01:00.000Z' },
        { id: 47, title: 'Teste Teste Teste 24', startDate: '2018-10-22T06:01:00.000Z', endDate: '2018-10-22T08:01:00.000Z' },
        { id: 48, title: 'Teste Teste Teste 25', startDate: '2018-10-22T06:01:00.000Z', endDate: '2018-10-22T09:01:00.000Z' },
        { id: 49, title: 'Teste Teste Teste 26', startDate: '2018-10-22T06:01:00.000Z', endDate: '2018-10-22T10:01:00.000Z' },
        { id: 50, title: 'Teste Teste Teste 27', startDate: '2018-10-22T06:01:00.000Z', endDate: '2018-10-22T11:01:00.000Z' },
        { id: 51, title: 'Teste Teste Teste 28', startDate: '2018-10-22T06:01:00.000Z', endDate: '2018-10-22T12:01:00.000Z' },
        { id: 52, title: 'Teste Teste Teste 29', startDate: '2018-10-22T06:01:00.000Z', endDate: '2018-10-22T13:01:00.000Z' },
        { id: 53, title: 'Teste Teste Teste 30', startDate: '2018-10-22T06:01:00.000Z', endDate: '2018-10-22T14:01:00.000Z' },
        { id: 54, title: 'Teste Teste Teste 31', startDate: '2018-10-22T06:01:00.000Z', endDate: '2018-10-22T15:01:00.000Z' },
        
        


        { id: 25, title: 'Teste Teste Teste 1', startDate: '2018-10-23T04:01:00.000Z', endDate: '2018-10-23T05:01:00.000Z' },
        { id: 26, title: 'Teste Teste Teste 2', startDate: '2018-10-23T04:01:00.000Z', endDate: '2018-10-23T06:01:00.000Z' },
        { id: 27, title: 'Teste Teste Teste 3', startDate: '2018-10-23T04:01:00.000Z', endDate: '2018-10-23T07:01:00.000Z' },
        { id: 28, title: 'Teste Teste Teste 4', startDate: '2018-10-23T04:01:00.000Z', endDate: '2018-10-23T08:01:00.000Z' },
        { id: 29, title: 'Teste Teste Teste 5', startDate: '2018-10-23T04:01:00.000Z', endDate: '2018-10-23T09:01:00.000Z' },
        { id: 30, title: 'Teste Teste Teste 7', startDate: '2018-10-23T04:01:00.000Z', endDate: '2018-10-23T10:01:00.000Z' },
        { id: 31, title: 'Teste Teste Teste 8', startDate: '2018-10-23T04:01:00.000Z', endDate: '2018-10-23T11:01:00.000Z' },
        { id: 32, title: 'Teste Teste Teste 9', startDate: '2018-10-23T04:01:00.000Z', endDate: '2018-10-23T12:01:00.000Z' },
        { id: 33, title: 'Teste Teste Teste 10', startDate: '2018-10-23T04:01:00.000Z', endDate: '2018-10-23T13:01:00.000Z' },
        { id: 34, title: 'Teste Teste Teste 11', startDate: '2018-10-23T04:01:00.000Z', endDate: '2018-10-23T14:01:00.000Z' },
        { id: 35, title: 'Teste Teste Teste 12', startDate: '2018-10-23T05:01:00.000Z', endDate: '2018-10-23T06:01:00.000Z' },
        { id: 36, title: 'Teste Teste Teste 13', startDate: '2018-10-23T05:01:00.000Z', endDate: '2018-10-23T07:01:00.000Z' },
        { id: 37, title: 'Teste Teste Teste 14', startDate: '2018-10-23T05:01:00.000Z', endDate: '2018-10-23T08:01:00.000Z' },
        { id: 38, title: 'Teste Teste Teste 15', startDate: '2018-10-23T05:01:00.000Z', endDate: '2018-10-23T09:01:00.000Z' },
        { id: 39, title: 'Teste Teste Teste 16', startDate: '2018-10-23T05:01:00.000Z', endDate: '2018-10-23T10:01:00.000Z' },
        { id: 40, title: 'Teste Teste Teste 17', startDate: '2018-10-23T05:01:00.000Z', endDate: '2018-10-23T11:01:00.000Z' },
        { id: 41, title: 'Teste Teste Teste 18', startDate: '2018-10-23T05:01:00.000Z', endDate: '2018-10-23T12:01:00.000Z' },
        { id: 42, title: 'Teste Teste Teste 19', startDate: '2018-10-23T05:01:00.000Z', endDate: '2018-10-23T13:01:00.000Z' },
        { id: 43, title: 'Teste Teste Teste 20', startDate: '2018-10-23T05:01:00.000Z', endDate: '2018-10-23T14:01:00.000Z' },
        { id: 44, title: 'Teste Teste Teste 21', startDate: '2018-10-23T05:01:00.000Z', endDate: '2018-10-23T15:01:00.000Z' },
        { id: 35, title: 'Teste Teste Teste 12', startDate: '2018-10-23T06:01:00.000Z', endDate: '2018-10-23T06:01:00.000Z' },
        { id: 36, title: 'Teste Teste Teste 13', startDate: '2018-10-23T06:01:00.000Z', endDate: '2018-10-23T07:01:00.000Z' },
        { id: 37, title: 'Teste Teste Teste 14', startDate: '2018-10-23T06:01:00.000Z', endDate: '2018-10-23T08:01:00.000Z' },
        { id: 38, title: 'Teste Teste Teste 15', startDate: '2018-10-23T06:01:00.000Z', endDate: '2018-10-23T09:01:00.000Z' },
        { id: 39, title: 'Teste Teste Teste 16', startDate: '2018-10-23T06:01:00.000Z', endDate: '2018-10-23T10:01:00.000Z' },
        { id: 40, title: 'Teste Teste Teste 17', startDate: '2018-10-23T06:01:00.000Z', endDate: '2018-10-23T11:01:00.000Z' },
        { id: 41, title: 'Teste Teste Teste 18', startDate: '2018-10-23T06:01:00.000Z', endDate: '2018-10-23T12:01:00.000Z' },
        { id: 42, title: 'Teste Teste Teste 19', startDate: '2018-10-23T06:01:00.000Z', endDate: '2018-10-23T13:01:00.000Z' },
        { id: 43, title: 'Teste Teste Teste 20', startDate: '2018-10-23T06:01:00.000Z', endDate: '2018-10-23T14:01:00.000Z' },
        { id: 44, title: 'Teste Teste Teste 21', startDate: '2018-10-23T06:01:00.000Z', endDate: '2018-10-23T15:01:00.000Z' },
        
        
        { id: 45, title: 'Teste Teste Teste 20', startDate: '2018-10-25T06:01:00.000Z', endDate: '2018-10-27T14:01:00.000Z' },
        { id: 46, title: 'Teste Teste Teste 21', startDate: '2018-10-25T10:01:00.000Z', endDate: '2018-10-27T15:01:00.000Z' },
        
        { id: 47, title: 'Teste Teste Teste 20', startDate: '2018-10-26T06:01:00.000Z', endDate: '2018-10-27T14:01:00.000Z' },
        { id: 48, title: 'Teste Teste Teste 21', startDate: '2018-10-26T10:01:00.000Z', endDate: '2018-10-27T15:01:00.000Z' },
        
        
        
        { id: 49, title: 'University of Rousse', startDate: '2018-05-07T20:43:00.000Z', endDate: '2018-05-07T21:43:00.000Z' },
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
