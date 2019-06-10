angular.module('veasy.calendar').factory('catalogService', function () {

  const catalogEvents = function (config) {
    const originDateField = config.fields.find(field => field.isEventOrigin).property;
    let cataloguedEvents = {};
    for (const event of config.events) {
      event.id = btoa(JSON.stringify(event));
      event.color = event.color || '';
      if (config.randomEventsColors) {
        event.color = `rgb(${(Math.floor(Math.random() * 256))}, ${(Math.floor(Math.random() * 256))}, ${(Math.floor(Math.random() * 256))})`;
      }
      const originDate = moment(event[originDateField]);
      event.startDate = moment(event.startDate);
      event.endDate = moment(event.endDate);
      cataloguedEvents = mountEventCatalogStructure(cataloguedEvents, config.viewMode, originDate.year(), originDate.month(), originDate.date(), config.timeslots);
      if (isValidEvent(event)) {
        if (config.viewMode === 'month') {
          cataloguedEvents = catalogMonthlyEvent(cataloguedEvents, event);
        } else if (config.viewMode === 'week') {
          if (isMultiDayEvent(event)) {
            event.isMultiDayEvent = true;
            cataloguedEvents = catalogMultiDayEvent(config, cataloguedEvents, event, originDate.year(), originDate.month(), originDate.date());
          } else {
            cataloguedEvents = catalogTimeslotEvent(cataloguedEvents, event, originDate.year(), originDate.month(), originDate.date(), config.timeslots);
          }
        }
      }
    }
    return cataloguedEvents;
  };

  const mountEventCatalogStructure = function (events, viewMode, year, month, day, timeslots) {
    events[year] = events[year] || {};
    events[year][month] = events[year][month] || {};
    if (viewMode === 'month') {
      events[year][month][day] = events[year][month][day] || [];
    } else if (viewMode === 'week') {
      events[year][month][day] = events[year][month][day] || {};
      events[year][month][day].multiDayEvents = events[year][month][day].multiDayEvents || [];
      if (timeslots) {
        for (let i = 0; i < timeslots.length; i++) {
          const timeslot = timeslots[i].time;
          events[year][month][day][timeslot] = events[year][month][day][timeslot] || [];
        }
      }
    }
    return events;
  };

  const isValidEvent = function (event) {
    return event.startDate.isSameOrBefore(event.endDate);
  };

  const isMultiDayEvent = function (event) {
    return !event.startDate.isSame(event.endDate, 'day');
  };

  const catalogMonthlyEvent = function (events, event) {
    let startDate = event.startDate.clone();
    do {
      events[startDate.year()] = events[startDate.year()] || {};
      events[startDate.year()][startDate.month()] = events[startDate.year()][startDate.month()] || {};
      events[startDate.year()][startDate.month()][startDate.date()] = events[startDate.year()][startDate.month()][startDate.date()] || [];
      events[startDate.year()][startDate.month()][startDate.date()].push(event);
      startDate.add(1, 'days');
    } while (startDate.isSameOrBefore(event.endDate));
    return events;
  };

  const catalogMultiDayEvent = function (config, events, event, year, month, day) {
    const payload = Math.ceil(event.endDate.diff(event.startDate, 'hours') / 24);
    let chunk = 0;
    let date = event.startDate.clone();
    const startOfWeek = config.initialDate.clone().startOf('week');
    const endOfWeek = config.initialDate.clone().endOf('week');
    do {
      event = { ...event, chunk, payload, isCurrentWeek: date.isBetween(startOfWeek, endOfWeek, null, '[]') };
      events = addMultiDayEvent(events, event, date.year(), date.month(), date.date());
      date.add(1, 'days');
      chunk++;
    } while (date.isSameOrBefore(event.endDate));
    return events;
  };

  const catalogTimeslotEvent = function (events, event, year, month, day, timeslots) {
    const timeslot = timeslots.find(timeslot => event.startDate.hour() === getTimeslotHour(timeslot)).time;
    events[year][month][day][timeslot].push(event);
    return events;
  };

  const getTimeslotHour = function (timeslot) {
    return parseInt(timeslot.time.substr(0, 2));
  };

  const addMultiDayEvent = function (events, event, year, month, day) {
    events[year] = events[year] || {};
    events[year][month] = events[year][month] || {};
    events[year][month][day] = events[year][month][day] || {};
    events[year][month][day].multiDayEvents = events[year][month][day].multiDayEvents || [];
    events[year][month][day].multiDayEvents.push(event);
    return events;
  };

  return { catalogEvents };
});




