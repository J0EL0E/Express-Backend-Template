import eventSchedule from "../models/eventModel.js";
import { sendEmail } from "../service/mailService.js";

const eventInvitationEmailTemplate = (user, event) => `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div style="max-width: 600px; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); text-align: center;">

          <h2 style="color: #333;">You're Invited to an Event!</h2>

          <p style="font-size: 16px; color: #555;">
            Hi ${user.name},<br><br>
            You have been invited to join the event <strong>${event.title}</strong>
          </p>

          <p style="font-size: 16px; color: #555;">
            📅 <strong>Date:</strong> ${event.date}<br>
            🕒 <strong>Time:</strong> ${event.time}<br>
            📍 <strong>Location:</strong> ${event.location}
          </p>

          <p style="font-size: 15px; color: #666;">
            Click below to view event details and RSVP.
          </p>

          <a href="${event.link}" style="display: inline-block; margin-top: 15px; background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            View Event & RSVP
          </a>

          <p style="font-size: 13px; color: #aaa; margin-top: 30px;">
            If you didn’t expect this invitation, feel free to ignore this email.
          </p>

          <p style="font-size: 14px; color: #999; margin-top: 10px;">
            – The EventEase Team
          </p>
        </div>
      </body>
    </html>`;

const updateEventInvitationEmailTemplate = (user, event) => `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div style="max-width: 600px; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); text-align: center;">

          <h2 style="color: #FF9800;">Event Details Updated</h2>

          <p style="font-size: 16px; color: #555;">
            Hi ${user.name},<br><br>
            The details for the event <strong>${event.title}</strong> have recently been updated by <strong>${event.hostName}</strong>.
          </p>

          <p style="font-size: 16px; color: #555;">
            📅 <strong>New Date:</strong> ${event.date}<br>
            🕒 <strong>New Time:</strong> ${event.time}<br>
            📍 <strong>New Location:</strong> ${event.location}
          </p>

          <p style="font-size: 15px; color: #666;">
            Click below to review the updated event details.
          </p>

          <a href="${event.link}" style="display: inline-block; margin-top: 15px; background-color: #FF9800; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            View Updated Event
          </a>

          <p style="font-size: 13px; color: #aaa; margin-top: 30px;">
            Please update your calendar if needed.
          </p>

          <p style="font-size: 14px; color: #999; margin-top: 10px;">
            – The EventEase Team
          </p>
        </div>
      </body>
    </html>

`;

const cancelEventInvitationEmailTemplate = (user, event) => `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div style="max-width: 600px; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); text-align: center;">
        
        <h2 style="color: #f44336;">Event Cancelled</h2>

        <p style="font-size: 16px; color: #555;">
            Hi ${user.name},<br><br>
            We regret to inform you that the event <strong>${event.title}</strong> scheduled for
            <strong>${event.date}</strong> at <strong>${event.time}</strong> has been <strong>cancelled</strong> by the organizer <strong>${event.hostName}</strong>.
        </p>

        <p style="font-size: 15px; color: #666;">
            We apologize for the inconvenience. Please reach out to the organizer if you need more information.
        </p>

        <a href="${event.link}" style="display: inline-block; margin-top: 15px; background-color: #f44336; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            View Event Page
        </a>

        <p style="font-size: 14px; color: #999; margin-top: 30px;">
            – The EventEase Team
        </p>
        </div>
    </body>
    </html>

`;


export const eventInvitationEmailNotification  = async (receiverEmail, receiverName, eventId) => {
    const userData = {
        name: receiverName,
        email: receiverEmail,
    };
    const event = await eventSchedule.findOne({eventId: eventId});
    console.log(event)
    const eventData = {
        title: event.event_title,
        date: event.date,
        time: event.time,
        location: event.event_location,
        link: event.event_link
    };
    console.log(eventData);
    const emailSubject = `You have been invited to attend ${event.event_title}`

    if(Array.isArray(receiverEmail) && receiverEmail.length > 0){
        for (let email in receiverEmail){
            return await sendEmail({to: email, subject: emailSubject, html:eventInvitationEmailTemplate(userData, eventData)})   
        }
    }

    return await sendEmail({to: receiverEmail, subject: emailSubject, html:eventInvitationEmailTemplate(userData, eventData)})  

}

export const updateEventInvitationEmailNotification  = async (receiverEmail, receiverName, eventId) => {
    const userData = {
        name: receiverName,
        email: receiverEmail,
    };
    const event = await eventSchedule.findOne({eventId: eventId});
    const eventData = {
        title: event.event_title,
        date: event.date,
        time: event.time,
        location: event.event_location,
        link: event.event_link
    };
    const emailSubject = `There are some update to the event details for ${event.event_title}`

    if(Array.isArray(receiverEmail) && receiverEmail.length > 0){
        for (let email in receiverEmail){
            return await sendEmail({to: email, subject: emailSubject, html:updateEventInvitationEmailTemplate(userData, eventData)})   
        }
    }

    return await sendEmail({to: receiverEmail, subject: emailSubject, html:updateEventInvitationEmailTemplate(userData, eventData)})  

}

export const cancelEventInvitationEmailNotification  = async (receiverEmail, receiverName, eventId) => {
    const userData = {
        name: receiverName,
        email: receiverEmail,
    };
    const event = await eventSchedule.findOne({eventId: eventId});
    const eventData = {
        title: event.event_title,
        date: event.date,
        time: event.time,
        location: event.event_location,
        link: event.event_link
    };
    const emailSubject = `There are some update to the event details for ${event.event_title}`

    if(Array.isArray(receiverEmail) && receiverEmail.length > 0){
        for (let email in receiverEmail){
            return await sendEmail({to: email, subject: emailSubject, html:cancelEventInvitationEmailTemplate(userData, eventData)})   
        }
    }

    return await sendEmail({to: receiverEmail, subject: emailSubject, html:cancelEventInvitationEmailTemplate(userData, eventData)})  

}