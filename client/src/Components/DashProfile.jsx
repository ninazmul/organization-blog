import {
  Alert,
  Button,
  Modal,
  TextInput,
  Textarea,
  Select,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { HiBadgeCheck } from "react-icons/hi";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB & it must be an image file)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    const requiredFields = [
      "name",
      "number",
      "age",
      "bloodGroup",
      "address",
      "education",
      "facebook",
      "sdg",
    ];

    for (const field of requiredFields) {
      if (!formData[field] && !currentUser[field]) {
        setUpdateUserError("Please fill in all required fields.");
        return;
      }
    }

    if (!imageFileUrl && !currentUser.profilePicture) {
      setUpdateUserError("Please upload a profile picture.");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait for the image to upload.");
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully!");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-2xl lg:text-3xl mt-5 font-semibold font-serif text-center pb-4">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[#81b619] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <div className="flex items-center gap-1 justify-center">
          <h1 className="text-xl font-serif font-semibold text-center">
            {currentUser.name && currentUser.name}
          </h1>
          <HiBadgeCheck className="text-xl text-blue-500"/>
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email Address"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <label className="text-xl font-semibold text-center">
          To become a volunteer, please complete your profile.
        </label>
        <TextInput
          type="text"
          id="name"
          placeholder="Your Name"
          defaultValue={currentUser.name}
          onChange={handleChange}
          required
        />
        <TextInput
          type="number"
          id="number"
          placeholder="Phone Number"
          defaultValue={currentUser.number}
          onChange={handleChange}
          required
        />
        <div className="flex flex-wrap gap-4 justify-between">
          <TextInput
            type="number"
            id="age"
            placeholder="Age"
            defaultValue={currentUser.age}
            onChange={handleChange}
            required
          />
          <Select
            id="bloodGroup"
            value={formData.bloodGroup || currentUser.bloodGroup || ""}
            onChange={handleSelectChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </Select>
        </div>
        <TextInput
          type="text"
          id="address"
          placeholder="Address"
          defaultValue={currentUser.address}
          onChange={handleChange}
          required
        />
        <Select
          id="education"
          value={formData.education || currentUser.education || ""}
          onChange={handleSelectChange}
          required
        >
          <option value="">Select Education Level</option>
          <option value="Secondary School Certificate">
            Secondary School Certificate
          </option>
          <option value="Higher Secondary Certificate">
            Higher Secondary Certificate
          </option>
          <option value="Bachelor's Degree">Bachelor's Degree</option>
          <option value="Master's Degree">Master's Degree</option>
          <option value="Doctorate">Doctorate</option>
        </Select>
        <TextInput
          type="text"
          id="facebook"
          placeholder="Facebook Profile URL"
          defaultValue={currentUser.facebook}
          onChange={handleChange}
          required
        />
        <TextInput
          type="text"
          id="linkedIn"
          placeholder="LinkedIn Profile URL"
          defaultValue={currentUser.linkedIn}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="website"
          placeholder="Website/Portfolio URL"
          defaultValue={currentUser.website}
          onChange={handleChange}
        />
        <Textarea
          type="text"
          id="sdg"
          placeholder="Your Thoughts on SDG Goals"
          rows="3"
          defaultValue={currentUser.sdg}
          onChange={handleChange}
          required
        />
        <Button
          outline
          gradientDuoTone="greenToBlue"
          type="submit"
          className="text-xl font-semibold"
          disabled={loading || imageFileUploading}
        >
          {loading ? "Loading..." : "Update Profile"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              gradientDuoTone="greenToBlue"
              className="text-xl font-semibold w-full"
            >
              Create a Post
            </Button>
          </Link>
        )}
      </form>
      <div className="flex justify-between text-red-500 my-4">
        <Button
          onClick={() => setShowModal(true)}
          className="text-red-500 font-semibold"
          color="none"
        >
          Delete Account
        </Button>
        <Button
          onClick={handleSignout}
          className="text-red-500 font-semibold"
          color="none"
        >
          Sign Out
        </Button>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <div>
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete your account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteUser}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
