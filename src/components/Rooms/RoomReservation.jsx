import React, { useState } from "react";
import Calender from "./Calender";
import Button from "../Button/Button";
import useAuth from "../../hook/useAuth";
import BookingModal from "../Modal/BookingModal";
import { formatDistance } from "date-fns";
import { addBooking, updateStatus } from "../../api/booking";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RoomReservation = ({ roomData }) => {
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const totalPrice =
    parseFloat(
      formatDistance(new Date(roomData?.to), new Date(roomData?.from)).split(
        " "
      )[0]
    ) * roomData?.price;

  const [value, setValue] = useState({
    startDate: new Date(roomData?.from),
    endDate: new Date(roomData?.to),
    key: "selection",
  });
  const [bookingInfo, setBookingInfo] = useState({
    guest: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
    host: roomData.host.email,
    location: roomData?.location,
    price: totalPrice,
    to: value.endDate,
    from: value.startDate,
    title: roomData?.title,
    roomId: roomData._id,
    image: roomData.image,
  });
  // console.log(bookingInfo);

  const handleSelect = (ranges) => {
    setValue({ ...value });
  };

  // const modalHandler = () => {
  //   addBooking(bookingInfo)
  //     .then((data) => {
  //       // console.log(data);
  //       updateStatus(roomData._id, true)
  //         .then((data) => {
  //           console.log(data);
  //           toast("Booking Successful!");
  //           navigate("/dashboard/my-bookings");
  //           closeModal();
  //         })
  //         .catch((error) => console.log(error));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   // console.log(bookingInfo);
  // };
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">${roomData?.price}</div>
        <div className="text-neutral-600 font-light">night</div>
      </div>
      <hr />
      <div className="flex justify-center">
        <Calender handleSelect={handleSelect} value={value} />
      </div>

      <hr />
      <div className="p-4">
        <Button
          onClick={() => setIsOpen(true)}
          disabled={roomData.host.email === user?.email || roomData.booked}
          label="Reserve"
        />
      </div>
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
      <BookingModal
        bookingInfo={bookingInfo}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default RoomReservation;
