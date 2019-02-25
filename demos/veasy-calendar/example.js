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
      initialDate: moment('2018-12-01'),
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
        { id: 1, title: 'State University of New York College of Agriculture and Technology at Cobleskill', startDate: '2018-07-17T23:40:00.000Z', endDate: '2018-07-17T00:40:00.000Z' },
        { id: 2, title: 'Cardinal Stefan Wyszynski University in Warsaw', startDate: '2018-07-21T05:12:00.000Z', endDate: '2018-07-21T06:12:00.000Z' },
        { id: 3, title: 'Vesalius College', startDate: '2018-05-21T03:19:00.000Z', endDate: '2018-05-21T05:19:00.000Z' },
        { id: 4, title: 'University of Texas Health Center at Tyler', startDate: '2018-12-17T12:50:00.000Z', endDate: '2018-12-17T13:50:00.000Z' },
        { id: 5, title: 'Buena Vista University', startDate: '2018-01-12T04:14:00.000Z', endDate: '2018-01-12T05:14:00.000Z', color: '#b75ece' },
        { id: 6, title: 'University of Sunderland', startDate: '2018-11-16T22:04:00.000Z', endDate: '2018-11-16T23:04:00.000Z' },
        { id: 7, title: 'Sinte Gleska University', startDate: '2018-01-17T22:01:00.000Z', endDate: '2018-01-17T23:01:00.000Z', color: '#840312' },
        { id: 8, title: 'Universidad Pontificia de Salamanca', startDate: '2018-01-21T01:58:00.000Z', endDate: '2018-01-21T02:58:00.000Z' },
        { id: 9, title: 'Yantai Education Institute & Yantai Television University', startDate: '2018-07-16T09:57:00.000Z', endDate: '2018-07-16T10:57:00.000Z' },
        { id: 10, title: 'University of South Africa', startDate: '2018-01-11T05:28:00.000Z', endDate: '2018-01-11T06:28:00.000Z', color: '#8e9b30' },
        { id: 11, title: 'Loyola University New Orleans', startDate: '2018-11-04T01:59:00.000Z', endDate: '2018-11-05T01:59:00.000Z' },
        { id: 12, title: 'Osmangazi University', startDate: '2018-09-10T16:32:00.000Z', endDate: '2018-09-10T17:32:00.000Z', color: '#01b6e6' },
        { id: 13, title: 'COSMIQ Institute of Technology', startDate: '2018-11-03T18:21:00.000Z', endDate: '2018-11-03T19:21:00.000Z' },
        { id: 14, title: 'Nova Scotia College of Art and Design', startDate: '2018-01-24T13:53:00.000Z', endDate: '2018-01-24T14:53:00.000Z', color: '#3d59fe' },
        { id: 15, title: 'University of Fine Arts Belgrade', startDate: '2018-02-07T13:12:00.000Z', endDate: '2018-02-07T14:12:00.000Z' },
        { id: 16, title: 'Universidad de Valparaiso', startDate: '2018-10-14T18:39:00.000Z', endDate: '2018-10-14T19:39:00.000Z' },
        { id: 17, title: 'Coleman College', startDate: '2018-07-11T08:42:00.000Z', endDate: '2018-07-11T09:42:00.000Z', color: '#b7a6fe' },
        { id: 18, title: 'Walden University', startDate: '2018-12-28T13:13:00.000Z', endDate: '2018-12-28T14:13:00.000Z' },
        { id: 19, title: 'Walden University', startDate: '2018-12-28T12:12:00.000Z', endDate: '2018-12-28T13:12:00.000Z' },
        { id: 20, title: 'Walden University', startDate: '2018-12-28T11:11:00.000Z', endDate: '2018-12-28T12:11:00.000Z' },
        { id: 21, title: 'Walden University', startDate: '2018-12-28T14:14:00.000Z', endDate: '2018-12-28T15:14:00.000Z' },
        { id: 22, title: 'Walden University', startDate: '2018-12-28T16:16:00.000Z', endDate: '2018-12-28T17:16:00.000Z' },
        { id: 23, title: 'The Robert Gordon University', startDate: '2018-08-11T18:44:00.000Z', endDate: '2018-08-11T19:44:00.000Z', color: '#8a6eab' },
        { id: 24, title: 'Mie University', startDate: '2018-01-17T11:05:00.000Z', endDate: '2018-01-17T12:05:00.000Z' },
        { id: 25, title: 'School of Management Fribourg', startDate: '2018-10-22T04:01:00.000Z', endDate: '2018-10-22T05:01:00.000Z' },
        { id: 26, title: 'University of Rousse', startDate: '2018-05-07T20:43:00.000Z', endDate: '2018-05-07T21:43:00.000Z' }
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
