
 const emailList = [
  {
    id: 1,
    from: { email: "john.doe@example.com", name: "John Doe" },
    date: 1728441600000, // 2024-10-10
    subject: "Meeting reminder",
    short_description: "Reminder for the meeting at 10 AM."
  },
  {
    id: 2,
    from: { email: "jane.smith@example.com", name: "Jane Smith" },
    date: 1728528000000, // 2024-10-11
    subject: "Project update",
    short_description: "Here's the latest update on the project."
  },
  {
    id: 3,
    from: { email: "info@company.com", name: "Company Info" },
    date: 1722624000000, // 2024-09-29
    subject: "Monthly newsletter",
    short_description: "Check out the latest news and updates."
  },
  {
    id: 4,
    from: { email: "support@service.com", name: "Customer Support" },
    date: 1727990400000, // 2024-10-05
    subject: "Your ticket has been resolved",
    short_description: "Your support ticket has been resolved. Thank you!"
  },
  {
    id: 5,
    from: { email: "noreply@bank.com", name: "Bank Notifications" },
    date: 1728614400000, // 2024-10-12
    subject: "Account statement",
    short_description: "Your monthly account statement is now available."
  },
  {
    id: 6,
    from: { email: "newsletter@travel.com", name: "Travel Deals" },
    date: 1722556800000, // 2024-10-01
    subject: "Exclusive travel offers!",
    short_description: "Book your dream vacation at discounted prices."
  },
  {
    id: 7,
    from: { email: "alerts@security.com", name: "Security Alerts" },
    date: 1728700800000, // 2024-10-13
    subject: "Suspicious login attempt",
    short_description: "We detected a suspicious login attempt to your account."
  },
  {
    id: 8,
    from: { email: "offers@shopping.com", name: "Shopping Offers" },
    date: 1728268800000, // 2024-10-08
    subject: "Flash sale: Up to 50% off",
    short_description: "Don't miss our exclusive flash sale!"
  },
  {
    id: 9,
    from: { email: "info@education.com", name: "Education Info" },
    date: 1722710400000, // 2024-09-30
    subject: "New course announcement",
    short_description: "Enroll in our new data science course."
  },
  {
    id: 10,
    from: { email: "updates@socialmedia.com", name: "Social Media Updates" },
    date: 1728076800000, // 2024-10-06
    subject: "Your post got 100 likes!",
    short_description: "Congratulations! Your recent post is gaining attention."
  },
  {
    id: 11,
    from: { email: "feedback@survey.com", name: "Survey Team" },
    date: 1722537600000, // 2024-09-28
    subject: "We value your feedback!",
    short_description: "Please take a moment to complete our survey."
  },
  {
    id: 12,
    from: { email: "news@techworld.com", name: "Tech World" },
    date: 1728371200000, // 2024-10-09
    subject: "New gadget releases",
    short_description: "Check out the hottest gadgets just released."
  },
  {
    id: 13,
    from: { email: "events@conference.com", name: "Conference Team" },
    date: 1727318400000, // 2024-09-26
    subject: "Upcoming tech conference",
    short_description: "Join us for the upcoming tech conference next month."
  },
  {
    id: 14,
    from: { email: "admin@portal.com", name: "Portal Admin" },
    date: 1726147200000, // 2024-09-14
    subject: "Password reset instructions",
    short_description: "Click here to reset your password."
  },
  {
    id: 15,
    from: { email: "sales@automotive.com", name: "Automotive Sales" },
    date: 1728806400000, // 2024-10-14
    subject: "Special discounts on new models",
    short_description: "Don't miss our special offers on the latest car models."
  }
];

const emailBodies = [
  {
    id: 1,
    body: "<div><p>Hello John,</p><p>This is a reminder for the important meeting scheduled at 10 AM tomorrow. Please make sure to be on time.</p><p>Best regards,<br>Team</p></div>"
  },
  {
    id: 2,
    body: "<div><p>Hi Jane,</p><p>The project is moving ahead as planned. Here is the latest update on the current progress.</p><p>Thanks,<br>Project Manager</p></div>"
  },
  {
    id: 3,
    body: "<div><p>Dear Subscriber,</p><p>Here is our monthly newsletter filled with updates and exciting news!</p><p>Stay tuned,<br>Company Info</p></div>"
  },
  {
    id: 4,
    body: "<div><p>Hi,</p><p>Your support ticket has been successfully resolved. Please let us know if you need further assistance.</p><p>Thanks,<br>Customer Support</p></div>"
  },
  {
    id: 5,
    body: "<div><p>Dear Customer,</p><p>Your monthly account statement is now available. Please log in to your account to view the details.</p><p>Regards,<br>Your Bank</p></div>"
  },
  {
    id: 6,
    body: "<div><p>Hi Traveler,</p><p>We are excited to offer you exclusive travel deals! Book your dream vacation now and enjoy great discounts.</p><p>Safe travels,<br>Travel Deals Team</p></div>"
  },
  {
    id: 7,
    body: "<div><p>Alert,</p><p>We detected a suspicious login attempt to your account. If this wasn't you, please change your password immediately.</p><p>Stay safe,<br>Security Team</p></div>"
  },
  {
    id: 8,
    body: "<div><p>Hello Shopper,</p><p>Don't miss out on our exclusive flash sale! Enjoy up to 50% off on selected items.</p><p>Happy shopping,<br>Shopping Offers</p></div>"
  },
  {
    id: 9,
    body: "<div><p>Dear Learner,</p><p>We are thrilled to announce a new course on data science. Enroll now to kickstart your learning journey!</p><p>Best regards,<br>Education Team</p></div>"
  },
  {
    id: 10,
    body: "<div><p>Hi,</p><p>Great news! Your recent post has received 100 likes. Keep sharing to engage your audience even more.</p><p>Cheers,<br>Social Media Team</p></div>"
  },
  {
    id: 11,
    body: "<div><p>Dear Valued Customer,</p><p>We would love to hear your feedback. Please take a moment to complete our survey and let us know your thoughts.</p><p>Best,<br>Survey Team</p></div>"
  },
  {
    id: 12,
    body: "<div><p>Hey Tech Enthusiast,</p><p>Check out the latest gadget releases in our store! Exciting new tech is just a click away.</p><p>Best,<br>Tech World</p></div>"
  },
  {
    id: 13,
    body: "<div><p>Dear Attendee,</p><p>Join us at the upcoming tech conference for insightful sessions and networking opportunities.</p><p>See you there,<br>Conference Team</p></div>"
  },
  {
    id: 14,
    body: "<div><p>Dear User,</p><p>Please follow the instructions to reset your password. If you did not request a reset, ignore this message.</p><p>Best,<br>Portal Admin</p></div>"
  },
  {
    id: 15,
    body: "<div><p>Dear Customer,</p><p>Special discounts are available on our latest car models. Don't miss out on these great offers!</p><p>Best,<br>Automotive Sales Team</p></div>"
  }
];


module.exports = {
  emailList,
  emailBodies
}
