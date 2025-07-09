import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function AirdropScheduleSlider() {
  const [swiper, setSwiper] = useState(null);
  const [activeDay, setActiveDay] = useState(0);

  const days = ['MON', 'WED', 'SAT'];

  const daysContent = [
    [
      {
        step: 1,
        title: "WALLET CONNECTION",
        time: "05:00 - 05:40 UTC+0",
        description: "Connect your verified wallet to participate in the airdrop"
      },
      {
        step: 2,
        title: "PARTICIPANT VERIFICATION",
        time: "05:40 - 06:00 UTC+0",
        description: "Ensure eligibility by completing the verification process"
      },
      {
        step: 3,
        title: "REWARD DISTRIBUTION",
        time: "06:00 - 06:30 UTC+0",
        description: "Receive your rewards directly into your wallet"
      }
    ],
    [
      {
        step: 1,
        title: "PARTICIPANT VERIFICATION",
        time: "05:40 - 06:00 UTC+0",
        description: "Ensure eligibility by completing the verification process"
      },
      {
        step: 2,
        title: "REWARD DISTRIBUTION",
        time: "06:00 - 06:30 UTC+0",
        description: "Receive your rewards directly into your wallet"
      },
      {
        step: 3,
        title: "WALLET CONNECTION",
        time: "05:00 - 05:40 UTC+0",
        description: "Connect your verified wallet to participate in the airdrop"
      }
    ],
    [
      {
        step: 1,
        title: "REWARD DISTRIBUTION",
        time: "06:00 - 06:30 UTC+0",
        description: "Receive your rewards directly into your wallet"
      },
      {
        step: 2,
        title: "WALLET CONNECTION",
        time: "05:00 - 05:40 UTC+0",
        description: "Connect your verified wallet to participate in the airdrop"
      },
      {
        step: 3,
        title: "PARTICIPANT VERIFICATION",
        time: "05:40 - 06:00 UTC+0",
        description: "Ensure eligibility by completing the verification process"
      }
    ]
  ];

  useEffect(() => {
    if (swiper) {
      swiper.on('slideChange', () => {
        setActiveDay(swiper.activeIndex);
      });
    }
  }, [swiper]);

  const handleDayClick = (index) => {
    if (swiper && index !== activeDay) {
      swiper.slideTo(index);
    }
  };

  const handleIndicatorClick = (index) => {
    if (swiper && index !== activeDay) {
      swiper.slideTo(index);
    }
  };

  return (
    <div className="steps airdrop-schedule relative">
      <div className="step-days_container flex justify-center space-x-4 mb-6">
        {days.map((day, index) => (
          <div
            key={day}
            className={`step-days cursor-pointer px-4 py-2 ${index === activeDay ? 'active font-bold border-b-2 border-blue-500' : ''}`}
            onClick={() => handleDayClick(index)}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="content-container w-full">
        <Swiper
          onSwiper={setSwiper}
          modules={[EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={400}
          allowTouchMove={true}
          className="w-full"
          pagination={{
            clickable: true,
            el: '.custom-pagination',
            bulletClass: 'indicator',
            bulletActiveClass: 'active',
            renderBullet: function (index, className) {
              return `<div class="${className}"></div>`;
            }
          }}
        >
          {daysContent.map((dayContent, dayIndex) => (
            <SwiperSlide key={`day-${dayIndex}`}>
              <div className="content-wrapper">
                {dayContent.map((item, index) => (
                  <div className="step-item-container mb-4" key={`${days[dayIndex]}-step-${index}`}>
                    <div className="step-number text-sm text-gray-500 mb-1">step {item.step}</div>
                    <div className="step-item bg-gray-100 rounded p-4">
                      <div className="step-title font-bold">{item.title}</div>
                      <div className="step-time text-sm text-blue-600 mt-1">{item.time}</div>
                      <p className="step-description mt-2 text-gray-700">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="custom-pagination progress-indicators flex justify-center space-x-2 mt-4">

      </div>

      <style jsx>{`
        .indicator {
          height: 4px;
          border-radius: 2px;
          background-color: #4b4b4b;
          flex: 1;
        }
        
        .indicator.active {
          background-color: $accent-color;
        }
      `}</style>
    </div>
  );
}