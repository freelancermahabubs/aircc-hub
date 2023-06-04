import React, { useState } from "react";
import AddRoomForm from "../../components/Forms/AddRoomForm";
import { imageUpload } from "../../api/imageupload";
import useAuth from "../../hook/useAuth";
import { addRoom } from "../../api/rooms";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const navigate = useNavigate();
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  // handleFrom Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const location = form.location.value;
    const title = form.title.value;
    const from = dates.startDate;
    const to = dates.endDate;
    const price = form.price.value;
    const guests = form.guests.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const category = form.category.value;
    const image = form.image.files[0];
    // upload Imag
    setUploadButtonText("Uploading...");
    imageUpload(image)
      .then((data) => {
        const roomData = {
          image: data.data.display_url,
          location,
          title,
          from,
          to,
          price,
          guests,
          bedrooms,
          bathrooms,
          description,
          category,

          host: {
            name: user?.displayName,
            image: user.photoURL,
            email: user?.email,
          },
        };

        // post room data to server
        addRoom(roomData)
          .then((data) => {
            console.log(data);
            setUploadButtonText("Uploaded!");
            setLoading(false);
            toast.success("Room Added");
            navigate("/dashboard/my-listings");
          })
          .catch((error) => console.log(error));

        setLoading(false);
      })

      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  const handleImageChange = (image) => {
    setUploadButtonText(image.name);
  };

  const handleSelectDates = (ranges) => {
    setDates(ranges.selection);
  };

  return (
    <AddRoomForm
      handleSubmit={handleSubmit}
      loading={loading}
      handleImageChange={handleImageChange}
      uploadButtonText={uploadButtonText}
      dates={dates}
      handleSelectDates={handleSelectDates}
    />
  );
};

export default AddRoom;
