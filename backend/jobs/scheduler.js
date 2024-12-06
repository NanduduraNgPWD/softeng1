const schedule = require('node-schedule');
const db = require('../db/dbConfig');

// mark unavailable
schedule.scheduleJob('0 * * * *', async () => {
  console.log('Scheduled job: Marking motorcycles as unavailable...');
  const today = new Date().toISOString().split("T")[0];

  try {
    const [bookings] = await db.query(`
      SELECT motorcycle_id
      FROM bookings
      WHERE rental_start_date = ? AND rental_status = 'Ongoing'
    `, [today]);

    for (const booking of bookings) {
      await db.query(`
        UPDATE motorcycles
        SET is_available = 0
        WHERE motorcycle_id = ?
      `, [booking.motorcycle_id]);
    }

    console.log('Motorcycles marked as unavailable.');
  } catch (error) {
    console.error('Error marking motorcycles as unavailable:', error);
  }
});

// mark available
schedule.scheduleJob('0 * * * *', async () => {
  console.log('Scheduled job: Marking motorcycles as available...');
  const today = new Date().toISOString().split("T")[0];

  try {
    const [bookings] = await db.query(`
      SELECT motorcycle_id
      FROM bookings
      WHERE rental_end_date = ? AND rental_status = 'Ongoing'
    `, [today]);

    for (const booking of bookings) {
      await db.query(`
        UPDATE motorcycles
        SET is_available = 1
        WHERE motorcycle_id = ?
      `, [booking.motorcycle_id]);
    }

    console.log('Motorcycles marked as available.');
  } catch (error) {
    console.error('Error marking motorcycles as available:', error);
  }
});


// set to ongoing
schedule.scheduleJob('0 * * * *', async () => {
    console.log('Scheduled job: Marking motorcycles as available...');
    const today = new Date().toISOString().split("T")[0];
  
    try {
      const [upcomingRentals] = await db.query(`
        SELECT booking_id
        FROM bookings
        WHERE rental_start_date = ? AND rental_status = 'Upcoming'
      `, [today]);
  
      for (const rental of upcomingRentals) {
        await db.query(`
          UPDATE bookings
          SET rental_status = 'Ongoing'
          WHERE booking_id = ?
        `, [rental.booking_id]);
      }
  
      console.log('Upcoming booking marked as ongoing.');
    } catch (error) {
      console.error('Error marking booking as ongoing:', error);
    }
  });

// set to complete
schedule.scheduleJob('0 * * * *', async () => {
  console.log('Scheduled job: Marking ongoing bookings as complete...');
  const today = new Date().toISOString().split("T")[0]; // Format today's date as YYYY-MM-DD

  try {
    // Fetch ongoing bookings where the end date is today
    const [upcomingRentals] = await db.query(`
      SELECT booking_id
      FROM bookings
      WHERE rental_end_date = ? AND rental_status = 'Ongoing'
    `, [today]);

    // Update the status of each booking to 'Completed'
    for (const rental of upcomingRentals) {
      await db.query(`
        UPDATE bookings
        SET rental_status = 'Completed'
        WHERE booking_id = ?
      `, [rental.booking_id]);
    }

    console.log('Ongoing bookings marked as complete HEHE.');
  } catch (error) {
    console.error('Error marking bookings as complete:', error);
  }
});
