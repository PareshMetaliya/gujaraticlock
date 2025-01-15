import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Convert numbers to Gujarati digits
  const convertToGujarati = (num: number) => {
    const gujaratiDigits = ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"];
    return num
      .toString()
      .split("")
      .map((digit) => gujaratiDigits[Number(digit)] || digit)
      .join("");
  };

  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#131419]">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent mb-2 p-4">
        ડિજિટલ ઘડિયાળ
      </h1>
      <h2 className="text-2xl mb-2 bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent font-bold">
        {convertToGujarati(hours)} કલાક અને {convertToGujarati(minutes)} મિનિટ
      </h2>

      <h2 className="text-2xl mb-2 bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent font-bold">
        {convertToGujarati(hours + 1)} કલાક મા {convertToGujarati(60 - minutes)}{" "}
        મિનિટ બાકી
      </h2>
      <h2 className="text-6xl mb-2 font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent p-2 rounded-lg">
        <span className="m-1">{hours}</span>:
        <span className="m-1">{minutes}</span>:
        <span className="m-1" >{seconds}</span>
      </h2>

      {/* Analog Clock */}
      <div className="flex items-center justify-center relative w-72 h-72 bg-white border-4 border-gray-700 rounded-full shadow-lg">
        <div className="absolute flex items-center justify-center ">
          {/* Hour Numbers */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute flex items-center justify-center text-center text-gray-700 font-bold text-xl"
              style={{
                transform: `rotate(${i * 30}deg) translate(0, -90px) rotate(${
                  -i * 30
                }deg)`,
                
                transformOrigin: "center",
              }}
            >
              {i === 0 ? 12 : i}
            </div>
          ))}
          {/* Minute Numbers */}
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute flex items-center justify-center text-center text-red-600 font-semibold text-[0.6rem]"
              style={{
                transform: `rotate(${i * 6}deg) translate(0, -132px) rotate(${
                  -i * 6
                }deg)`,
                
                transformOrigin: "center",
              }}
            >
              {i === 0 ? 0 : i}
            </div>
          ))}


          

          {/* Hours Marks */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-[2px] h-2 bg-green-700 `}
              style={{
                transform: `rotate(${i * 30}deg) translate(0, 70px) `,

                transformOrigin: "center",
              }}
            ></div>
          ))}
          {/* Minute Marks */}
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-[2px] h-4 bg-gray-700 ${
                i % 5 === 0 ? "h-6 bg-gray-900" : ""
              }`}
              style={{
                transform: `rotate(${i * 6}deg) translate(0, 112px) `,

                transformOrigin: "center",
              }}
            ></div>
          ))}

          {/* Hour Hand */}
          <div
            className="absolute bg-gray-900 origin-bottom transform"
            style={{
              width: "4px",
              height: "65px",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -100%) rotate(${
                hours * 30 + minutes * 0.5
              }deg)`,
              transformOrigin: "center bottom",
            }}
          ></div>

          {/* Minute Hand */}
          <div
            className="absolute bg-gray-600 origin-bottom transform"
            style={{
              width: "3px",
              height: "95px",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -100%) rotate(${minutes * 6}deg)`,
              transformOrigin: "center bottom",
            }}
          ></div>

          {/* Second Hand */}
          <div
            className="absolute bg-red-500 origin-bottom transform"
            style={{
              width: "2px",
              height: "100px",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -100%) rotate(${seconds * 6}deg)`,
              transformOrigin: "center bottom",
            }}
          ></div>

          {/* Clock Center */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gray-900 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
