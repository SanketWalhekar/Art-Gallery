import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: "fw19if002@gmail.com", 
    pass: "ypss wtpw zmvh wzvo", 
  },
});

export const sendEmail=(mailOptions)=>{
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent successfully:', info.response);
        }
    });
}

export default {sendEmail};