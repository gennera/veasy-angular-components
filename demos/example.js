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

.controller('vCalendarController', function ($scope) {
  const init = function () {
    eventClickListeners();
    $scope.vCalendarConfig = {
      eventModal: {
        title: 'Evento',
        fields: [
          { label: 'Título', type: 'text', value: 'title' },
          { label: 'Data', type: 'moment', value: 'date', format: 'DD/MM/YYYY HH:mm' }
        ]
      },
      events: [
        { id:1, title: 'State University of New York College of Agriculture and Technology at Cobleskill', date: moment('2018-07-17 23:40:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:2, title: 'Cardinal Stefan Wyszynski University in Warsaw', date: moment('2018-07-21 05:12:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:3, title: 'Vesalius College', date: moment('2018-05-21 03:19:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:4, title: 'University of Texas Health Center at Tyler', date: moment('2018-12-17 12:50:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:5, title: 'Buena Vista University', date: moment('2018-01-12 04:14:00', 'YYYY-MM-DD HH:mm:ss'), color: '#b75ece' },
        { id:6, title: 'University of Sunderland', date: moment('2018-11-16 22:04:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:7, title: 'Sinte Gleska University', date: moment('2018-01-17 22:01:00', 'YYYY-MM-DD HH:mm:ss'), color: '#840312' },
        { id:8, title: 'Universidad Pontificia de Salamanca', date: moment('2018-01-21 01:58:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:9, title: 'Yantai Education Institute & Yantai Television University', date: moment('2018-07-16 09:57:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:10, title: 'University of South Africa', date: moment('2018-01-11 05:28:00', 'YYYY-MM-DD HH:mm:ss'), color: '#8e9b30' },
        { id:11, title: 'Loyola University New Orleans', date: moment('2018-11-04 01:59:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:12, title: 'Osmangazi University', date: moment('2018-09-10 16:32:00', 'YYYY-MM-DD HH:mm:ss'), color: '#01b6e6' },
        { id:13, title: 'COSMIQ Institute of Technology', date: moment('2018-11-03 18:21:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:14, title: 'Nova Scotia College of Art and Design', date: moment('2018-01-24 13:53:00', 'YYYY-MM-DD HH:mm:ss'), color: '#3d59fe' },
        { id:15, title: 'University of Fine Arts Belgrade', date: moment('2018-02-07 13:12:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:16, title: 'Universidad de Valparaiso', date: moment('2018-10-14 18:39:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:17, title: 'Coleman College', date: moment('2018-07-11 08:42:00', 'YYYY-MM-DD HH:mm:ss'), color: '#b7a6fe' },
        { id:18, title: 'Walden University', date: moment('2018-12-28 16:12:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:18, title: 'Walden University', date: moment('2018-12-28 16:12:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:18, title: 'Walden University', date: moment('2018-12-28 16:12:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:18, title: 'Walden University', date: moment('2018-12-28 16:12:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:18, title: 'Walden University', date: moment('2018-12-28 16:12:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:19, title: 'The Robert Gordon University', date: moment('2018-08-11 18:44:00', 'YYYY-MM-DD HH:mm:ss'), color: '#8a6eab' },
        { id:20, title: 'Mie University', date: moment('2018-01-17 11:05:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:21, title: 'School of Management Fribourg', date: moment('2018-10-22 04:01:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:22, title: 'University of Rousse', date: moment('2018-05-07 20:43:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:23, title: 'Fachhochschule Stralsund', date: moment('2018-05-29 15:29:00', 'YYYY-MM-DD HH:mm:ss'), color: '#3eee24' },
        { id:24, title: 'National Chung Hsing University,  Taichung', date: moment('2018-06-20 04:22:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:25, title: 'Norwegian Teacher Academy for Studies in Religion and Education', date: moment('2018-08-03 04:24:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:26, title: 'Umutara Polytechnic', date: moment('2018-04-27 15:13:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:27, title: 'State University of New York College of Environmental Science and Forestry', date: moment('2018-09-26 21:42:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:28, title: 'Pandit Ravi Shankar Shukla University', date: moment('2018-09-30 21:30:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:29, title: 'Nnamdi Azikiwe University', date: moment('2018-12-30 18:55:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:30, title: 'Université Libre de Tunis', date: moment('2018-01-21 12:42:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:31, title: 'Southwest Missouri State University - West Plains', date: moment('2018-09-13 12:00:00', 'YYYY-MM-DD HH:mm:ss'), color: '#f739ef' },
        { id:32, title: 'Mazandaran University of Iran', date: moment('2018-03-20 17:35:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:33, title: 'Universidad Nacional Agraria La Molina', date: moment('2018-09-21 15:30:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:34, title: 'Royal College of Art', date: moment('2018-10-01 16:58:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:35, title: 'Medical College of Pennsylvania and Hahnemann University', date: moment('2018-11-04 16:34:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:36, title: 'Sage Graduate School', date: moment('2018-09-27 10:53:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:37, title: 'Sheridan College', date: moment('2018-08-20 03:42:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:38, title: 'University of Sunderland', date: moment('2018-05-08 17:44:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:39, title: 'University of Wales,  Aberystwyth', date: moment('2018-12-18 15:36:00', 'YYYY-MM-DD HH:mm:ss'), color: '#f21746' },
        { id:40, title: 'University of NorthWest', date: moment('2018-05-25 13:46:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:41, title: 'Chhatrapati Shahu Ji Maharaj University', date: moment('2018-07-07 06:48:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:42, title: 'Baku State University', date: moment('2018-05-05 23:00:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:43, title: 'Simmons College', date: moment('2018-06-07 15:56:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:44, title: 'Kanagawa University', date: moment('2018-08-12 22:22:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:45, title: 'Hokkaido University', date: moment('2018-06-01 04:07:00', 'YYYY-MM-DD HH:mm:ss'), color: '#e3dd6e' },
        { id:46, title: 'Fachhochschule Münster', date: moment('2018-07-28 15:07:00', 'YYYY-MM-DD HH:mm:ss'), color: '#9d52ed' },
        { id:47, title: 'Universidad Andina Simón Bolivar', date: moment('2018-03-22 11:14:00', 'YYYY-MM-DD HH:mm:ss'), color: '#ba99c8' },
        { id:48, title: 'University of Nebraska - Omaha', date: moment('2018-04-10 04:49:00', 'YYYY-MM-DD HH:mm:ss') },
        { id:49, title: 'Tripura University', date: moment('2018-10-14 18:46:00', 'YYYY-MM-DD HH:mm:ss'), color: '#51d603' },
        { id:50, title: 'Universität Siegen', date: moment('2018-07-24 06:30:00', 'YYYY-MM-DD HH:mm:ss') }
      ]
    };
  };

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
