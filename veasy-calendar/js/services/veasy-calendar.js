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
      weeks: buildMonth(date.clone(), events, date.clone().month()),
      week: buildWeek(date.clone(), events, date.clone().month()),
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

  const buildMonth = function (date, events, currentMonth) {
    const weeks = [];
    const startDate = date.clone().startOf('month');
    const totalWeeks = 6;
    let currentWeek = 1;
    while (currentWeek <= totalWeeks) {
      weeks.push(buildWeek(startDate, events, currentMonth));
      currentWeek++;
    };
    return weeks;
  };

  const buildWeek = function (date, events, currentMonth) {
    const days = [];
    date.day(0);
    let dayOfWeek = date.day();
    do {
      days.push(buildDay(date.clone(), events, currentMonth));
      date.add(1, 'days')
      dayOfWeek++;
    } while (dayOfWeek < 7);
    return days;
  };

  const buildDay = function (date, events, currentMonth) {
    return {
      date,
      day: date.format('DD'),
      month: date.format('MM'),
      year: date.format('YYYY'),
      events: fetchDayEvents(date, events),
      isCurrentMonth: date.month() === currentMonth,
      isWeekend: date.day() === 0 || date.day() === 6,
      isToday: date.isSame(moment().startOf('day'))
    };
  };

  const fetchDayEvents = function (date, allEvents) {
    const year = date.year();
    const month = date.month();
    const day = date.date();
    if (allEvents[year]) {
      if (allEvents[year][month]) {
        return (allEvents[year][month][day] || []).sort((a, b) => moment(a.date).isSameOrBefore(b.date) ? 1 : -1);
      }
    }
    return [];
  };

  const catalogEvents = function (config) {
    const events = config.events;
    const field = config.fields.find(field => field.isEventOrigin);
    const parsedEvents = {};
    for (const event of events) {
      const year = moment(event[field.property]).year();
      const month = moment(event[field.property]).month();
      const day = moment(event[field.property]).date();
      parsedEvents[year] = parsedEvents[year] || {};
      parsedEvents[year][month] = parsedEvents[year][month] || {};
      parsedEvents[year][month][day] = parsedEvents[year][month][day] || [];
      parsedEvents[year][month][day].push(parseFieldTypes(event, config));
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
