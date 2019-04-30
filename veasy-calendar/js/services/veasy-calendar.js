angular.module('veasy.calendar').factory('vCalendarService', function () {
  const buildCalendar = function (config, events) {
    const date = config.initialDate ? moment(config.initialDate).startOf('day') : moment().startOf('day');
    const viewMode = config.viewMode || 'month';
    return {
      date,
      viewMode,
      title: getTitle(date, viewMode),
      year: date.year(),
      month: date.month(),
      weekDays: moment.weekdaysShort(),
      weeks: buildMonth(config, date.clone(), events, date.clone().month()),
      week: buildWeek(config, date.clone(), events, date.clone().month()),
      events
    };
  };

  const getTitle = function (date, viewMode) {
    if (viewMode === 'month') {
      return date.format('MMMM YYYY');
    }
    const from = date.clone().startOf('week');
    const to = date.clone().endOf('week');
    if (from.format('MMMM YYYY') === to.format('MMMM YYYY')) {
      return from.format('MMMM YYYY');
    }
    if (from.year() === to.year()) {
      return from.format('MMM') + ' - ' + to.format('MMM YYYY');
    }
    return from.format('MMM YYYY') + ' - ' + to.format('MMM YYYY');
  };

  const buildMonth = function (config, date, events, currentMonth) {
    const weeks = [];
    const startDate = date.clone().startOf('month');
    const totalWeeks = 6;
    let currentWeek = 1;
    while (currentWeek <= totalWeeks) {
      weeks.push(buildWeek(config, startDate, events, currentMonth));
      currentWeek++;
    };
    return weeks;
  };

  const buildWeek = function (config, date, events, currentMonth) {
    const days = [];
    date.day(0);
    let dayOfWeek = date.day();
    do {
      days.push(buildDay(config, date.clone(), events, currentMonth));
      date.add(1, 'days')
      dayOfWeek++;
    } while (dayOfWeek < 7);
    return days;
  };

  const buildDay = function (config, date, events, currentMonth) {
    return {
      date,
      day: date.format('DD'),
      month: date.format('MM'),
      year: date.format('YYYY'),
      // FIXME: DEPRECATED
      // events: fetchDayEvents(date, events),
      isCurrentMonth: date.month() === currentMonth,
      isWeekend: date.day() === 0 || date.day() === 6,
      isToday: date.isSame(moment().startOf('day')),
      timeslots: buildTimeslots(date, events, config)
    };
  };

  const buildTimeslots = function (date, events) {
    var timeslots = [
      { time: '00:00', events: fetchTimeslotEvents(date, '00:00', events), show: false },
      { time: '01:00', events: fetchTimeslotEvents(date, '01:00', events), show: true },
      { time: '02:00', events: fetchTimeslotEvents(date, '02:00', events), show: true },
      { time: '03:00', events: fetchTimeslotEvents(date, '03:00', events), show: true },
      { time: '04:00', events: fetchTimeslotEvents(date, '04:00', events), show: true },
      { time: '05:00', events: fetchTimeslotEvents(date, '05:00', events), show: true },
      { time: '06:00', events: fetchTimeslotEvents(date, '06:00', events), show: true },
      { time: '07:00', events: fetchTimeslotEvents(date, '07:00', events), show: true },
      { time: '08:00', events: fetchTimeslotEvents(date, '08:00', events), show: true },
      { time: '09:00', events: fetchTimeslotEvents(date, '09:00', events), show: true },
      { time: '10:00', events: fetchTimeslotEvents(date, '10:00', events), show: true },
      { time: '11:00', events: fetchTimeslotEvents(date, '11:00', events), show: true },
      { time: '12:00', events: fetchTimeslotEvents(date, '12:00', events), show: true },
      { time: '13:00', events: fetchTimeslotEvents(date, '13:00', events), show: true },
      { time: '14:00', events: fetchTimeslotEvents(date, '14:00', events), show: true },
      { time: '15:00', events: fetchTimeslotEvents(date, '15:00', events), show: true },
      { time: '16:00', events: fetchTimeslotEvents(date, '16:00', events), show: true },
      { time: '17:00', events: fetchTimeslotEvents(date, '17:00', events), show: true },
      { time: '18:00', events: fetchTimeslotEvents(date, '18:00', events), show: true },
      { time: '19:00', events: fetchTimeslotEvents(date, '19:00', events), show: true },
      { time: '20:00', events: fetchTimeslotEvents(date, '20:00', events), show: true },
      { time: '21:00', events: fetchTimeslotEvents(date, '21:00', events), show: true },
      { time: '22:00', events: fetchTimeslotEvents(date, '22:00', events), show: true },
      { time: '23:00', events: fetchTimeslotEvents(date, '23:00', events), show: true }
    ];
    return timeslots;
  };

  const fetchTimeslotEvents = function (date, time, events) {
    const year = date.year();
    const month = date.month();
    const day = date.date();
    if (events[year]) {
      if (events[year][month]) {
        if (events[year][month][day]) {
          return (events[year][month][day][time] || []).sort((a, b) => moment(a.date).isSameOrBefore(b.date) ? 1 : -1);
        }
      }
    }
    return [];
  };

  // FIXME: DEPRECATED
  // const fetchDayEvents = function (date, events) {
  //   const year = date.year();
  //   const month = date.month();
  //   const day = date.date();
  //   if (events[year]) {
  //     if (events[year][month]) {
  //       // return (events[year][month][day] || []).sort((a, b) => moment(a.date).isSameOrBefore(b.date) ? 1 : -1);
  //       if (events[year][month][day]) {
  //         if (events[year][month][day].events) {
  //           return events[year][month][day].events.sort((a, b) => moment(a.date).isSameOrBefore(b.date) ? 1 : -1);
  //         }
  //       }
  //     }
  //   }
  //   return [];
  // };

  const catalogEvents = function (config) {
    const timeslots = config.timeslots;
    const events = config.events;
    const field = config.fields.find(field => field.isEventOrigin);
    const parsedEvents = {};
    for (const event of events) {
      const year = moment(event[field.property]).year();
      const month = moment(event[field.property]).month();
      const day = moment(event[field.property]).date();
      parsedEvents[year] = parsedEvents[year] || {};
      parsedEvents[year][month] = parsedEvents[year][month] || {};
      parsedEvents[year][month][day] = parsedEvents[year][month][day] || {};
      for (let i = 0; i < timeslots.length; i++) {
        const time = timeslots[i].time;
        parsedEvents[year][month][day][time] = parsedEvents[year][month][day][time] || [];
        if (moment(event.startDate).isSameOrBefore(event.endDate)) {
          if (!moment(event.startDate).isSame(event.endDate, 'day')) {
            event.allDay = true;
          }
          // Por enquanto está ignorando os minutos no momento de catalogar os eventos.
          if (moment(event.startDate).hour() === parseInt(time.substr(0, 2))) {
            parsedEvents[year][month][day][time].push(parseFieldTypes(event, config));
          }
        }
      }
    }
    return parsedEvents;
  };

  const parseFieldTypes = function (event, config) {
    const fields = config.fields.filter(field => field.type === 'moment' || field.type === 'date');
    for (const field of fields) {
      event[field.property] = moment(event[field.property])
    }
    return event;
  };

  return { buildCalendar, catalogEvents };
});
