import { Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitch, Twitter } from "lucide-react";
import { Cn } from "@/lib/utils";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

function ContactSection() {
  const form = useRef();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const handlesubmit = (e) => {
    e.preventDefault();
    setIsSubmiting(true);

    // REPLACE THESE with your actual EmailJS Service ID, Template ID, and Public Key
    const SERVICE_ID = "service_ih5fdxd";
    const TEMPLATE_ID = "template_s7g7o31";
    const PUBLIC_KEY = "Wfp2aDg3KNxYkytzU";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        alert("Message sent!\nThank You for Your message. I'll get back to you soon.");
        e.target.reset();
      }, (error) => {
        console.log(error.text);
        alert("Failed to send message. Please check your config.");
      })
      .finally(() => {
        setIsSubmiting(false);
      });
  }

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 mx-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6 justify-center">
              <div className="flex item-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Email</h4>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    dhruvanpatel8866@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex item-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Phone</h4>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 (8866525914)
                  </a>
                </div>
              </div>

              <div className="flex item-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Location</h4>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Ahmedabad, GJ, India
                  </a>
                </div>
              </div>

            </div>
            <div className="pt-8">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a href="#" target="_blank" className="hover:text-primary">
                  <Linkedin />
                </a>
                <a href="#" target="_blank" className="hover:text-primary">
                  <Twitter />
                </a>
                <a href="#" target="_blank" className="hover:text-primary">
                  <Instagram />
                </a>
                <a href="#" target="_blank" className="hover:text-primary">
                  <Twitch />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form ref={form} className="space-y-6" onSubmit={handlesubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="ex.Dhruvan Vachhani...." />

              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="ex.dhruvanpatel8866@gmail.com" />

              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                <input
                  type="text"
                  id="message"
                  name="message"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..." />

              </div>
              <button type="submit" disabled={isSubmiting} className={Cn("cosmic-button w-full flex items-center justify-center gap-2")}>
                {isSubmiting ? "sending...." : "Send Messge"}
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection;