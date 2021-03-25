import Head from "next/head";
import dbConnect from "../utils/dbConnect";
import dateConversion from "../utils/dateConversion";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../components/modules/Calendar.module.scss";
import EventObject from "../models/EventObject";
import AddEvent from "../components/AddEvent";
import EventList from "../components/EventList";

function CalendarWrapper(props) {
  const [value, setValue] = useState(new Date());
  const dbEvents = JSON.parse(props.events)

  function tileContent(props) {
    const dayEvents = dbEvents.filter(event => event.date === dateConversion(props.date));
    
    if (dayEvents.length < 1) return

    return (
      <ul className={styles.ulReset}>
        {dayEvents.map(event => {
          return (
            <li
              key={event.name}
              style={{background: event.color}}
              className={styles.liItem}
            >
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      <Head>
        <title>Easywintraining games</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish&family=Philosopher:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.calendarWrapper}>
        <Calendar
          className={styles.reactCalendar__main}
          onClickDay={setValue}
          value={value}
          locale="fr-FR"
          tileContent={tileContent}
          tileClassName={styles.reactCalendar__tile}
        />
        <AddEvent/>
      </div>

      <div className={styles.eventInfoWrapper}>
        <p>{dateConversion(value)}</p>
        <EventList 
          dbEvents={dbEvents}
          dateConversion={dateConversion}
          value={value}
        />
      </div>
    </>
  );
}

export async function getStaticProps() {
  await dbConnect()

  const events = await EventObject.find({})
 
  return { 
    props: {
      events: JSON.stringify(events),
    }
  }
}

export default CalendarWrapper