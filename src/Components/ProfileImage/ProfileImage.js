import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import axios from "axios";
import { getProfileDetails } from "../../Actions/ProfileActions";
import "./ProfileImage.css";
import ImgCrop from "antd-img-crop";
import { getOrganization } from "../../Actions/OrganizationsActions";

const DisplayImage = (props) => {
  const dispatch = useDispatch();
  let imageType = props.type ? props.type : "";
  const { profileState, organizationsState } = useSelector(
    (state) => ({
      profileState: state.signIn.profileState,
      organizationsState: state.organizations.getOrganizationState,
    }),
    shallowEqual
  );
  let [state, updateState] = useState({
    loading: false,
    profileImage: null,
  });

  const getProfileDetailsHandler = () => {
    let url = "http://localhost:3050/users/myprofile";
    let refreshToken = profileState["refresh_token"];
    let accessToken = profileState["access_token"];
    // console.log("id for organization: ", id);

    let headers = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    dispatch(getProfileDetails(url, headers));
  };

  const getOrganizationDetailsHandler = () => {
    let accessToken = profileState["access_token"];
    let refreshToken = profileState["refresh_token"];
    let headers = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    let url = "http://localhost:3050/organizations";
    dispatch(getOrganization(url, headers));
  };
  let handleChange = (info) => {
    handleUpload();
    // if (info.file.status === "uploading") {
    //   updateState({ ...state, loading: true });
    //   return;
    // }
    // if (info.file.status === "done") {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, (imageUrl) =>
    //     updateState({
    //       ...state,
    //       imageUrl,
    //       loading: false,
    //     })
    //   );
    // }
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    //   return isJpgOrPng && isLt2M;

    updateState({ ...state, profileImage: file });
    return false;
  }
  const { loading } = state;

  let getImageUrl = () => {
    try {
      let url = "";
      switch (imageType) {
        case "profileImage":
          url = profileState.profile.profileImage
            ? profileState.profile.profileImage
            : "";
          return url;

        case "organizationImage":
          url = organizationsState.organization.organizationImage
            ? organizationsState.organization.organizationImage
            : "";
          return url;
        default:
          return "";
      }
    } catch (error) {
      return "";
    }
  };

  const imageUrl = getImageUrl();

  let getUrl = () => {
    switch (imageType) {
      case "profileImage":
        return "http://localhost:3050/users/updateProfilePicture";
      case "organizationImage":
        return "http://localhost:3050/organizations/updateOrganizationPicture";
      default:
        break;
    }
  };

  let getRefreshFunction = () => {
    switch (imageType) {
      case "profileImage":
        getProfileDetailsHandler();
        return;
      case "organizationImage":
        getOrganizationDetailsHandler();
        return;
      default:
        break;
    }
  };
  let handleUpload = (file = null) => {
    let { profileImage } = state;
    profileImage = file ? file : profileImage;
    const formData = new FormData();
    formData.append("file", profileImage);
    updateState({ ...state, loading: true });
    let refreshToken = profileState["refresh_token"];
    let accessToken = profileState["access_token"];
    let headers = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      contentType: "multipart/form-data",
    };
    let url = getUrl();
    url = file ? url + "/original" : url;
    axios
      .request({
        url: url,
        method: "POST",
        data: formData,
        headers,
      })
      .then((res) => console.log("res: ", res))
      .catch((err) => {
        message.error(`upload failed.${JSON.stringify(err)}`);
      })
      .finally(() => {
        getRefreshFunction();
        updateState({
          ...state,
          loading: false,
        });
      });
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  let beforeCrop = (file) => {
    // updateState({ ...state, profileImage: file });
    handleUpload(file);
    return true;
  };
  return (
    <ImgCrop shape="round" beforeCrop={beforeCrop}>
      <Upload
        name="avatar"
        listType="picture-card"
        className={`${imageType}-upload`}
        showUploadList={false}
        //   action="http://localhost:3050/users/updateProfilePicture"

        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            className="profile-image-thumbnail"
            src={imageUrl}
            alt="avatar"
            //   style={{ width: "100%", height: "100%" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </ImgCrop>
  );
};

export default DisplayImage;
