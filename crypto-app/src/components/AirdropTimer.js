import { useState, useEffect } from "react";

const AirdropTimer = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('airdropTimer');
    if (savedTime) {
      const parsedTime = JSON.parse(savedTime);
      const savedTimestamp = localStorage.getItem('airdropTimerTimestamp');

      if (savedTimestamp) {
        const elapsed = Math.floor((Date.now() - parseInt(savedTimestamp)) / 1000);
        let { hours, minutes, seconds } = parsedTime;

        let totalSeconds = hours * 3600 + minutes * 60 + seconds - elapsed;

        if (totalSeconds > 0) {
          hours = Math.floor(totalSeconds / 3600);
          minutes = Math.floor((totalSeconds % 3600) / 60);
          seconds = totalSeconds % 60;
          return { hours, minutes, seconds };
        }
      }
    }

    return { hours: 32, minutes: 12, seconds: 4 };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              localStorage.removeItem('airdropTimer');
              localStorage.removeItem('airdropTimerTimestamp');
              return { hours: 0, minutes: 0, seconds: 0 };
            }
          }
        }

        const newTime = { hours, minutes, seconds };

        localStorage.setItem('airdropTimer', JSON.stringify(newTime));
        localStorage.setItem('airdropTimerTimestamp', Date.now().toString());

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  const isFinished = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isFinished) {
    return (
      <div className="countdown-banner">
        <div className="countdown-text">
          DROP FINISHED
        </div>
        <div className="countdown-timer">
          00:00:00
        </div>
      </div>
    );
  }

  return (
    <div className="countdown-banner">
      <div className="countdown-text">
        NEXT DROP STARTS IN
      </div>
      <div className="countdown-timer">
        {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
      </div>
    </div>
  );
};

export default AirdropTimer;