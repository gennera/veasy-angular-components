angular.module('veasy.calendar').factory('calendarService', function () {
  
  const buildCalendar = function (config, catalogedEvents) {
    config.viewMode = config.viewMode || 'month';
    const calendar = { viewMode: config.viewMode, initialDate: config.initialDate, weekDays: moment.weekdaysShort() };
    if (config.viewMode === 'month') {
      return {
        ...calendar,
        title: getMonthlyCalendarTitle(config.initialDate),
        weeks: buildMonth(config, config.initialDate.clone(), catalogedEvents, config.initialDate.clone().month()),
      };
    }
    if (config.viewMode === 'week') {
      return {
        ...calendar,
        title: getWeeklyCalendarTitle(config.initialDate),
        week: buildWeek(config, config.initialDate.clone(), catalogedEvents, config.initialDate.clone().month()),
      };
    }
  };

  const getMonthlyCalendarTitle = function (date) {
    return date.format('MMMM YYYY');
  };

  const getWeeklyCalendarTitle = function (date) {
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

  const buildMonth = function (config, intialDate, catalogedEvents, currentMonth) {
    let startDate = intialDate.clone().startOf('month');
    const totalWeeks = 6;
    const weeks = [];
    for (let currentWeek = 1; currentWeek <= totalWeeks ; currentWeek++) {
      weeks.push(buildWeek(config, startDate.clone(), catalogedEvents, currentMonth));
      startDate.add(1, 'weeks');
    }
    return weeks;
  };

  const buildWeek = function (config, intialDate, catalogedEvents, currentMonth) {
    const days = [];
    intialDate.day(0);
    for (let dayOfWeek = intialDate.day(); dayOfWeek < 7; dayOfWeek++) {
      days.push(buildDay(config, intialDate.clone(), catalogedEvents, currentMonth));
      intialDate.add(1, 'days');
    }
    return days;
  };

  const buildDay = function (config, date, events, currentMonth) {
    const day = {
      date,
      year: date.format('YYYY'),
      month: date.format('MM'),
      day: date.format('DD'),
      isCurrentMonth: date.month() === currentMonth,
      isWeekend: date.day() === 0 || date.day() === 6,
      isToday: date.startOf('day').isSame(moment().startOf('day'))
    };
    if (config.viewMode === 'month') {
      return {
        ...day,
        events: setMonthlyEvents(date, events)
      };
    }
    if (config.viewMode === 'week') {
      return {
        ...day,
        multiDayEvents: setMultiDayEvents(config, events, date.year(), date.month(), date.date()),
        timeslots: buildTimeslots(config, date, events)
      };
    }
  };

  const setMonthlyEvents = function (date, events) {
    const year = date.year();
    const month = date.month();
    const day = date.date();
    if (events[year]) {
      if (events[year][month]) {
        return (events[year][month][day] || []).sort((a, b) => moment(a.date).isSameOrBefore(b.date) ? 1 : -1);
      }
    }
    return [];
  };

  const setMultiDayEvents = function (config, events, year, month, day) {
    if (!Object.keys(events).length) return [];
    events[year] = events[year] || {};
    events[year][month] = events[year][month] || {};
    events[year][month][day] = events[year][month][day] || {};
    return events[year][month][day].multiDayEvents || [];
  };

  const buildTimeslots = function (config, date, events) {
    const timeslots = angular.copy(config.timeslots);
    for (let index = 0; index < config.timeslots.length; index++) {
      timeslots[index].events = setTimeslotEvents(date, timeslots[index].time, events)
    }
    return timeslots;
  };

  const setTimeslotEvents = function (date, time, events) {
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
  
  return { buildCalendar };
});
