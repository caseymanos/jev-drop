"use strict";
const PLAYGROUND_MESSAGES = [
  {
    id: "refund",
    sender: "Alex · Acme",
    subject: "Charged twice this month",
    text: "Our card was charged twice for September. Could you check the duplicate and refund the extra payment? We are otherwise happy with the service.",
  },
  {
    id: "outage",
    sender: "Sam · Northstar",
    subject: "Checkout is down",
    text: "Customers cannot complete purchases after this morning’s update. We are losing orders. Can someone help restore checkout right now?",
  },
  {
    id: "invoice",
    sender: "Maya · Studio 8",
    subject: "Invoice for our records",
    text: "Could you send last month’s invoice when you have a moment? Everything is paid; our accountant just needs a copy. No rush.",
  },
  {
    id: "lunch",
    sender: "Jamie · Friend",
    subject: "Lunch in twenty minutes?",
    text: "I am near your office. Want to grab lunch in twenty minutes? Let me know!",
  },
  {
    id: "resolved",
    sender: "Lee · Orchard",
    subject: "All fixed—thank you",
    text: "The patch worked perfectly. We are all set and no follow-up is needed. Thanks for the quick response.",
  },
  {
    id: "digest",
    sender: "The Weekly",
    subject: "Your design reading list",
    text: "This week: interface typography, designing for accessibility, and a tour of independent magazines. Read whenever you have time.",
  },
  {
    id: "renewal",
    sender: "Priya · Cedar",
    subject: "Before we renew",
    text: "Our annual renewal is next week. The missing SSO feature is becoming a blocker for our security team. Unless there is a firm timeline, we will move to another vendor.",
  },
  {
    id: "proposal",
    sender: "Eli · New prospect",
    subject: "Can we start a pilot?",
    text: "Your demo looked like a fit for our 40-person support team. Could you send pricing and available times for a pilot kickoff next week?",
  },
  {
    id: "phishing",
    sender: "Account Notice · Unknown sender",
    subject: "URGENT: verify your password",
    text: "Your account will be deleted in one hour. Reply with your password and verification code immediately to retain access. This unsolicited message is from an unknown sender.",
  },
  {
    id: "security",
    sender: "Nora · Security researcher",
    subject: "Private vulnerability report",
    text: "I found an endpoint exposing other organizations’ invoice metadata. I have a minimal reproduction and have not published it. Please provide a secure channel for disclosure today.",
  },
  {
    id: "contract",
    sender: "Omar · Legal",
    subject: "Signature needed by 5pm",
    text: "The approved supplier contract is ready. We need your signature by 5pm today to keep the implementation slot. All legal review is complete.",
  },
  {
    id: "delivery",
    sender: "Parcel updates",
    subject: "Delivery attempted",
    text: "Your replacement laptop could not be delivered. Please choose a new delivery date or arrange pickup within five days.",
  },
  {
    id: "coffee",
    sender: "Tess · Former colleague",
    subject: "In town next Thursday",
    text: "I will be visiting next Thursday and would love to catch up over coffee. No work agenda—just checking how you are doing.",
  },
  {
    id: "research",
    sender: "Ben · Research collaborator",
    subject: "Retriever experiment results",
    text: "The small retriever improved after training on Jev relevance scores. The held-out results and failure examples are attached. Could you review the evaluation setup before we share it?",
  },
  {
    id: "feature",
    sender: "Rae · Existing customer",
    subject: "A small export request",
    text: "We love the dashboard. It would be handy to export filtered views as CSV sometime. This is optional and does not block our workflow.",
  },
  {
    id: "receipt",
    sender: "Rail tickets",
    subject: "Your booking confirmation",
    text: "Payment received: $86. Your train departs Friday at 9:15am. This is a receipt for your records; no reply is required.",
  },
  {
    id: "hiring",
    sender: "Jo · Team lead",
    subject: "Final interview feedback",
    text: "We need your written feedback on yesterday’s design engineer interview before the hiring panel meets tomorrow morning. Please focus on the candidate’s work sample.",
  },
  {
    id: "cancelled",
    sender: "Morgan · Operations",
    subject: "Ignore the earlier deadline",
    text: "The migration scheduled for tonight has been cancelled. You do not need to prepare the export or stay online. We will propose a new date next month.",
  },
];
if (typeof module !== "undefined") module.exports = PLAYGROUND_MESSAGES;
