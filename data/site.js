/* Site-wide settings. Edit here; header, footer and contact blocks update on every page.
   Sources: the previous website (prsshangrila.com, archive snapshot of 2024-09-06). Items marked TO CONFIRM must be checked
   with the association before launch. */
window.PRS_SITE = {
  name: "PRS Shangrila",
  url: "https://prsshangrila.in",
  tagline: "Vanchiyoor, Thiruvananthapuram",
  /* Main navigation. href is relative to the site root. */
  nav: [
    { label: "Home", href: "index.html" },
    { label: "Rent an apartment", href: "rent.html" },
    { label: "The building", href: "building.html" },
    { label: "Owners' Association", href: "association.html" },
    { label: "Notices", href: "notices.html" },
    { label: "Contact", href: "contact.html" }
  ],
  contact: {
    addressLines: ["PRS Shangrila", "Ambujavilasam Road, Kunnumpuram", "Vanchiyoor PO, Thiruvananthapuram", "Kerala, PIN 695 035"],
    /* Phone as shown on the previous website. TO CONFIRM that it is still correct. */
    phoneDisplay: "+91 83300 21017",
    phoneTel: "+918330021017",
    /* WhatsApp number in international format without + or spaces. TO CONFIRM that this number is on WhatsApp; set to "" to hide the button. */
    whatsapp: "918330021017",
    /* The previous site hid its email address. TO CONFIRM; while empty, no email is shown. */
    email: "",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=PRS+Shangrila+Kunnumpuram+Vanchiyoor+Thiruvananthapuram+695035"
  },
  /* Message pre-filled in the WhatsApp chat */
  whatsappText: "Hello, I would like to enquire about an apartment for rent at PRS Shangrila."
};
