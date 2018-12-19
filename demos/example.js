angular.module('example', [
  'veasy.momentFormat',
  'veasy.calendar'
])

.controller('vMomentFormatController', ['$scope', function ($scope) {
  $scope.save = function (inputValue) {
    alert('Input value: ' + inputValue.format('DD/MM/YYYY HH:mm'));
  };

  $scope.$on('veasyMomentFormat:onChange', function (event, data) {
    console.log('veasyMomentFormat:onChange', data);
  });
}])

.controller('vCalendarController', function ($scope, $timeout) {
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
        { id: 1, title: 'State University of New York College of Agriculture and Technology at Cobleskill', startDate: '2018-07-17T23:40:00-03:00' },
        { id: 2, title: 'Cardinal Stefan Wyszynski University in Warsaw', startDate: '2018-07-21T05:12:00-03:00' },
        { id: 3, title: 'Vesalius College', startDate: '2018-05-21T03:19:00-03:00' },
        { id: 4, title: 'University of Texas Health Center at Tyler', startDate: '2018-12-17T12:50:00-03:00' },
        { id: 5, title: 'Buena Vista University', startDate: '2018-01-12T04:14:00-03:00', color: '#b75ece' },
        { id: 6, title: 'University of Sunderland', startDate: '2018-11-16T22:04:00-03:00' },
        { id: 7, title: 'Sinte Gleska University', startDate: '2018-01-17T22:01:00-03:00', color: '#840312' },
        { id: 8, title: 'Universidad Pontificia de Salamanca', startDate: '2018-01-21T01:58:00-03:00' },
        { id: 9, title: 'Yantai Education Institute & Yantai Television University', startDate: '2018-07-16T09:57:00-03:00' },
        { id: 10, title: 'University of South Africa', startDate: '2018-01-11T05:28:00-03:00', color: '#8e9b30' },
        { id: 11, title: 'Loyola University New Orleans', startDate: '2018-11-04T01:59:00-03:00' },
        { id: 12, title: 'Osmangazi University', startDate: '2018-09-10T16:32:00-03:00', color: '#01b6e6' },
        { id: 13, title: 'COSMIQ Institute of Technology', startDate: '2018-11-03T18:21:00-03:00' },
        { id: 14, title: 'Nova Scotia College of Art and Design', startDate: '2018-01-24T13:53:00-03:00', color: '#3d59fe' },
        { id: 15, title: 'University of Fine Arts Belgrade', startDate: '2018-02-07T13:12:00-03:00' },
        { id: 16, title: 'Universidad de Valparaiso', startDate: '2018-10-14T18:39:00-03:00' },
        { id: 17, title: 'Coleman College', startDate: '2018-07-11T08:42:00-03:00', color: '#b7a6fe' },
        { id: 18, title: 'Walden University', startDate: '2018-12-28T16:12:00-03:00' },
        { id: 18, title: 'Walden University', startDate: '2018-12-28T16:12:00-03:00' },
        { id: 18, title: 'Walden University', startDate: '2018-12-28T16:12:00-03:00' },
        { id: 18, title: 'Walden University', startDate: '2018-12-28T16:12:00-03:00' },
        { id: 18, title: 'Walden University', startDate: '2018-12-28T16:12:00-03:00' },
        { id: 19, title: 'The Robert Gordon University', startDate: '2018-08-11T18:44:00-03:00', color: '#8a6eab' },
        { id: 20, title: 'Mie University', startDate: '2018-01-17T11:05:00-03:00' },
        { id: 21, title: 'School of Management Fribourg', startDate: '2018-10-22T04:01:00-03:00' },
        { id: 22, title: 'University of Rousse', startDate: '2018-05-07T20:43:00-03:00' },
        { id: 23, title: 'Fachhochschule Stralsund', startDate: '2018-05-29T15:29:00-03:00', color: '#3eee24' },
        { id: 24, title: 'National Chung Hsing University,  Taichung', startDate: '2018-06-20T04:22:00-03:00' },
        { id: 25, title: 'Norwegian Teacher Academy for Studies in Religion and Education', startDate: '2018-08-03T04:24:00-03:00' },
        { id: 26, title: 'Umutara Polytechnic', startDate: '2018-04-27T15:13:00-03:00' },
        { id: 27, title: 'State University of New York College of Environmental Science and Forestry', startDate: '2018-09-26T21:42:00-03:00' },
        { id: 28, title: 'Pandit Ravi Shankar Shukla University', startDate: '2018-09-30T21:30:00-03:00' },
        { id: 29, title: 'Nnamdi Azikiwe University', startDate: '2018-12-30T18:55:00-03:00' },
        { id: 30, title: 'Université Libre de Tunis', startDate: '2018-01-21T12:42:00-03:00' },
        { id: 31, title: 'Southwest Missouri State University - West Plains', startDate: '2018-09-13T12:00:00-03:00', color: '#f739ef' },
        { id: 32, title: 'Mazandaran University of Iran', startDate: '2018-03-20T17:35:00-03:00' },
        { id: 33, title: 'Universidad Nacional Agraria La Molina', startDate: '2018-09-21T15:30:00-03:00' },
        { id: 34, title: 'Royal College of Art', startDate: '2018-10-01T16:58:00-03:00' },
        { id: 35, title: 'Medical College of Pennsylvania and Hahnemann University', startDate: '2018-11-04T16:34:00-03:00' },
        { id: 36, title: 'Sage Graduate School', startDate: '2018-09-27T10:53:00-03:00' },
        { id: 37, title: 'Sheridan College', startDate: '2018-08-20T03:42:00-03:00' },
        { id: 38, title: 'University of Sunderland', startDate: '2018-05-08T17:44:00-03:00' },
        { id: 39, title: 'University of Wales,  Aberystwyth', startDate: '2018-12-18T15:36:00-03:00', color: '#f21746' },
        { id: 40, title: 'University of NorthWest', startDate: '2018-05-25T13:46:00-03:00' },
        { id: 41, title: 'Chhatrapati Shahu Ji Maharaj University', startDate: '2018-07-07T06:48:00-03:00' },
        { id: 42, title: 'Baku State University', startDate: '2018-05-05T23:00:00-03:00' },
        { id: 43, title: 'Simmons College', startDate: '2018-06-07T15:56:00-03:00' },
        { id: 44, title: 'Kanagawa University', startDate: '2018-08-12T22:22:00-03:00' },
        { id: 45, title: 'Hokkaido University', startDate: '2018-06-01T04:07:00-03:00', color: '#e3dd6e' },
        { id: 46, title: 'Fachhochschule Münster', startDate: '2018-07-28T15:07:00-03:00', color: '#9d52ed' },
        { id: 47, title: 'Universidad Andina Simón Bolivar', startDate: '2018-03-22T11:14:00-03:00', color: '#ba99c8' },
        { id: 48, title: 'University of Nebraska - Omaha', startDate: '2018-04-10T04:49:00-03:00' },
        { id: 49, title: 'Tripura University', startDate: '2018-10-14T18:46:00-03:00', color: '#51d603' },
        { id: 50, title: 'Universität Siegen', startDate: '2018-07-24T06:30:00-03:00' }
      ];
    }, 1000);
  }

  $scope.addNewEvent = function () {
    $scope.$broadcast('veasyCalendar:addNewEvent', {});
  };

  const eventClickListeners = function () {
    $scope.$on('veasyCalendar:onClickDay', function (event, data) {
      console.log('veasyCalendar:onClickDay', data);
    });
    $scope.$on('veasyCalendar:onClickEvent', function (event, data) {
      console.log('veasyCalendar:onClickEvent', data);
    });

    $scope.$on('veasyCalendar:onCloseEvent', function (event, data) {
      console.log('veasyCalendar:onCloseEvent', data);
    });

    $scope.$on('veasyCalendar:onSaveEvent', function (event, data) {
      console.log('veasyCalendar:onSaveEvent', data);
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

  init();
});
