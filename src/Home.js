import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Card from "./Card";
import { Navigation} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  IoArrowBack,
  IoArrowForward,
  IoCreateOutline,
  IoNotificationsOutline,
  IoPeopleOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { MdOutlineFileDownload, MdOutlinePrivacyTip} from "react-icons/md";


import Security from "./Assets/security.jpg";
import Hero2 from"./Assets/3187910.jpg";
import Footer from "./Footer";



const data = [
  {
    title: "Event Creation Made Easy",
    description:
      "Seamlessly create and manage events with our intuitive event creation feature. Specify event details, such as date, time, location, and description, to provide a clear picture for your attendees.",
    icon: <IoCreateOutline />,
  },
  {
    title: "Realtime Notifications(Coming Soon)",
    description:
      "Stay updated on event activities with our realtime notification feature. Receive notifications on event updates, attendee responses, and more. Never miss out on important event details with our notification feature.",
    icon: <IoNotificationsOutline />,
  },
  {
    title: "Participants",
    description:
      "Invite participants effortlessly by sending invitation links directly through our app. Share invitation links via email, messaging apps, or social media platforms. Ensure a smooth registration process and track attendee responses for effective event management.",
    icon: <IoTicketOutline />,
  },
  {
    title: "Flexible Event Privacy(Coming Soon)",
    description:
      "Take control over event visibility with our private and public event options. Host private gatherings with exclusive access for selected participants or organize public events to reach a wider audience. Customize privacy settings to suit the unique needs of each event.",
    icon: <MdOutlinePrivacyTip />,
  },
  {
    title: "User Account",
    description:
      "Let you create account and list your events anytime.",
    icon: <IoPeopleOutline />,
  },
  {
    title: "Edit List",
    description:
      "Staying always connected is unsure in the age of internet. So EventMGT lets the event owners to edit event details.",
    icon: <MdOutlineFileDownload />,
  }
];



function Landing() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate('/create-event');
  };
  return (
    <div className="flex-1 bg-white font-poppins select-none">
      <div className="bg-secondary">
      <section className="flex flex-col text-center w-full items-center py-8 lg:py-16 justify-center gap-8 md:gap-0 container min-h-[75vh] relative">
          <div
            className="flex flex-col gap-4 items-center justify-center z-10"
            style={{ flexBasis: "50%" }}
          >
            <h1 className=" text-2xl md:text-4xl lg:text-6xl text-slate-100 font-bold leading-relaxed lg:leading-normal drop-shadow-2xl">
            HIGHLY INTERACTIVE WEBINARS AND 
              <br />
              EVENT IN MINUTES
            </h1>
            <p className=" md:max-w-[90%] py-4 text-slate-400">
              Management Made Effortless for Creators
            </p>
            <div class= "content">
            <div>
              <button onClick={handleGetStartedClick}>Get Started</button>
            </div>
            </div>
          </div>
          </section>
          </div>
      <section className="flex flex-col-reverse  lg:flex-row w-full py-8 md:py-16 justify-between gap-8 md:gap-0 container">
      <div className="md:pt-16 " style={{ flexBasis: "50%" }}>
        <img className="w-full" src={Hero2} alt="Event Hero" />
        </div>
        <div
          className="flex flex-col gap-4 items-start justify-evenly text-left py-8 lg:pl-16"
          style={{ flexBasis: "50%" }}
        >
          <p className="text-accent tracking-[1px] font-semibold items-center gap-2 flex">
            <hr className="w-20 h-1 bg-accent"></hr>
          </p>
          <h1 className="text-3xl md:text-5xl text-primary font-semibold md:leading-normal">
            Unlock Your Creative Potential
          </h1>
          <hr className="w-full border border-neutral-200"></hr>
          <p className="text-sm leading-[1.4rem] md:max-w-[90%] py-4 text-neutral-500 text-justify">
            Our app empowers individual contributors and artists like you to
            unleash your creativity and organize remarkable events. Whether
            you're planning a webinars, a seminars, or a
            collaborative workshop, our platform provides the tools and features
            you need to make your events a resounding success.
          </p>
        </div>
      </section>
      <div className="bg-gradient-to-b from-secondary from-100% to-50% to-white pb-10">
        <section className="flex flex-col lg:flex-row w-full items-center py-8 lg:pt-16 lg:pb-0 justify-between gap-4 md:gap-0 container">
          <div className="flex flex-row gap-16">
            <div className="flex-[80%] space-y-4">
              <p className="text-accent tracking-[1px] font-semibold  items-center gap-2 flex">
                <div className="w-20 h-1 bg-accent"></div> Secure
              </p>
              <h1 className="text-3xl md:text-5xl text-white font-semibold md:leading-normal">
                Seamless Event Planning and Organization
              </h1>
            </div>
          </div>
          <p className="flex-[80%] w-full text-sm leading-[1.4rem] md:max-w-[90%] py-4 text-slate-400 text-justify">
            Say goodbye to the hassles of event planning. Our user-friendly
            interface simplifies the process, allowing you to focus on your
            artistic endeavors. Create and manage events effortlessly, from
            setting dates and locations to providing event descriptions. Streamline your planning process and bring your
            vision to reality.
          </p>
        </section>
        <div className="flex flex-row gap-4 items-center justify-between container">
          <hr className="w-full  border border-neutral-200 opacity-30"></hr>
          <div className="inline-flex flex-[50%] gap-4 justify-end items-center">
            <button
              onClick={() => {
                swiperRef.current.swiper.slidePrev();
              }}
              className="text-white p-4 rounded-full outline outline-1 outline-white hover:bg-primary hover:outline-none transition-all"
            >
              <IoArrowBack />
            </button>
            <button
              onClick={() => {
                swiperRef.current.swiper.slideNext();
              }}
              className="text-white p-4 rounded-full bg-accent"
            >
              <IoArrowForward />
            </button>
          </div>
        </div>
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={50}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 50,
            },
            820: {
              slidesPerView: 2.5,
              spaceBetween: 50,
            },
            960: {
              slidesPerView: 2.8,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 80,
            },
          }}
        >
          {data.map((item) => (
            <SwiperSlide>
              <Card {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <section className="flex flex-col-reverse lg:flex-row-reverse w-full py-8 md:py-16 justify-between gap-8 md:gap-0 container">
      <div className="" style={{ flexBasis: "50%" }}>
          <img className="w-full" src={Security} />
        </div>
        <div
          className="flex flex-col gap-4 items-start justify-evenly text-left py-8 lg:pr-16"
          style={{ flexBasis: "50%" }}
        >
          <p className="text-accent tracking-[1px] font-semibold items-center gap-2 flex">
            <hr className="w-20 h-1 bg-accent"></hr> Registrations Made Easy
          </p>
          <h1 className="text-3xl md:text-5xl text-primary font-semibold md:leading-normal">
            Security and Reliability
          </h1>
          <hr className="w-full border border-neutral-200"></hr>
          <p className="text-sm leading-[1.4rem] md:max-w-[90%] py-4 text-neutral-500 text-justify">
            Rest assured that your event data is safe and secure with our web
            app. We prioritize data protection and employ industry-standard
            security measures to safeguard your information. Our reliable
            infrastructure ensures that your event management process remains
            uninterrupted, allowing you to focus on what matters most – creating
            exceptional events.
          </p>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Landing;
