import { useEffect } from "react";

type Props = {};

const PortraitView = (props: Props) => {
  // useEffect(() => {
  //   const element = slideUpRef.current;
  //   const element2 = slideUpRef2.current;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add("slide-up");
  //         } else {
  //           entry.target.classList.remove("slide-up"); // Reset animation
  //         }
  //       });
  //     },
  //     { threshold: 0.5 }
  //   );

  //   if (element) {
  //     observer.observe(element);
  //   }

  //   if (element2) {
  //     observer.observe(element2);
  //   }

  //   return () => {
  //     if (element) {
  //       observer.unobserve(element);
  //     }
  //     if (element2) {
  //       observer.unobserve(element2);
  //     }
  //   };
  // }, []);

  return <div>test</div>;
};

export default PortraitView;
