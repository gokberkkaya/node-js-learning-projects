const nodemailer = require('nodemailer');
const Course = require('../models/Course');
const User = require('../models/User');

exports.getMainPage = async (req, res) => {
  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudent = await User.find({ role: 'student' }).countDocuments();
  const totalTeacher = await User.find({ role: 'teacher' }).countDocuments();

  res.render('index', {
    page_name: 'index',
    courses,
    totalStudent,
    totalCourses,
    totalTeacher,
  });
};

exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: 'about'
    });
};

exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name: 'register'
    });
};

exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name: 'login'
    });
};

exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: 'contact'
    });
};

exports.sendEmail = async (req, res) => {
    try {
        const outputMessage = 
        `<h1>Mail Details </h1>
        <ul>
          <li>Name: ${req.body.name}</li>
          <li>Email: ${req.body.email}</li>
        </ul>
        <h1>Message</h1>
        <p>${req.body.message}</p>`;
    
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: 'sender mail', // gmail account
            pass: 'sender mail password', // gmail pass
          },
        });
    
        let info = await transporter.sendMail({
          from: '"Smart Education 👻" <sender mail>', // sender address
          to: 'mail will send to this mail', // list of receivers
          subject: 'Smart Education New Message ✔', // Subject line
          html: outputMessage, // html body
        });
    
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        req.flash("success", "We Received your message succesfully");
        res.status(200).redirect('contact');
      } catch (error) {
        req.flash("error", "Sorry, something happened :(");
        res.status(400).redirect('contact');
      }
};